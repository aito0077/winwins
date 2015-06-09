<?php namespace Winwins\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\User;
use Winwins\Model\Group;
use Winwins\Model\GroupsUser;
use Winwins\Model\GroupsWinwin;
use Winwins\Model\Repository\GroupRepository;
use Winwins\Model\Winwin;

use Illuminate\Http\Request;

class GroupController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show', 'search']]);
    }

	public function index() {
        $groups = Group::all();
        return $groups;
	}

	public function store(Request $request) {
        $user = User::find($request['user']['sub']);

        $group = new Group;
        DB::transaction(function() use ($request, $group, $user) {

            $group->name = $request->input('name');
            $group->description = $request->input('description');
            $group->photo = $request->input('photo');
            $group->private = $request->input('private') || false;
            $group->control_ww = $request->input('control_ww') || false;
            $group->confirm_ww = $request->input('confirm_ww') || false;

            $group->user_id = $user->id;
            $group->save();
                 
            $groupsUsers = new GroupsUser;
            $groupsUsers->user_id = $user->id;
            $groupsUsers->group_id = $group->id;
            $groupsUsers->moderator = true;
            $groupsUsers->save();

        });

        return $group;
	}


	public function show(Request $request, $id) {
        $group = Group::find($id);

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


        $group->members_count = count($group->users);
        $group->winwins;
        $group->sponsors;

        $group->already_joined = false;

        if($user) {
            $group->already_joined = count($group->users->filter(function($model) use ($user) {
                $model->detail;
                return $model->id == $user->id;
            })) > 0;
        }


        return $group;
	}


	public function update($id) {
        $group = Group::find($id);
        //Set updated
        $group->save();
        return $group;
	}

	public function destroy($id) {
        Group::destroy($id);
	}

    //Actions
	public function search(Request $request, GroupRepository $groupRepository) {
        $query = $request->input('q');
        return $groupRepository->search($query);
    }


	public function join(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $group = Group::find($id);
        $group->user();
        if($user->id == $group->user->id) {
            return response()->json(['message' => 'As owner you are already joined'], 400);
        } else {
            $already_joined = count($group->users->filter(function($model) use ($user) {
                return $model->id == $user->id;
            })) > 0;

            if($already_joined) {
                return response()->json(['message' => 'You are already joined'], 400);
            } else {
                DB::transaction(function() use ($group, $user) {
                    $groupsUsers = new GroupsUser;
                    $groupsUsers->user_id = $user->id;
                    $groupsUsers->group_id = $group->id;
                    $groupsUsers->moderator = false;
                    $groupsUsers->save();
                });
            }
        }
	}

	public function left(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $group = Group::find($id);
        $group->user();
        if($user->id == $group->user->id) {
            return response()->json(['message' => 'As owner you can not left this group'], 400);
        } else {
            $already_joined = count($group->users->filter(function($model) use ($user) {
                return $model->id == $user->id;
            })) > 0;

            if(!$already_joined) {
                return response()->json(['message' => 'You have to join in order to left'], 400);
            } else {
                DB::table('groups_users')->where('user_id', $user->id )->where('group_id', $group->id)->delete();
            }
        }
	}

	public function addWinwin($id, $winwin_id) {
        $group = Group::find($id);
        $winwin = Winwin::find($winwin_id);

        $already_joined = false;
        $already_joined = count($group->winwins->filter(function($model) use ($winwin) {
            return $model->id == $winwin->id;
        })) > 0;

        if($already_joined) {
            return response()->json(['message' => 'This winwin is already joined'], 400);
        } else {
            DB::transaction(function() use ($group, $winwin) {
                $groupsWinwins = new GroupsWinwin;
                $groupsWinwins->winwin_id = $winwin->id;
                $groupsWinwins->group_id = $group->id;
                $groupsWinwins->pending = true;
                $groupsWinwins->save();
            });
        }
	}

	public function removeWinwin($id, $winwin_id) {
        $group = Group::find($id);
        $winwin = Winwin::find($winwin_id);

        $already_joined = count($group->winwins->filter(function($model) use ($winwin) {
            return $model->id == $winwin->id;
        })) > 0;

        if(!$already_joined) {
            return response()->json(['message' => 'This winwin is not joined'], 400);
        } else {
            DB::table('groups_winwins')->where('winwin_id', $winwin->id )->where('group_id', $group->id)->delete();
        }

	}

	public function create() {
		//
	}

	public function edit($id) {
		//
	}

}
