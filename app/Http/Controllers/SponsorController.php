<?php namespace Winwins\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Illuminate\Support\Collection;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\User;
use Winwins\Model\Sponsor;
use Winwins\Model\SponsorsUser;
use Winwins\Model\SponsorsWinwin;
use Winwins\Model\Repository\SponsorRepository;
use Winwins\Model\Winwin;

use Validator;
use Response;
use Storage;
use Winwins\Model\Media;

use Illuminate\Http\Request;

class SponsorController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['paginate', 'index', 'show', 'search', 'fetchMain']]);
    }

	public function all() {
        $sponsors = Sponsor::all();
        return $sponsors;
	}

    public function paginate(Request $request, $page = 0, $amount = 15) {
        $user = false;
		$token = $request->input('_token') ?: $request->header('X-XSRF-TOKEN');
		if ( $token )  {
            $token = $request->header('Authorization');
            if(isset($token[1])) {
                $token = explode(' ', $request->header('Authorization'))[1];
                $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));
                $user = User::find($payload['sub']);
            }
        }

        $sponsors = DB::table('sponsors')->where('is_active', '=', 1)->where('is_main', '=', 0)->skip($page * $amount)->take($amount)->get();
        $collection = Collection::make($sponsors);
        $collection->each(function($sponsor) use($user) {
            $winwins_count = DB::table('winwins')
                ->leftJoin('sponsors_winwins', 'winwins.id', '=', 'sponsors_winwins.winwin_id')
                ->where('sponsors_winwins.sponsor_id', '=', $sponsor->id)
                ->where('sponsors_winwins.ww_accept', '=', 1)
                ->where('sponsors_winwins.sponsor_accept', '=', 1)
                ->count();
            $sponsor->winwins_count = $winwins_count;

            if($user) {
                $sponsor->already_following = count($user->sponsors->filter(function($model) use ($user, $sponsor) {
                    return $model->id == $sponsor->id;
                })) > 0;
            }




        });
        return $collection;
    }


    public function fetchMain(Request $request) {
        $sponsors = DB::table('sponsors')->where('is_active', '=', 1)->where('is_main', '=', 1)->orderByRaw('RAND()')->get();
        $collection = Collection::make($sponsors);
        $collection->each(function($sponsor) {
            $winwins_count = DB::table('winwins')
                ->leftJoin('sponsors_winwins', 'winwins.id', '=', 'sponsors_winwins.winwin_id')
                ->where('sponsors_winwins.sponsor_id', '=', $sponsor->id)
                ->where('sponsors_winwins.ww_accept', '=', 1)
                ->where('sponsors_winwins.sponsor_accept', '=', 1)
                ->count();
            $sponsor->winwins_count = $winwins_count;
        });
        return $collection;
    }


	public function index() {
        $sponsors = Sponsor::where('is_main', '=', 0)->get();
        $collection = Collection::make($sponsors);
        $collection->each(function($sponsor) {
            $users_count = count($sponsor->users);
            $sponsor->users_already_following = $users_count;
        });
        return $collection;

	}

	public function store(Request $request) {
        $user = User::find($request['user']['sub']);

        $sponsor = new Sponsor;
        DB::transaction(function() use ($request, $sponsor, $user) {

            $sponsor->name = $request->input('name');
            $sponsor->about= $request->input('description');
            $sponsor->photo = $request->input('photo')?: 'sponsor-default.gif';
            $sponsor->cover_photo = $request->input('cover_photo')?: 'sponsor-default.gif';
            $sponsor->type = $request->input('type');
            $sponsor->contact_name = $request->input('contact_name');
            $sponsor->contact_phone = $request->input('contact_phone');
            $sponsor->contact_email = $request->input('contact_email');
            $sponsor->user_id = $user->id;
            $sponsor->save();
                 
        });

        return $sponsor;
	}


	public function show(Request $request, $id) {
        $sponsor = Sponsor::find($id);

        $user = false;
		$token = $request->input('_token') ?: $request->header('X-XSRF-TOKEN');
		if ( $token )  {
            $token = $request->header('Authorization');
            if(isset($token[1])) {
                $token = explode(' ', $request->header('Authorization'))[1];
                $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));
                $user = User::find($payload['sub']);
            }
        }


        if($user) {
            $sponsor->myself = ($sponsor->user_id == $user->id);
        }
        $sponsor->winwins_count  = count($sponsor->winwins);
        $sponsor->groups_count  = count($sponsor->groups);

        $followers = DB::table('user_details')
        ->select('user_details.name', 'user_details.lastname', 'user_details.photo', 'user_details.user_id')
        ->join('sponsors_users', 'user_details.user_id', '=', 'sponsors_users.user_id')
        ->where('sponsors_users.sponsor_id', '=', $sponsor->id)->get();

        $sponsor->followers = $followers;
        $sponsor->followers_count  = count($followers);


        $sponsor->already_following = false;

        if($user) {
            $sponsor->already_following = count($sponsor->users->filter(function($model) use ($user) {
                $model->detail;
                return $model->id == $user->id;
            })) > 0;
        }

        return response()->json($sponsor, 200, [], JSON_NUMERIC_CHECK);
	}


	public function update($id) {
        $sponsor = Sponsor::find($id);
        //Set updated

        $sponsor->save();
        return $sponsor;
	}

	public function destroy($id) {
        Sponsor::destroy($id);
	}

    //Actions
	public function search(Request $request, SponsorRepository $sponsorRepository) {
        $query = $request->input('q');
        return $sponsorRepository->search($query);
    }


	public function follow(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $sponsor = Sponsor::find($id);

        if(!isset($sponsor) ) {
            return response()->json(['message' => 'sponsor_not_found'], 400);
        }
        $sponsor->user();
        if($user->id == $sponsor->user->id) {
            return response()->json(['message' => 'sponsor_as_owner_you_are_aleady_following'], 400);
        } else {
            $already_following = count($sponsor->users->filter(function($model) use ($user) {
                return $model->id == $user->id;
            })) > 0;

            if($already_following) {
                return response()->json(['message' => 'sponsor_already_following'], 400);
            } else {
                DB::transaction(function() use ($sponsor, $user) {
                    $sponsorsUsers = new SponsorsUser;
                    $sponsorsUsers->user_id = $user->id;
                    $sponsorsUsers->sponsor_id = $sponsor->id;
                    $sponsorsUsers->save();
                });
            }
        }
	}

	public function unfollow(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $sponsor = Sponsor::find($id);
        $sponsor->user();
        if($user->id == $sponsor->user->id) {
            return response()->json(['message' => 'sponsor_owner_cant_left'], 400);
        } else {
            $already_following = count($sponsor->users->filter(function($model) use ($user) {
                return $model->id == $user->id;
            })) > 0;

            if(!$already_following) {
                return response()->json(['message' => 'sponsor_left_first_follow'], 400);
            } else {
                DB::table('sponsors_users')->where('user_id', $user->id )->where('sponsor_id', $sponsor->id)->delete();
            }
        }
	}

    public function updateProfile(Request $request) {
        $user = User::find($request['user']['sub']);
        $sponsor = $user->sponsor;

        if($sponsor->user_id != $user->id) {
            return response()->json(['message' => 'not_sponsor_user']);
        }
        if (!$sponsor) {
            return response()->json(['message' => 'sponsor_not_found']);
        }

		if($request->has('name')) {
            $sponsor->name = $request->input('name');
        }
		if($request->has('contact_name')) {
            $sponsor->contact_name = $request->input('contact_name');
        }
		if($request->has('contact_phone')) {
            $sponsor->contact_phone = $request->input('contact_phone');
        }
		if($request->has('contact_email')) {
            $sponsor->contact_email = $request->input('contact_email');
        }
		if($request->has('photo')) {
            $sponsor->photo = $request->input('photo');
        }
		if($request->has('cover_photo')) {
            $sponsor->cover_photo = $request->input('cover_photo');
        }
		if($request->has('about')) {
            $sponsor->about = $request->input('about');
        }
		if($request->has('type')) {
            $sponsor->type = $request->input('type');
        }

        $current_password =  $request->input('current_password');
        $password =  $request->input('password');

        if(isset($current_password) && isset($password) ) {

            if (Hash::check($current_password, $user->password)) {
                $user->password = Hash::make($request->input('password'));
                $user->save();
            } else {
                return response()->json(['message' => 'user_current_password_wrong'], 400);
            }
        }

        $sponsor->save();

        return $sponsor;
    }

    public function storeImage(Request $request, Media $media) {

        $user = User::find($request['user']['sub']);

        if(!$request->hasFile('file')) { 
            return Response::json(['error' => 'no_file_sent']);
        }

        if(!$request->file('file')->isValid()) {
            return Response::json(['error' => 'file_not_valid']);
        }

        $file = $request->file('file');

        $v = Validator::make(
            $request->all(),
            ['file' => 'required|mimes:jpeg,jpg,png|max:8000']
        );

        if($v->fails()) {
            return Response::json(['error' => $v->errors()]);
        }

        $image = Media::create([
            'name' => $request->file('file')->getClientOriginalName(),
            'ext' => $request->file('file')->guessExtension(),
            'user_id' => $user->id || 1,
            'bucket' => 'S3',
            'type' => 'IMAGE'
        ]);
        
        $filename = 'sponsor_'.md5(strtolower(trim($image->name))).'_'.$image->id . '.' . $image->ext;

        Storage::disk('s3-gallery')->put('/' . $filename, file_get_contents($file), 'public');

        return Response::json(['OK' => 1, 'filename' => $filename]);
    }

	public function create() {
		//
	}

	public function edit($id) {
		//
	}

	public function sponsorCancel(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $sponsor = $user->sponsor;

        $winwin = Winwin::find($id);
        $ww_user = $winwin->user;
        $request_body = $request->input('body');

        if(!isset($sponsor)) {
            return response()->json(['message' => 'winwin_you_are_not_an_sponsor'], 400);
        } else {
            $already_sponsored = count($winwin->sponsors->filter(function($model) use ($sponsor) {
                return $model->id == $sponsor->id;
            })) > 0;

            if($already_sponsored) {
                DB::transaction(function() use ($winwin, $user, $sponsor, $request_body) {
                    DB::table('sponsors_winwins')->where('sponsor_id', $sponsor->id )->where('winwin_id', $winwin->id)->delete();
                });
                $ww_user->newNotification()
                    ->from($user)
                    ->withType('SPONSOR_CANCEL')
                    ->withSubject('Sponsor_cancel')
                    ->withBody($request_body)
                    ->regarding($winwin)
                    ->deliver();

                return response()->json(['message' => 'winwin_sponsor_cancel'], 200);
            } else {
                return response()->json(['message' => 'winwin_you_are_not_sponsored_this_winwin'], 400);
            }
        }

	}

	public function acceptWinwin(Request $request, $id, $sponsorId) {
        DB::transaction(function() use ($id, $sponsorId) {
            DB::table('sponsors_winwins')->where('winwin_id', $id)->where('sponsor_id', $sponsorId)->update(['sponsor_accept' => 1]);
        });
        return response()->json(['message' => 'winwin_sponsor_accepted'], 200);
    }



}

