<?php namespace Winwins\Http\Controllers;

use JWT;
use Hash;
use Config;
use Validator;
use Log;
use Carbon;
use Illuminate\Http\Request;
use GuzzleHttp;
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Subscriber\Oauth\Oauth1;
use Winwins\User;
use Winwins\UserDetail;
use Winwins\Sponsor;
use Winwins\Jobs\UpdateProfilePicture;
use Storage;
use Winwins\Message\Mailer;
use Winwins\Message\Message;
use DB;

class AuthController extends Controller {

    protected function createToken($user) {
        $payload = [
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + (2 * 7 * 24 * 60 * 60)
        ];
        return JWT::encode($payload, Config::get('app.token_secret'));
    }

    public function getToken() {
        return csrf_token();
    }

    public function unlink(Request $request, $provider) {
        $user = User::find($request['user']['sub']);

        if (!$user) {
            return response()->json(['message' => 'user_not_found']);
        }

        $user->$provider = '';
        $user->save();
        
        return response()->json(array('token' => $this->createToken($user)));
    }

    public function login(Request $request) {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', '=', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'auth_wrong_email_password'], 401);
        }

        if (Hash::check($password, $user->password)) {
            unset($user->password);


            if(!isset($user->detail()->photo)) {
                $this->dispatch(new UpdateProfilePicture($user));
            }
 

            return response()->json(['token' => $this->createToken($user)]);
        } else {
            return response()->json(['message' => 'auth_wrong_email_password'], 401);
        }
    }

    public function signup(Request $request, Mailer $mailer) {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'name' => 'required',
            'lastname' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            if ($validator->errors()->has('email')) {
                return response()->json(['message' => 'email_already_taken'], 401);
            } else {
                return response()->json(['message' => $validator->messages()], 400);
            }
        }

        $user = new User;
        $user->username = $request->input('username');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->activation_code = str_random(60) . $request->input('email');
        $user->is_sponsor = $request->has('is_sponsor') ? 1 : 0;
        $user->save();
        $detail = new UserDetail;
        $detail->name = $request->input('name');
        $detail->lastname = $request->input('lastname');
        $detail->language_code = $request->input('language_code') || 'ES';
        $user->detail()->save($detail);
        $this->dispatch(new UpdateProfilePicture($user));

        if($request->has('is_sponsor')) {

            $sponsor = new Sponsor();
            $sponsor->name = $request->input('sponsor_organization');
            $sponsor->user_id = $user->id;
            $sponsor->contact_name = $request->input('name').' '. $request->input('lastname');
            $sponsor->contact_phone = '';
            $sponsor->contact_email = $user->email;
            $sponsor->cover_photo = 'placeholder-square.jpg';
            $sponsor->is_active = 0;
            $sponsor->is_main = 0;
            $sponsor->status = 'PENDING';
            $sponsor->photo = 'placeholder-square.jpg';

            $sponsor->save();

            $user->is_sponsor = 1;
            $user->save();

            $this->sentEmailConfirmationSponsor($mailer, $user, $sponsor);
            $this->sentEmailNotifyAdminNewSponsor($mailer, $sponsor);

        } else {

            $this->sentEmailConfirmation($mailer, $user);

        }
        return response()->json(['token' => $this->createToken($user)]);
    }

    public function resendActivationMail(Request $request, Mailer $mailer) {
        $user = User::find($request['user']['sub']);
        $this->sentEmailConfirmation($mailer, $user);
        return response()->json(['message' => 'email_sent']);
    }

    public function activateAccount(Request $request, Mailer $mailer, $code) {
        $user = User::where('activation_code', '=', $code)->first();
        if($user) { 
            $user->active = 1;
            $user->activation_code = '';
            $user->save();
            $this->sentEmailWelcome($mailer, $user);
        }
        return redirect('/#/activacion');
    }

    public function facebook(Request $request, Mailer $mailer) {
        $accessTokenUrl = 'https://graph.facebook.com/v2.6/oauth/access_token';
        $graphApiUrl = 'https://graph.facebook.com/v2.6/me';

        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'redirect_uri' => $request->input('redirectUri'),
            'client_secret' => Config::get('app.facebook_secret'),
            'fields' => 'id,name,email,first_name,last_name,gender,birthday'
        ];

        $client = new GuzzleHttp\Client();

        // Step 1. Exchange authorization code for access token.

        $accessToken = json_decode($client->get($accessTokenUrl, ['query' => $params])->getBody(), true);

        // Step 2. Retrieve profile information about the current user.
        $profile = json_decode($client->get($graphApiUrl."?access_token=".$accessToken['access_token']."&fields=id%2Cname%2Cemail%2Cfirst_name%2Clast_name%2Cgender%2Cbirthday&format=json&method=get&pretty=0&suppress_http_code=1")->getBody(), true);

        $picture = 'https://graph.facebook.com/v2.3/'.$profile['id'].'/picture?type=normal';

        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization'))
        {
            $user = User::where('facebook', '=', $profile['id']);

            if ($user->first())
            {
                return response()->json(['message' => 'There is already a Facebook account that belongs to you'], 409);
            }

            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));

            $user = User::find($payload['sub']);
            $user->facebook = $profile['id'];
            $user->username = $user->username ?: $profile['name'];

            $user->email = $user->email ?: $profile['email'];
            $userDetail = $user->detail;
            $userDetail->name = $userDetail->name ?: $profile['first_name'];
            $userDetail->birthdate = $userDetail->birthdate ?: Carbon::createFromFormat('m/d/Y', $profile['birthday'])->toDateString();
            $userDetail->photo = $userDetail->photo ?: $picture;
            $user->photo = $userDetail->photo;
            $userDetail->lastname = $userDetail->lastname ?: $profile['last_name'];
            $userDetail->sex = $userDetail->sex ?: ($profile['gender'] == 'male' ? 'M' : $profile['gender'] == 'female'? 'F': '');

            $user->save();
            $user->detail()->save($userDetail);

            return response()->json(['token' => $this->createToken($user)]);
        }
        // Step 3b. Create a new user account or return an existing one.
        else
        {
            $user = User::where('facebook', '=', $profile['id']);

            if ($user->first()) {
                return response()->json(['token' => $this->createToken($user->first())]);
            }

            $user = new User;
            $user->facebook = $profile['id'];
            $user->username = $profile['name'];

			if(isset($profile['email'])) {
                $user->email = $user->email ?: $profile['email'];
            }

            $userDetail = new UserDetail;
			if(isset($profile['first_name'])) {
                $userDetail->name = $userDetail->name ?: $profile['first_name'];
            }

            if(isset($profile['birthday'])) {
                $userDetail->birthdate = $userDetail->birthdate ?: Carbon::createFromFormat('m/d/Y', $profile['birthday'])->toDateString();
            }
            
            $picture_name = 'fb_'.$user->facebook;
            Storage::disk('s3-gallery')->put('/' . $picture_name, file_get_contents($picture), 'public');
            $userDetail->photo = $picture_name;
            $user->photo = $userDetail->photo;

			if(isset($profile['last_name'])) {
                $userDetail->lastname = $userDetail->lastname ?: $profile['last_name'];
			}
			if(isset($profile['gender'])) {
                $userDetail->sex = $userDetail->sex ?: ($profile['gender'] == 'male' ? 'M' : ($profile['gender'] == 'female' ? 'F': 'M'));
			}
            $user->active = 1;
            $user->save();
            $user->detail()->save($userDetail);
    
            if(isset($user->email)) {
                $this->sentEmailWelcome($mailer, $user);
            }

            return response()->json(['token' => $this->createToken($user)]);
        }
    }

    public function google(Request $request) {
        $accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
        $peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'client_secret' => Config::get('app.google_secret'),
            'redirect_uri' => $request->input('redirectUri'),
            'grant_type' => 'authorization_code',
        ];

        $client = new GuzzleHttp\Client();

        //$accessTokenResponse = $client->post($accessTokenUrl, ['body' => $params]);
        $accessTokenResponse = $client->request('POST', $accessTokenUrl, [ 'form_params' => $params ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true)['access_token'];

        $headers = array('Authorization' => 'Bearer ' . $accessToken);

        // Step 2. Retrieve profile information about the current user.
        $profileResponse = $client->get($peopleApiUrl, ['headers' => $headers]);

        $profile = json_decode($profileResponse->getBody(), true);


        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization'))
        {
            $user = User::where('google', '=', $profile['sub']);

            if ($user->first())
            {
                return response()->json(['message' => 'There is already a Google account that belongs to you'], 409);
            }

            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));

            $user = User::find($payload['sub']);
            $user->google = $profile['sub'];
            $user->username = $user->username ?: $profile['name'];
            $user->save();

            return response()->json(['token' => $this->createToken($user)]);
        }
        // Step 3b. Create a new user account or return an existing one.
        else
        {
            $user = User::where('google', '=', $profile['sub']);

            if ($user->first())
            {
                return response()->json(['token' => $this->createToken($user->first())]);
            }

            $user->active = 1;
            $user = new User;
            $user->google = $profile['sub'];
            $user->username = $profile['name'];
            $user->save();

            $detail = new UserDetail;
            $user->detail()->save($detail);

            return response()->json(['token' => $this->createToken($user)]);
        }
    }

    public function twitter(Request $request) {
	/*
        $requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
        $accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
        $profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';
	*/
        $requestTokenUrl = 'oauth/request_token';
        $accessTokenUrl = 'oauth/access_token';
        $profileUrl = '1.1/users/show.json?screen_name=';

        $stack = HandlerStack::create();

        $client = new GuzzleHttp\Client();

        // Part 1 of 2: Initial request from Satellizer.
        if (!$request->input('oauth_token') || !$request->input('oauth_verifier'))
        {
              
            $requestTokenOauth = new Oauth1([
              'consumer_key' => Config::get('app.twitter_key'),
              'consumer_secret' => Config::get('app.twitter_secret'),
              'token' => Config::get('app.twitter_token'),
              'token_secret' => Config::get('app.twitter_token_secret'),
              'callback' => Config::get('app.twitter_callback')
            ]);

		$stack->push($requestTokenOauth);

		$client = new Client([
		    'base_uri' => 'https://api.twitter.com/',
		    'handler' => $stack
		]);


            // Step 1. Obtain request token for the authorization popup.
		$requestTokenResponse = $client->get($requestTokenUrl, ['auth' => 'oauth'])->getBody();

            $oauthToken = array();
            parse_str($requestTokenResponse, $oauthToken);

            // Step 2. Send OAuth token back to open the authorization screen.
            return response()->json($oauthToken);

        }
        // Part 2 of 2: Second request after Authorize app is clicked.
        else
        {
            $accessTokenOauth = new Oauth1([
                'consumer_key' => Config::get('app.twitter_key'),
                'consumer_secret' => Config::get('app.twitter_secret'),
                'token' => $request->input('oauth_token'),
                'token_secret' => $request->input('oauth_token_secret'),
                'verifier' => $request->input('oauth_verifier')
            ]);


		$stack->push($accessTokenOauth);

		$client = new Client([
		    'base_uri' => 'https://api.twitter.com/',
		    'handler' => $stack
		]);



            // Step 3. Exchange oauth token and oauth verifier for access token.
		$accessTokenResponse = $client->get($accessTokenUrl, ['auth' => 'oauth'])->getBody();

            $accessToken = array();
            parse_str($accessTokenResponse, $accessToken);

            $profileOauth = new Oauth1([
                'consumer_key' => Config::get('app.twitter_key'),
                'consumer_secret' => Config::get('app.twitter_secret'),
                'token' => $accessToken['oauth_token'],
                'token_secret' => $accessToken['oauth_token_secret'],
                'oauth_token' => $accessToken['oauth_token'],
                'oauth_token_secret' => $accessToken['oauth_token_secret']
            ]);

		$stack->push($profileOauth);

		$client = new Client([
		    'base_uri' => 'https://api.twitter.com/',
		    'handler' => $stack
		]);



            // Step 4. Retrieve profile information about the current user.
            $profile = json_decode($client->get($profileUrl . $accessToken['screen_name'], ['auth' => 'oauth'])->getBody(), true);

            Log::info($profile);

            // Step 5a. Link user accounts.
            if ($request->header('Authorization'))
            {
                $user = User::where('twitter', '=', $profile['id']);
                if ($user->first())
                {
                    return response()->json(['message' => 'There is already a Twitter account that belongs to you'], 409);
                }

                $token = explode(' ', $request->header('Authorization'))[1];
                $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));

                $user = User::find($payload['sub']);
                $user->twitter = $profile['id'];
                $user->username = $user->username ?: $profile['screen_name'];
                $user->save();

                return response()->json(['token' => $this->createToken($user)]);
            }
            // Step 5b. Create a new user account or return an existing one.
            else
            {
                $user = User::where('twitter', '=', $profile['id']);

                if ($user->first())
                {
                    return response()->json(['token' => $this->createToken($user->first())]);
                }

                $user = new User;
                $user->twitter = $profile['id'];
                $user->username = $profile['screen_name'];

            

                $detail = new UserDetail;
                if(isset($profile['screen_name'])) {
                    $detail->name = $detail->name ?: $profile['screen_name'];
                }
                $picture = $profile['profile_image_url'];
                $picture_name = 'tw_'.$user->twitter;
                Storage::disk('s3-gallery')->put('/' . $picture_name, file_get_contents($picture), 'public');
                $detail->photo = $picture_name;
                $user->photo = $detail->photo;

                $user->active = 1;
                $user->save();
                $user->detail()->save($detail);

                return response()->json(['token' => $this->createToken($user)]);
            }
        }
    }

	public function sentEmailConfirmation($mailer, $user) {
        $template_name = 'winwin_confirm_registration';
        $message = new Message($template_name, array(
            'meta' => array(
                'base_url' => 'http://dev-winwins.net',
                'logo_url' => 'http://winwins.org/imgs/logo-winwins_es.gif'
            ),
            'registration_link' => 'http://dev-winwins.net/auth/activate/'.$user->activation_code
        ));
        $message->subject('WinWin - Confirma tu nueva cuenta');
        $message->to(null, $user->email);
        $message_sent = $mailer->send($message);

        return $message_sent;
    }


	public function sentEmailNotifyAdminNewSponsor($mailer, $sponsor) {
        $template_name = 'winwin_admin_notify_new_sponsor';
        $users = DB::table('users')->where('active', '=', 1)->where('is_admin', '=', 1)->whereNotNull('email')->get();
        Log::info('Users Admin');
        Log::info($users);
        foreach($users as $user) {
            $message = new Message($template_name, array(
                'meta' => array(
                    'base_url' => 'http://dev-winwins.net',
                    'logo_url' => 'http://winwins.org/imgs/logo-winwins_es.gif'
                ),
                'organization_name' => $sponsor->name
            ));
            $message->subject('WinWin - Solicitud de Nuevo Sponsor');
            $message->to(null, $user->email);
            $message_sent = $mailer->send($message);
        }

    }


	public function sentEmailConfirmationSponsor($mailer, $user, $sponsor) {
        $template_name = 'winwin_confirm_registration_sponsor';
        $message = new Message($template_name, array(
            'meta' => array(
                'base_url' => 'http://dev-winwins.net',
                'logo_url' => 'http://winwins.org/imgs/logo-winwins_es.gif'
            ),
            'registration_link' => 'http://dev-winwins.net/auth/activate/'.$user->activation_code,
            'organization_name' => $sponsor->name
        ));
        $message->subject('WinWin - Solicitud de Sponsor');
        $message->to(null, $user->email);
        $message_sent = $mailer->send($message);

        return $message_sent;
    }


   	public function sentEmailWelcome($mailer, $user) {
        $template_name = 'winwin_welcome';
        $message = new Message($template_name, array(
            'meta' => array(
                'base_url' => 'http://dev-winwins.net',
                'logo_url' => 'http://winwins.org/imgs/logo-winwins_es.gif'
            ),
            'registration_link' => 'http://dev-winwins.net/auth/activate/'.$user->activation_code
        ));
        $message->subject('WinWin - Bienvenido');
        $message->to(null, $user->email);
        $message_sent = $mailer->send($message);

        return $message_sent;
    }

 
}
