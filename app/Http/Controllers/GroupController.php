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
use Winwins\Model\Group;
use Winwins\Model\GroupsUser;
use Winwins\Model\GroupsWinwin;
use Winwins\Model\Repository\GroupRepository;
use Winwins\Model\Winwin;
use Winwins\Model\Post;

use Illuminate\Http\Request;

class GroupController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['paginate', 'index', 'show', 'search']]);
    }

    public function paginate(Request $request, $page = 0, $amount = 15) {
        $groups = DB::table('groups')->where('private', '=', 0)->skip($page * $amount)->take($amount)->get();
        $collection = Collection::make($groups);
        $collection->each(function($group) {
            $users_count = DB::table('users')
                ->join('groups_users', 'users.id', '=', 'groups_users.user_id')
                ->where('groups_users.group_id', '=', $group->id)->count();
            $group->users_already_joined = $users_count;
        });
        return $collection;
    }



	public function index() {
        $groups = Group::all();
        $collection = Collection::make($groups);
        $collection->each(function($group) {
            $users_count = count($group->users);
            $group->users_already_joined = $users_count;
        });
        return $collection;

	}

	public function store(Request $request) {
        $user = User::find($request['user']['sub']);

        $group = new Group;
        DB::transaction(function() use ($request, $group, $user) {

            $group->name = $request->input('name');
            $group->description = $request->input('description');
            $group->private = $request->input('private') ? 1 : 0;
            $group->control_ww = $request->input('control_ww') ? 1 : 0;
            $group->confirm_ww = $request->input('confirm_ww') ? 1 : 0;

            $group->photo = $request->input('photo');
            if( !isset($group->photo) ) {
                $group->photo = $request->input('gallery_image');
                if( !isset($group->photo) ) {
                    $group->photo = 'group-default.gif';
                }
            }

            $group->user_id = $user->id;
            $group->save();
                 
            $groupsUsers = new GroupsUser;
            $groupsUsers->user_id = $user->id;
            $groupsUsers->group_id = $group->id;
            $groupsUsers->moderator = true;
            $groupsUsers->save();

            $user->newActivity()
                ->from($user)
                ->withType('GROUP_CREATED')
                ->withSubject('you_have_created_new_group_title')
                ->withBody('you_have_created_new_group_title_body')
                ->regarding($group)
                ->deliver();


        });

        Log::info('grupo creado');
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

                    $user->newActivity()
                        ->from($user)
                        ->withType('GROUP_JOIN')
                        ->withSubject('you_have_join_group_title')
                        ->withBody('you_have_join_group_title_body')
                        ->regarding($group)
                        ->deliver();


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
                DB::transaction(function() use ($group, $user) {
                    DB::table('groups_users')->where('user_id', $user->id )->where('group_id', $group->id)->delete();

                    $user->newActivity()
                        ->from($user)
                        ->withType('GROUP_LEFT')
                        ->withSubject('you_have_left_group_title')
                        ->withBody('you_have_left_group_title_body')
                        ->regarding($group)
                        ->deliver();

                });


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

	public function conversation(Request $request, $id) {
        $user = User::find($request['user']['sub']);

        $post = new Post;

        DB::transaction(function() use ($request, $post, $user, $id) {
            $post->reference_id = $id;
            $post->type = 'CONVERSATION';
            $post->user_id = $user->id;
            $post->title = $request->input('title');
            $post->content = $request->input('content');
            $post->save();
        });

        return $this->group_thread($id);                                    
	}



    public function thread(Request $request, $id) {
        return $this->group_thread($id);                                    
    }

    public function group_thread($id) {
        $comments = DB::table('posts')
            ->select('posts.id', 'posts.title', 'posts.content', 'posts.created_at', 'posts.user_id', 'user_details.photo', 'user_details.name')
            ->join('user_details', 'posts.user_id', '=', 'user_details.user_id')
            ->join('groups', 'posts.reference_id', '=', 'groups.id')
            ->where('posts.reference_id', '=', $id)->where('posts.type', 'CONVERSATION')->orderBy('posts.created_at', 'desc')->get();
        
        Log::info($comments);

        $collection = Collection::make($comments);
        $collection->each(function($comment) {
            //Log::info($comment);
            $replies = DB::table('posts')
                ->select('posts.content', 'posts.created_at', 'posts.user_id', 'user_details.photo', 'user_details.name')
                ->join('user_details', 'posts.user_id', '=', 'user_details.user_id')
                ->where('posts.reference_id', '=', $comment->id)->where('posts.type', 'REPLY')->orderBy('posts.created_at', 'desc')->get();
            $comment->replies = $replies;
        });

        return $comments;

    }


	public function conversation_reply(Request $request, $groupId, $id) {
        $user = User::find($request['user']['sub']);

        $post = new Post;

        DB::transaction(function() use ($request, $post, $user, $id) {
            $post->reference_id = $id;
            $post->type = 'REPLY';
            $post->user_id = $user->id;
            $post->content = $request->input('content');
            $post->save();
        });

        return $this->group_thread($groupId);                                    
                                    
	}




}
