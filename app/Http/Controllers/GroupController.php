<?php namespace Winwins\Http\Controllers;

use Auth;
use Log;
use DB;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\User;
use Winwins\Model\Group;
use Winwins\Model\GroupsUser;

use Illuminate\Http\Request;

class GroupController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index']]);
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


	public function show($id) {
        $group = Group::find($id);
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
            return response()->json(['message' => 'As owner you can left this group'], 400);
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

        $already_joined = count($group->winwins->filter(function($model) use ($winwin) {
            return $model->id == $winwin->id;
        })) > 0;

        if($already_joined) {
            return response()->json(['message' => 'This winwin is already joined'], 400);
        } else {
            DB::transaction(function() use ($group, $winwin) {
                $groupsUsers = new GroupsWinwin;
                $groupsUsers->user_id = $winwin->id;
                $groupsUsers->group_id = $group->id;
                $groupsUsers->pending = true;
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
