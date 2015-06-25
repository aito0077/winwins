<?php namespace Winwins\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use JWT;
use Winwins\User;
use Winwins\Model\UserDetail;
use Winwins\Model\Repository\UserRepository;

class UserController extends Controller {

	public function index() {
        $users = UserDetail::all();
        return $users;
	}

	public function show($id) {
        $user = User::find($id);
        $userDetail = array();
        if($user) {
            $winwins = $user->winwins;

            $userDetail = $user->detail;
            $userDetail->winwins = $winwins;
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

    public function getUser(Request $request) {
        $user = User::find($request['user']['sub']);

        return array(
            'user' => $user,
            'profile' => $user->detail
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


}
