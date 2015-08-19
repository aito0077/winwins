<?php namespace Winwins\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Storage;
use Response;
use Validator;
use Carbon;
use Illuminate\Support\Collection;
use Illuminate\Pagination\Paginator;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Model\Winwin;
use Winwins\Model\Repository\WinwinRepository;
use Winwins\Model\WinwinsUser;
use Winwins\Model\Media;
use Winwins\Model\InterestsInterested;
use Winwins\User;

use Illuminate\Http\Request;

class WinwinController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['paginate', 'index', 'show', 'search', 'summary']]);
    }

    public function paginate(Request $request, $page = 0, $amount = 15) {
        $winwins = DB::table('winwins')->where('published', '=', 1)->skip($page * $amount)->take($amount)->get();
        $collection = Collection::make($winwins);
        $collection->each(function($winwin) {
            if($winwin->users_amount) {
                $users_count = DB::table('users')
                    ->join('winwins_users', 'users.id', '=', 'winwins_users.user_id')
                    ->where('winwins_users.winwin_id', '=', $winwin->id)->count();
                $winwin->users_already_joined = $users_count;
                $winwin->users_left = ($winwin->users_amount - $users_count);
            }
        });
        return $collection;

    }

	public function index() {
        $winwins = Winwin::where('selected', 1)->where('published', 1)->where('closing_date', '>=', Carbon::now())->orderBy('created_at')->get();

        $collection = Collection::make($winwins);
        $collection->each(function($winwin) {
            $users_count = count($winwin->users);
            $winwin->users_already_joined = $users_count;
            if($winwin->users_amount) {
                $winwin->users_left = ($winwin->users_amount - $users_count);
            }
        });
        return $collection;
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

        $user = $winwin->user;
        $user->detail;
        $users = $winwin->users;
        $sponsors = $winwin->sponsors;
        $users_count = count($users);
        $winwin->users_already_joined = $users_count;
        $winwin->users_left = ($winwin->users_amount - $users_count);

        $winwin->posts = DB::table('posts')
            ->where('type', '=', 'WINWIN')
            ->where('reference_id', '=', $winwin->id)->get();

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

            if($request->input('video')) {
                Media::create([
                    'name' => $request->input('video'),
                    'path' => $request->input('video'),
                    'bucket' => 'youtube',
                    'user_id' => $user->id,
                    'type' => 'VIDEO'
                ]);
            }
           
        });

        return $winwin;
	}

	public function update(Request $request, $id) {
        $winwin = Winwin::find($id);

        DB::transaction(function() use ($request, $winwin) {
            $winwin->closing_date = $request->input('closing_date');
            $winwin->description = $request->input('description');
            $winwin->title = $request->input('title');
            $winwin->users_amount = $request->input('users_amount');
            $winwin->what_we_do = $request->input('what_we_do');
            $winwin->scope = $request->input('scope') ? : 'GLOBAL';
            $winwin->region = $request->input('region');
            $winwin->country = $request->input('country');
            $winwin->state = $request->input('state');
            $winwin->city = $request->input('city');
            $winwin->image = $request->input('image');

            $interest = $request->input('interest');
            Log::info($interest);

            $interestIntrested = new InterestsInterested;
            $interestIntrested->interest_id = $interest['id'];
            $interestIntrested->interested_id = $winwin->id;
            $interestIntrested->type = 'WINWIN';

            $interestIntrested->save();
            $winwin->save();
        });
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

	public function activate(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $winwin = Winwin::find($id);
        $winwin->user();
        if($user->id == $winwin->user->id) {
            $post_count = DB::table('posts')
                ->where('type', '=', 'WINWIN')
                ->where('reference_id', '=', $winwin->id)->count();
            if($post_count > 0) {
                $winwin->published = 1;
                return response()->json(['message' => 'winwin_activated'], 200);
            } else {
                return response()->json(['message' => 'at_least_one_post_to_activate'], 400);
            }
        } else {
            return response()->json(['message' => 'you_are_not_the_admin'], 400);
        }
	}



	public function create() {
		//
	}

	public function edit($id) {
		//
	}

    public function storeImage(Request $request, Media $media) {

        $user = User::find($request['user']['sub']);
        Log::info($user);

        if(!$request->hasFile('file')) { 
            return Response::json(['error' => 'No File Sent']);
        }

        if(!$request->file('file')->isValid()) {
            return Response::json(['error' => 'File is not valid']);
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
        
        $filename = $image->id . '.' . $image->ext;

        Log::info('Uploading to S3 file '.$filename);
        Storage::disk('s3-gallery')->put('/' . $filename, file_get_contents($file), 'public');

        return Response::json(['OK' => 1, 'filename' => $filename]);
    }


    public function gallery() {
        $files = Storage::disk('s3-gallery')->allFiles('/gallery/');
        return $files;
    }


    //Search
	public function search(Request $request, WinwinRepository $winwinRepository) {
        $query = $request->input('q');
        return $winwinRepository->search($query);
    }


	public function summary(Request $request, WinwinRepository $winwinRepository) {
        $summary = $winwinRepository->summary();
        return $summary;
    }


}
