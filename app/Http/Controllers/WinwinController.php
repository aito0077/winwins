<?php namespace Winwins\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Model\Winwin;
use Winwins\Model\WinwinsUser;
use Winwins\User;

use Illuminate\Http\Request;

class WinwinController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

	public function index() {
        $winwins = Winwin::all();
        return $winwins;
	}

	public function show(Request $request, $id) {
        $winwin = Winwin::find($id);
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

        $winwin->user;
        $users_count = count($winwin->users);

        $winwin->users_already_joined = $users_count;
        $winwin->users_left = ($winwin->users_amount - $users_count);

        $winwin->already_joined = false;
        if($user) {
            $winwin->already_joined = count($winwin->users->filter(function($model) use ($user) {
                $model->detail;
                return $model->id == $user->id;
            })) > 0;
        }

        return $winwin;
	}

	public function store(Request $request) {
        Log::info($request['user']);
        $user = User::find($request['user']['sub']);
        Log::info($user);


        $winwin = new Winwin;
        DB::transaction(function() use ($request, $winwin, $user) {

            $winwin->closing_date = $request->input('closing_date');
            $winwin->description = $request->input('description');
            $winwin->title = $request->input('title');
            $winwin->users_amount = $request->input('users_amount');
            $winwin->what_we_do = $request->input('what_we_do');
            $winwin->scope = $request->input('scope') || 'GLOBAL';
            $winwin->region = $request->input('region');
            $winwin->country = $request->input('country');
            $winwin->state = $request->input('state');
            $winwin->city = $request->input('city');
            $winwin->image = $request->input('image');

            $winwin->user_id = $user->id;
            $winwin->save();
                 
            $winwinsUsers = new WinwinsUser;
            $winwinsUsers->user_id = $user->id;
            $winwinsUsers->winwin_id = $winwin->id;
            $winwinsUsers->moderator = true;
            $winwinsUsers->save();

        });

        return $winwin;
	}

	public function update($id) {
        $winwin = Winwin::find($id);

        $winwin->closing_date = $request->input('closing_date');
        $winwin->description = $request->input('description');
        $winwin->title = $request->input('title');
        $winwin->users_amount = $request->input('users_amount');
        $winwin->what_we_do = $request->input('what_we_do');
        $winwin->scope = $request->input('scope') || 'GLOBAL';
        $winwin->region = $request->input('region');
        $winwin->country = $request->input('country');
        $winwin->state = $request->input('state');
        $winwin->city = $request->input('city');
        $winwin->image = $request->input('image');

        $winwin->save();
        return $winwin;
	}

	public function destroy($id) {
        Winwin::destroy($id);
	}

    //Actions
	public function join(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $winwin = Winwin::find($id);
        $winwin->user();
        if($user->id == $winwin->user->id) {
            return response()->json(['message' => 'As owner you are already joined'], 400);
        } else {
            $already_joined = count($winwin->users->filter(function($model) use ($user) {
                return $model->id == $user->id;
            })) > 0;

            if($already_joined) {
                return response()->json(['message' => 'You are already joined'], 400);
            } else {
                DB::transaction(function() use ($winwin, $user) {
                    $winwinsUsers = new WinwinsUser;
                    $winwinsUsers->user_id = $user->id;
                    $winwinsUsers->winwin_id = $winwin->id;
                    $winwinsUsers->moderator = false;
                    $winwinsUsers->save();
                });
            }
        }
	}

	public function left(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $winwin = Winwin::find($id);
        $winwin->user();
        if($user->id == $winwin->user->id) {
            return response()->json(['message' => 'As owner you can not left this winwin'], 400);
        } else {
            $already_joined = count($winwin->users->filter(function($model) use ($user) {
                return $model->id == $user->id;
            })) > 0;

            if(!$already_joined) {
                return response()->json(['message' => 'You have to join in order to left'], 400);
            } else {
                DB::table('winwins_users')->where('user_id', $user->id )->where('winwin_id', $winwin->id)->delete();
            }
        }
	}

	public function create() {
		//
	}

	public function edit($id) {
		//
	}

}
