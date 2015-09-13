<?php namespace Winwins\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use Log;
use DB;
use JWT;
use Illuminate\Support\Collection;
use Winwins\User;
use Winwins\Model\Follower;
use Winwins\Model\UserDetail;
use Winwins\Model\Repository\UserRepository;

class UserController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show', 'search']]);
    }

    public function paginate(Request $request, $page = 0, $amount = 15) {
        $users = DB::table('user_details')
                                    ->join('users', 'user_details.user_id', '=', 'users.id')
                                    ->where('users.active', '=', 1)
                                    ->where('users.suspend', '=', 0)
                                    ->skip($page * $amount)
                                    ->take($amount)->get();
        $collection = Collection::make($users);
        $collection->each(function($user) {
            $winwins_count = DB::table('winwins')
                ->join('winwins_users', 'winwins.id', '=', 'winwins_users.user_id')
                ->where('winwins_users.user_id', '=', $user->id)->count();
            $user->winwins_count = $winwins_count;
        });
        return $collection;
    }

	public function index() {
        $users = UserDetail::all();
        return $users;
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

            $userDetail = $user->detail;
            $userDetail->winwins = $winwins;
            $userDetail->groups = $user->groups;
            $userDetail->notifications = $user->notifications;
            $userDetail->followers = $user->followers;
            $userDetail->following = $user->following;

            Log::info($my_self);
            if($my_self) {
                if($my_self->id == $id) {
                    $userDetail->myself = true;
                } else {
                    $already_following = count($userDetail->followers->filter(function($model) use ($my_self) {
                        return $model->id == $my_self->id;
                    })) > 0;
                    $userDetail->already_following = $already_following;
                }
            }
            
        }

        return $userDetail;
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
            'notifications_unread' => $this->countUnreadNotifications($user->id)
        );
    }

    public function getUser(Request $request) {
        $user = User::find($request['user']['sub']);

        return array(
            'user' => $user,
            'profile' => $user->detail,
            'sponsor' => $user->sponsor,
            'notifications' => $this->notifications($user->id),
            'notifications_unread' => $this->countUnreadNotifications($user->id)
        );
    }

    public function updateUser(Request $request) {
        $user = User::find($request['user']['sub']);

        $user->username = $request->input('username');
        $user->email = $request->input('email');
        $user->save();

        $token = $this->createToken($user);

        return response()->json(['token' => $token]);
    }

	public function search(Request $request, UserRepository $userRepository) {
        $query = $request->input('q');
        return $userRepository->search($query);
    }

	public function notifications($id) {
        $user = User::find($id);
        $notifications = $user->notifications;
        return $notifications;
	}

	public function countUnreadNotifications($id) {
        $user = User::find($id);
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

        if($user->id == $followed->id) {
            return response()->json(['message' => 'Can not follow yourself'], 400);
        } else {
            Log::info($followed->followers);
            $already_following = count($followed->followers->filter(function($model) use ($user) {
                Log::info($model);
                return $model->id == $user->id;
            })) > 0;

            if($already_following) {
                return response()->json(['message' => 'You are already following'], 400);
            } else {
                DB::transaction(function() use ($followed, $user) {
                    $followedsUsers = new Follower;
                    $followedsUsers->follower_id = $user->id;
                    $followedsUsers->followed_id = $followed->id;
                    $followedsUsers->save();

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
	}

	public function unfollow(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $followed = User::find($id);
        $already_following = count($followed->followers->filter(function($model) use ($user) {
            return $model->id == $user->id;
        })) > 0;

        if(!$already_following) {
            return response()->json(['message' => 'You have to follow in order to unfollow'], 400);
        } else {
            DB::table('followers')->where('follower_id', $user->id )->where('followed_id', $followed->id)->delete();
        }
	}



}
