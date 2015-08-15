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

use Illuminate\Http\Request;

class SponsorController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show', 'search']]);
    }

    public function paginate(Request $request, $page = 0, $amount = 15) {
        $sponsors = DB::table('sponsors')->skip($page * $amount)->take($amount)->get();
        $collection = Collection::make($sponsors);
        $collection->each(function($sponsor) {
            $users_count = DB::table('users')
                ->join('sponsors_users', 'users.id', '=', 'sponsors_users.user_id')
                ->where('sponsors_users.sponsor_id', '=', $sponsor->id)->count();
            $sponsor->users_already_following = $users_count;
        });
        return $collection;
    }



	public function index() {
        $sponsors = Sponsor::all();
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

        Log::info('sponsor creado');
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


        $sponsor->followers = count($sponsor->users);
        $sponsor->winwins;

        $sponsor->already_following = false;

        if($user) {
            $sponsor->already_following = count($sponsor->users->filter(function($model) use ($user) {
                $model->detail;
                return $model->id == $user->id;
            })) > 0;
        }


        return $sponsor;
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
        $sponsor->user();
        if($user->id == $sponsor->user->id) {
            return response()->json(['message' => 'As owner you are already following'], 400);
        } else {
            $already_following = count($sponsor->users->filter(function($model) use ($user) {
                return $model->id == $user->id;
            })) > 0;

            if($already_following) {
                return response()->json(['message' => 'You are already following'], 400);
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
            return response()->json(['message' => 'As owner you can not left this sponsor'], 400);
        } else {
            $already_following = count($sponsor->users->filter(function($model) use ($user) {
                return $model->id == $user->id;
            })) > 0;

            if(!$already_following) {
                return response()->json(['message' => 'You have to follow in order to unfollow'], 400);
            } else {
                DB::table('sponsors_users')->where('user_id', $user->id )->where('sponsor_id', $sponsor->id)->delete();
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

