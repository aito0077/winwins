<?php namespace Winwins\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use Hash;
use Log;
use DB;
use JWT;
use Validator;
use Response;
use Storage;
use Illuminate\Support\Collection;
use Winwins\User;
use Winwins\Follower;
use Winwins\UserDetail;
use Winwins\Model\Repository\UserRepository;
use Winwins\Post;
use Winwins\Media;

class UserController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['paginate', 'index', 'show', 'search', 'getUserTimeline']]);
    }

    public function paginate(Request $request, $page = 0, $amount = 15) {
        $current_user = false;
		$token = $request->input('_token') ?: $request->header('X-XSRF-TOKEN');
		if ( $token )  {
            $token = $request->header('Authorization');
            if(isset($token[1])) {
                $token = explode(' ', $request->header('Authorization'))[1];
                $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));
                $current_user = User::find($payload['sub']);
            }
        }

        $users = DB::table('user_details')
            ->join('users', 'user_details.user_id', '=', 'users.id')
            ->where('users.active', '=', 1)
            ->where('users.is_sponsor', '!=', 1)
            ->where('users.suspend', '=', 0)
            ->select('user_details.photo', 'user_details.cover_photo', 'users.id', 'user_details.name') 
            ->skip($page * $amount)
            ->take($amount)->get();

        $collection = Collection::make($users);
        $collection->each(function($user) use($current_user){
            $user->winwins_count = DB::table('winwins_users')
                ->where('user_id', '=', $user->id)->count();
            $user->followers_count = DB::table('followers')
                ->where('followed_id', '=', $user->id)->count();

            if($current_user) {
                $user->already_following = count($current_user->following->filter(function($model) use ($current_user, $user) {
                    return $model->id == $user->id;
                })) > 0;
            }

        });
        return $collection;
    }

	public function index() {
        $users = UserDetail::all();
        return response()->json($users, 200, [], JSON_NUMERIC_CHECK);
	}

	public function show(Request $request, $id) {

        $user = User::find($id);
        $userDetail = array();

        $my_self = false;
		$token = $request->input('_token') ?: $request->header('X-XSRF-TOKEN');
		if ( $token )  {
            $token = $request->header('Authorization');
            if(isset($token[1])) {
                $token = explode(' ', $request->header('Authorization'))[1];
                $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));
                $my_self= User::find($payload['sub']);
            }
        }




        if($user) {
            $winwins = $user->winwins;
            foreach($winwins as $winwin) {
                $winwin->user;
            }

            $userDetail = $user->detail;
            $userDetail->email = $user->email;
            $userDetail->winwins = $winwins;
            $userDetail->groups = $user->groups;
            $userDetail->notifications = $user->notifications;

            $user->notifications->each(function($notification) {
                try {
                    $notification->object = $notification->getObject();
                } catch(\Exception $e) {
                }
                //$notification->formatted = trans('ww.'.$notification->body, $notification->object->toArray());
            });

            //$userDetail->followers = $user->followers;
            //$userDetail->following = $user->following;

            $followers = DB::table('user_details')
            ->select('user_details.name', 'user_details.lastname', 'user_details.photo', 'user_details.user_id')
            ->join('followers', 'user_details.user_id', '=', 'followers.follower_id')
            ->where('followers.followed_id', '=', $id)->get();
            $userDetail->followers = $followers;

            $following = DB::table('user_details')
            ->select('user_details.name', 'user_details.lastname', 'user_details.photo', 'user_details.user_id')
            ->join('followers', 'user_details.user_id', '=', 'followers.followed_id')
            ->where('followers.follower_id', '=', $id)->get();
            $userDetail->following = $following;



            $comments = DB::table('posts')
            ->select('posts.content', 'posts.created_at', 'posts.user_id', 'user_details.photo', 'user_details.name')
            ->join('user_details', 'posts.user_id', '=', 'user_details.user_id')
            ->where('posts.reference_id', '=', $id)->where('posts.type', 'USER')->orderBy('posts.created_at', 'desc')->get();

            $userDetail->comments = $comments;

            Log::info($my_self);
            if($my_self) {
                if($my_self->id == $id) {
                    $userDetail->myself = true;
                } else {
                    $already_following = count($user->followers->filter(function($model) use ($my_self) {
                        return $model->id == $my_self->id;
                    })) > 0;
                    $userDetail->already_following = $already_following;
                }
            }
            
        }

        return response()->json($userDetail, 200, [], JSON_NUMERIC_CHECK);
	}

    protected function createToken($user) {
        $payload = [
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + (2 * 7 * 24 * 60 * 60)
        ];
        return JWT::encode($payload, Config::get('app.token_secret'));
    }

    public function getUserStatus(Request $request) {
        $user = User::find($request['user']['sub']);
        return array(
            'notifications_unread' => $this->countUnreadNotifications($user)
        );
    }

    public function getUser(Request $request) {
        $user = User::find($request['user']['sub']);

        if(isset($user)) {
            $is_sponsor = false;
            $is_sponsor_active = false;
            $user->sponsor;
            if(isset($user->sponsor)) {
                $is_sponsor = true;
                $is_sponsor_active  = ($user->sponsor->status == 'ACTIVE');
            }
            return response()->json(
                array(
                'user' => $user,
                'profile' => $user->detail,
                'sponsor' => $user->sponsor,
                'is_sponsor' => $is_sponsor,
                'is_sponsor_active' => $is_sponsor_active,
                'active' => $user->active == 1,
                'notifications' => $this->notifications($user),
                'notifications_unread' => $this->countUnreadNotifications($user)
            ), 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json(
                array(
                'user' => false,
                'profile' => false,
                'sponsor' => false,
                'is_sponsor' => false, 
                'notifications' => false,
                'notifications_unread' => false
            ), 200, [], JSON_NUMERIC_CHECK);

        }
    }

    public function getUserTimeline($userId) {
        $user = User::find($userId);

        $activities = $user->notifications;
	$fellows = array();
        if(isset($user)) {
            foreach($user->following as $fellow) {
		$fellows[$fellow->id] = $fellow;
                $activities = $activities->merge($fellow->notifications->filter(function ($item) {
		    return !in_array($item->type, array('CAMPANADA', 'SPONSOR_CANCEL', 'SPONSOR_REQUEST'));
		}));
            } 
        }
	foreach($activities as $activity) {
		try {
		    $activity->object = $activity->getObject();
		} catch(\Exception $e) {
		}
	}

        return response()->json($activities->sortByDesc('id')->values(), 200, [], JSON_NUMERIC_CHECK);
    }

    public function updateUser(Request $request) {
        $user = User::find($request['user']['sub']);

        $user->username = $request->input('username');
        $user->email = $request->input('email');
        $user->save();

        $token = $this->createToken($user);

        return response()->json(['token' => $token]);
    }


    public function cancelAccount(Request $request) {
        $user = User::find($request['user']['sub']);

        $user->cancel_reason =  $request->input('body');
        $user->canceled = true;

        $user->save();

        return response()->json(['message' => 'user_cancel']);
    }


    public function updateProfile(Request $request) {
        $user = User::find($request['user']['sub']);

        if (!$user) {
            return response()->json(['message' => 'user_not_found']);
        }

        $userDetail = UserDetail::find($user->id);
        Log::info($userDetail);

		if($request->has('name')) {
            $userDetail->name = $request->input('name');
        }
		if($request->has('photo')) {
            $userDetail->photo = $request->input('photo');
        }
		if($request->has('cover_photo')) {
            $userDetail->cover_photo = $request->input('cover_photo');
        }
		if($request->has('lastname')) {
            $userDetail->lastname = $request->input('lastname');
        }
		if($request->has('birthdate')) {
            $userDetail->birthdate = $request->input('birthdate');
        }
		if($request->has('about')) {
            $userDetail->about = $request->input('about');
        }
		if($request->has('interests')) {
            $userDetail->interests = $request->input('interests');
        }
		if($request->has('language_code')) {
            $userDetail->language_code = $request->input('language_code');
        }
		if($request->has('invite_ww')) {
            $userDetail->invite_ww = $request->input('invite_ww');
        }
		if($request->has('ww_to_finish')) {
            $userDetail->ww_to_finish = $request->input('ww_to_finish');
        }
		if($request->has('invite_group')) {
            $userDetail->invite_group = $request->input('invite_group');
        }
		if($request->has('not_message')) {
            $userDetail->not_message = $request->input('not_message');
        }
		if($request->has('email_notification')) {
            $userDetail->email_notification = $request->input('email_notification');
        }
		if($request->has('private')) {
            $userDetail->private = $request->input('private');
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

        $userDetail->save();

        Log::info($userDetail);
        
        return $userDetail;
    }

	public function search(Request $request, UserRepository $userRepository) {
        $query = $request->input('q');
        return $userRepository->search($query);
    }

	public function notifications($user) {
        $notifications = $user->notifications;
        return $notifications;
	}

	public function countUnreadNotifications($user) {
        Log::info("USER: ".$user);
        $notificationsCount = $user->notifications()->unread()->count();
        return $notificationsCount;
    }

	public function unreadNotifications($id) {
        $user = User::find($id);
        $notifications = $user->notifications()->unread()->get();
        return $notifications;
	}

	public function follow(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $followed = User::find($id);

        $already_following = false;
        if(!$user) {
            return response()->json(['message' => 'follow_not_logged'], 401);
        }

        if($user->id == $followed->id) {
            return response()->json(['message' => 'follow_not_himself'], 400);
        } else {
            Log::info($followed->followers);
            $already_following = count($followed->followers->filter(function($model) use ($user) {
                Log::info($model);
                return $model->id == $user->id;
            })) > 0;

            if($already_following) {
                return response()->json(['message' => 'follow_already_folllowing'], 400);
            } else {
                DB::transaction(function() use ($followed, $user) {
                    $followedsUsers = new Follower;
                    $followedsUsers->follower_id = $user->id;
                    $followedsUsers->followed_id = $followed->id;
                    $followedsUsers->save();
                    DB::table('users')->whereId($followed->id)->increment('followers_amount');

                    $followed->newNotification()
                        ->from($user)
                        ->withType('FOLLOWING')
                        ->withSubject('following_you_title')
                        ->withBody('following_you_body')
                        ->regarding($user)
                        ->deliver();
                });
            }
        }
        return response()->json(['follow']);
	}

	public function unfollow(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $followed = User::find($id);
        $already_following = count($followed->followers->filter(function($model) use ($user) {
            return $model->id == $user->id;
        })) > 0;

        if(!$already_following) {
            return response()->json(['message' => 'follow_follow_first_to_unfollow'], 400);
        } else {
            DB::table('followers')->where('follower_id', $user->id )->where('followed_id', $followed->id)->delete();
            if($user->followers_amount > 0) {
                DB::table('users')->whereId($user->id)->decrement('followers_amount');
            }
        }
        return response()->json(['unfollow']);
	}

	public function comment(Request $request, $id) {
        $user = User::find($request['user']['sub']);

        $post = new Post;

        DB::transaction(function() use ($request, $post, $user, $id) {
            $post->reference_id = $id;
            $post->type = 'USER';
            $post->user_id = $user->id;
            $post->title = '';
            $post->content = $request->input('content');
            $post->save();
        });

                                    
        $comments = DB::table('posts')
            ->select('posts.content', 'posts.created_at', 'posts.user_id', 'user_details.photo', 'user_details.name')
            ->join('user_details', 'posts.user_id', '=', 'user_details.id')
            ->where('posts.reference_id', '=', $id)->where('posts.type', 'USER')->orderBy('posts.created_at', 'desc')->get();

        return $comments;
	}

	public function markNotificationsAsRead(Request $request) {
        $user = User::find($request['user']['sub']);

        DB::transaction(function() use ($user) {
            DB::table('notifications')
                ->where('user_id', $user->id)
                ->update(['is_read' => 1]);
        });

        return array(
            'message' => 'notifications_mark_as_read'
        );
	}

    public function storeImage(Request $request, Media $media) {

        $user = User::find($request['user']['sub']);

        if(!$request->hasFile('file')) { 
            return Response::json(['error' => 'no_file_sente']);
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

        Log::info($request->file('file'));

        $image = Media::create([
            'name' => $request->file('file')->getClientOriginalName(),
            'ext' => $request->file('file')->guessExtension(),
            'user_id' => $user->id || 1,
            'bucket' => 'S3',
            'type' => 'IMAGE'
        ]);
        
        $filename = 'user_'.md5(strtolower(trim($image->name))).'_'.$image->id . '.' . $image->ext;

        Log::info('Uploading to S3 file '.$filename);
        Storage::disk('s3-gallery')->put('/' . $filename, file_get_contents($file), 'public');

        return Response::json(['OK' => 1, 'filename' => $filename]);
    }


}
