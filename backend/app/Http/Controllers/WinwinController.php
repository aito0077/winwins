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
use Winwins\Winwin;
use Winwins\Model\Repository\WinwinRepository;
use Winwins\WinwinsUser;
use Winwins\SponsorsWinwin;
use Winwins\Media;
use Winwins\Sponsor;
use Winwins\Location;
use Winwins\InterestsInterested;
use Winwins\User;
use Winwins\Message\Mailer;
use Winwins\Message\Message;

use Illuminate\Http\Request;

class WinwinController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['paginate', 'index', 'show', 'socialShow', 'search', 'summary', 'winwinSponsors', 'paginateCategories']]);
    }


	public function all() {
        $winwins = Winwin::all();
        return $winwins;
	}

    public function paginate(Request $request, $page = 0, $amount = 15, $filter = 'all') {
        //$winwins = DB::table('winwins')->where('published', '=', 1)->where('canceled', '=', 0)->skip($page * $amount)->take($amount)->get();
        $winwins = [];

        switch ($filter) {
            case 'finishing':
                $winwins = Winwin::where('closing_date', '<', Carbon::now()->addDay(2))->where('closing_date', '>', Carbon::now())->where('published', '=', 1)->where('canceled', '=', 0)->skip($page * $amount)->take($amount)->get();
                break;
            case 'popular':
                $winwins = Winwin::where('users_joined', '>', 5)->where('published', '=', 1)->where('canceled', '=', 0)->skip($page * $amount)->take($amount)->get();
                break;
            case 'select':
                $winwins = Winwin::where('published', '=', 1)->where('selected', '=', 1)->where('canceled', '=', 0)->skip($page * $amount)->take($amount)->get();
                break;
            case 'last':
                $winwins = Winwin::where('published', '=', 1)->where('selected', '=', 1)->where('canceled', '=', 0)->skip($page * $amount)->take($amount)->orderBy('created_at', 'desc')->get();
                break;
            case 'success':
                $winwins = Winwin::where('published', '=', 1)->where('status', '=', 'SUCCESSFUL')->where('canceled', '=', 0)->skip($page * $amount)->take($amount)->get();
                break;
            default:
                $winwins = Winwin::where('published', '=', 1)->where('canceled', '=', 0)->skip($page * $amount)->take($amount)->get();
        }

        //$winwins = Winwin::where('canceled', '=', 0)->skip($page * $amount)->take($amount)->get();
        //$winwins = DB::table('winwins')->where('canceled', '=', 0)->skip($page * $amount)->take($amount)->get();
        $collection = $this->processCollection($winwins);
        return response()->json($collection, 200, [], JSON_NUMERIC_CHECK);

    }

    public function paginateCategories(Request $request, $page = 0, $amount = 15) {
        $winwins = [];
        $categories = explode(",", $request->input('categories'));

        Log::info($categories);
        if($categories == 'all') {
            $winwins = Winwin::where('published', '=', 1)->where('canceled', '=', 0)->skip($page * $amount)->take($amount)->get();
            return response()->json($winwins, 200, [], JSON_NUMERIC_CHECK);

        } else {
            $winwins = Winwin::where('published', '=', 1)->where('canceled', '=', 0)
                ->join('interests_interested', 'winwins.id', '=', 'interests_interested.interested_id')
                ->whereIn('interests_interested.interest_id', $categories)
                ->where('interests_interested.type', '=', 'WINWIN')
                ->skip($page * $amount)->take($amount)->get();
            $collection = $this->processCollection($winwins);
            Log::info($collection);

            return response()->json($collection, 200, [], JSON_NUMERIC_CHECK);
        }

    }

    public function processCollection($winwins) {
        $collection = Collection::make($winwins);
        $collection->each(function($winwin) {
            if($winwin->users_amount) {
                $users_count = DB::table('users')
                    ->join('winwins_users', 'users.id', '=', 'winwins_users.user_id')
                    ->where('winwins_users.winwin_id', '=', $winwin->id)->count();
                $winwin->users_already_joined = $users_count;
                $winwin->users_left = ($winwin->users_amount - $users_count);
                $winwin->popular = $winwin->users_joined > 5;
                $winwin->finishing = $winwin->closing_date < Carbon::now()->addDay(2) && $winwin->closing_date > Carbon::now();
                $winwin->remarkable = $winwin->selected;
            }

            $winwin->sponsors;
            $winwin->user;

        });
        return $collection;

    }


	public function index() {
        //$winwins = Winwin::where('selected', 1)->where('published', 1)->where('canceled', 0)->where('closing_date', '>=', Carbon::now())->orderBy('created_at')->get();
        $winwins = Winwin::where('published', 1)->where('canceled', 0)->orderBy('selected', 'desc')->orderBy('users_joined', 'desc')->orderBy('created_at', 'desc')->take(30)->get();

        $collection = Collection::make($winwins);
        $collection->each(function($winwin) {
            /*
            $users_count = count($winwin->users);
            $winwin->users_already_joined = $users_count;
            */
            $users_count = $winwin->users_joined;
            $winwin->users_already_joined = $users_count;
            if($winwin->users_amount) {
                $winwin->users_left = ($winwin->users_amount - $users_count);
            }
            
            $winwin->popular = $winwin->users_joined > 5;
            $winwin->finishing = $winwin->closing_date < Carbon::now()->addDay(2) && $winwin->closing_date > Carbon::now();
            $winwin->remarkable = $winwin->selected;
            $winwin->mark = $winwin->popular ? 'popular' : ($winwin->finishing ? 'finishing' : 'remarkable');

            $winwin->sponsors;
            $winwin->user;
        });
        return response()->json($collection, 200, [], JSON_NUMERIC_CHECK);
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

        $ww_user = $winwin->user;
        $ww_user->detail;
        $users = $winwin->users;
        $sponsors = $winwin->sponsors;
        $location = $winwin->location;

        $users_count = count($users);
        $winwin->users_already_joined = $users_count;
        $winwin->users_left = ($winwin->users_amount - $users_count);

        $winwin->popular = $winwin->users_joined > 5;
        $winwin->finishing = $winwin->closing_date < Carbon::now()->addDay(2) && $winwin->closing_date > Carbon::now();
        $winwin->remarkable = $winwin->selected;
        $winwin->mark = $winwin->popular ? 'popular' : ($winwin->finishing ? 'finishing' : 'remarkable');

        $winwin->is_successful = ($winwin->status == 'SUCCESSFUL');


        $winwin->posts = DB::table('posts')
            ->where('type', '=', 'WINWIN')
            ->where('reference_id', '=', $winwin->id)->get();

        $winwin->interests = DB::table('interests')
            ->join('interests_interested', 'interests.id', '=', 'interests_interested.interest_id')
            ->where('type', '=', 'WINWIN')
            ->where('interested_id', '=', $winwin->id)
            ->select('interests.name','interests.description', 'interests.id')
            ->get();

        $winwin->already_joined = false;
        if($user) {
            $winwin->is_moderator = ( $winwin->user_id == $user->id );

            $mixFollowers = DB::table('winwins_users')
                ->join('followers', 'followers.followed_id', '=', 'winwins_users.user_id')
                ->where('winwins_users.winwin_id', '=', $winwin->id)
                ->where('followers.follower_id', '=', $user->id)
                ->select('followers.followed_id')
                ->get();

            $followed = Collection::make($mixFollowers)->pluck('followed_id');

            $winwin->already_joined = count($winwin->users->filter(function($model) use ($user, $winwin, $followed) {
                $model->detail;
                $model->my_self = ($model->id == $user->id);
                if($model->my_self && $model->pivot->moderator ) {
                   $winwin->is_moderator = true; 
                }


                $model->following = false;

                if(!$model->my_self) {
                    $model->following = $followed->contains($model->id);
                }

                if($model->my_self && $model->pivot->process_rate > 0) {
                    $winwin->already_rated = true;
                }

                return $model->my_self;
            })) > 0;

            if($winwin->is_moderator) {
                $winwin->already_joined = true;
            }

            $user->sponsor;
            $is_sponsor = isset($user->sponsor);
            $active_sponsors = array();
            foreach($sponsors as $sponsor) {
                if($sponsor->pivot->ww_accept == 1 && $sponsor->pivot->sponsor_accept == 1) {
                    array_push($active_sponsors, $sponsor);
                }
                
                if($is_sponsor && ($sponsor->user_id == $user->id)) {
                    if($sponsor->pivot->ww_accept == 1 && $sponsor->pivot->sponsor_accept == 1) {
                        $winwin->already_sponsored = true;
                    }
                    $winwin->sponsored_details = $sponsor->pivot;
                }
            }

            $winwin->active_sponsors = $active_sponsors;
        }

        $winwin->polls;


        $winwin->previous_id = Winwin::where('id', '<', $winwin->id)->max('id');
        $winwin->next_id = Winwin::where('id', '>', $winwin->id)->min('id');

        //return $winwin;
        return response()->json($winwin, 200, [], JSON_NUMERIC_CHECK);
	}

	public function winwinSponsors(Request $request, $id) {
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

        $ww_user = $winwin->user;
        $ww_user->detail;
        $users = $winwin->users;
        $sponsors = $winwin->sponsors;
        $sponsors->each(function($sponsor) use($user) {

            $sponsor->followers_count  = count($sponsor->users);
            $sponsor->winwins_count  = count($sponsor->winwins);
            $sponsor->groups_count  = count($sponsor->groups);

            $sponsor->already_following = false;

            if($user) {
                $sponsor->already_following = count($sponsor->users->filter(function($model) use ($user) {
                    $model->detail;
                    return $model->id == $user->id;
                })) > 0;
            }


        });

        return response()->json($sponsors, 200, [], JSON_NUMERIC_CHECK);

    }

    
	public function winwinSponsorsCandidates(Request $request, $id) {
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

        $ww_user = $winwin->user;
        $ww_user->detail;
        $users = $winwin->users;
        $wwSponsors = $winwin->sponsors;
        $sponsorsIds = array();
        foreach($wwSponsors as $wwSponsor) {
            array_push($sponsorsIds, $wwSponsor->id);
        }

        //$sponsors = DB::table('sponsors')->whereNotIn('id', $sponsorsIds)->get();
        $sponsors = Sponsor::whereNotIn('id', $sponsorsIds)->where('is_main', '=', 0)->where('status', '=', 'ACTIVE')->get();

        foreach($sponsors as $sponsor) {

            $sponsor->followers_count  = count($sponsor->users);
            $sponsor->winwins_count  = count($sponsor->winwins);
            $sponsor->groups_count  = count($sponsor->groups);

            $sponsor->already_following = false;

            if($user) {
                $sponsor->already_following = count($sponsor->users->filter(function($model) use ($user) {
                    $model->detail;
                    return $model->id == $user->id;
                })) > 0;
            }


        }

        return $sponsors;

    }


	public function store(Request $request) {
        $user = User::find($request['user']['sub']);

        if($user->active == 0) {
            return response()->json(['message' => 'operation_not_until_activate_account'], 400);
        }
        
        if($request->has('id')) {
            return $this->update($request, $request->input('id'));
        }

        $winwin = new Winwin;
        DB::transaction(function() use ($request, $winwin, $user) {

            $arr = explode(".", $request->input('closing_date'), 2);
            $event_date = str_replace("T", " ", $arr[0]);
            $winwin->closing_date = Carbon::createFromFormat('Y-m-d H:i:s', $event_date);
            $winwin->description = $request->input('description');
            $winwin->title = $request->input('title');
            $winwin->users_amount = $request->input('users_amount');
            $winwin->what_we_do = $request->input('what_we_do');
            $winwin->scope = $request->input('scope');
            $winwin->image = $request->input('image');

            if($request->has('location') && isset($request->input('location')['address_components'])) {
                $geo = $this->processGeoValue($request->input('location'));
                $location = Location::firstOrCreate($geo);
                $location->save();
                $winwin->location_id = $location->id;
            }

            if( !isset($winwin->image) ) {
                $winwin->image = $request->input('gallery_image')[0];
            }

            $winwin->user_id = $user->id;

            if($request->has('interests')) {
                $text_interest = Collection::make($request->input('interests'))->pluck('name')->toArray();
                $winwin->categories_text = implode(" ",$text_interest);
            }

            $winwin->save();
                 
            $winwinsUsers = new WinwinsUser;
            $winwinsUsers->user_id = $user->id;
            $winwinsUsers->winwin_id = $winwin->id;
            $winwinsUsers->creator = true;
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
                if(!isset($winwin->image)) {
                    $youtube_img = 'http://img.youtube.com/vi/'.$request->input('video').'/maxresdefault.jpg';
                
                    Storage::disk('s3-gallery')->put('/' .$request->input('video').'.jpg', file_get_contents($youtube_img), 'public');

                    $winwin->is_video = true;
                    $winwin->video = $request->input('video');
                    $winwin->image = $request->input('video').'.jpg';
                    $winwin->save();
                }
            }

            if($request->has('interests')) {
                $interests = $request->input('interests');
                foreach($interests as $interest) {

                    $interestsInterested = InterestsInterested::firstOrCreate([
                        'interest_id' => $interest['id'],
                        'interested_id' => $winwin->id,
                        'type' => 'WINWIN'
                    ]);
                }
            }

            $user->newActivity()
                ->from($user)
                ->withType('WW_CREATED')
                ->withSubject('you_have_created_new_ww_title')
                ->withBody('you_have_created_new_ww_title_body')
                ->regarding($winwin)
                ->deliver();
        });

        return $winwin;
	}

	public function update(Request $request, $id) {
        $winwin = Winwin::find($id);
        if(!isset($winwin)) {
            $winwin = Winwin::find($request->input('id'));
        }

        DB::transaction(function() use ($request, $winwin) {
            $winwin->closing_date = $request->input('closing_date');
            $winwin->description = $request->input('description');
            $winwin->title = $request->input('title');
            $winwin->users_amount = $request->input('users_amount');
            $winwin->what_we_do = $request->input('what_we_do');
            $winwin->scope = $request->input('scope');
            $winwin->image = $request->input('image');

            if($request->has('interests')) {
                $interests = $request->input('interests');
                DB::table('interests_interested')->where('type', 'WINWIN')->where('interested_id', $winwin->id)->delete();

                foreach($interests as $interest) {
                    $interestsInterested = InterestsInterested::firstOrCreate([
                        'interest_id' => $interest['id'],
                        'interested_id' => $winwin->id,
                        'type' => 'WINWIN'
                    ]);
                }

                $text_interest = Collection::make($request->input('interests'))->pluck('name')->toArray();
                $winwin->categories_text = implode(" ", $text_interest);

            }


            if($request->has('location') && isset($request->input('location')['address_components'])) {
                $geo = $this->processGeoValue($request->input('location'));
                $location = Location::firstOrCreate($geo);
                $location->save();
                $winwin->location_id = $location->id;
            }

            $winwin->save();
        });
        return $winwin;
	}

	public function updateNotifications(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $winwin = Winwin::find($id);

        if($user->id == $winwin->user->id) {
            DB::transaction(function() use ($request, $winwin) {

                $winwin->notification_user_post = $request->input('notification_user_post');
                $winwin->notification_new_participant = $request->input('notification_new_participant');
                $winwin->notification_new_poll = $request->input('notification_new_poll');
                $winwin->notification_announce = $request->input('notification_announce');
                $winwin->notification_new_sponsor = $request->input('notification_new_sponsor');
                $winwin->notification_closing_date = $request->input('notification_closing_date');
                $winwin->save();
            });
        }
        return $winwin;
	}

	public function destroy($id) {
        Winwin::destroy($id);
	}

	public function join(Request $request, Mailer $mailer, $id) {
        $user = User::find($request['user']['sub']);
        if($user->active == 0) {
            return response()->json(['message' => 'operation_not_until_activate_account'], 400);
        }


        $winwin = Winwin::find($id);
        $winwin->user();
        if($user->id == $winwin->user->id) {
            return response()->json(['message' => 'join_as_owner_already_joined'], 400);
        } else {
            $already_joined = count($winwin->users->filter(function($model) use ($user) {
                return $model->id == $user->id;
            })) > 0;

            if($already_joined) {
                return response()->json(['message' => 'join_already_join'], 400);
            } else {
                DB::transaction(function() use ($winwin, $user ) {
                    $winwinsUsers = new WinwinsUser;
                    $winwinsUsers->user_id = $user->id;
                    $winwinsUsers->winwin_id = $winwin->id;
                    $winwinsUsers->moderator = false;
                    $winwinsUsers->save();

                    DB::table('winwins')->whereId($winwin->id)->increment('users_joined');
                    DB::table('users')->whereId($user->id)->increment('winwins_amount');

                    $user->newActivity()
                        ->from($user)
                        ->withType('WW_JOIN')
                        ->withSubject('you_have_join_ww_title')
                        ->withBody('you_have_join_ww_title_body')
                        ->regarding($winwin)
                        ->deliver();

                    if(($winwin->users_joined + 1) == $winwin->users_amount) {
                        $winwin->status = 'SUCCESSFUL';
                        $winwin->save();
                        $winwin->user->newActivity()
                            ->from($winwin->user)
                            ->withType('WW_SUCCESSFUL')
                            ->withSubject('winwin_finished_successfully_title')
                            ->withBody('winwin_finished_successfully_body')
                            ->regarding($winwin)
                            ->deliver();

                    }

                });


                if($winwin->status == 'SUCCESSFUL') {
                    $this->sentCompleteQuorum($request, $mailer, $winwin);
                }


            }
        }
	}

	public function left(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $winwin = Winwin::find($id);
        $winwin->user();
        if($user->id == $winwin->user->id) {
            return response()->json(['message' => 'left_owner_cant'], 400);
        } else {
            $already_joined = count($winwin->users->filter(function($model) use ($user) {
                return $model->id == $user->id;
            })) > 0;

            if(!$already_joined) {
                return response()->json(['message' => 'left_first_join'], 400);
            } else {
                DB::transaction(function() use ($winwin, $user) {


                    DB::table('winwins_users')->where('user_id', $user->id )->where('winwin_id', $winwin->id)->delete();
                    DB::table('winwins')->whereId($winwin->id)->decrement('users_joined');
                    DB::table('users')->whereId($user->id)->decrement('winwins_amount');

                    $user->newActivity()
                        ->from($user)
                        ->withType('WW_LEFT')
                        ->withSubject('you_have_left_ww_title')
                        ->withBody('you_have_left_ww_title_body')
                        ->regarding($winwin)
                        ->deliver();
                });
 

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
                $winwin->status = 'PUBLISHED';
                $winwin->save();
                return response()->json(['message' => 'winwin_activated'], 200);
            } else {
                return response()->json(['message' => 'winwin_at_least_one_post_to_activate'], 400);
            }
        } else {
            return response()->json(['message' => 'winwin_you_are_not_the_admin'], 400);
        }
	}

	public function campanada(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $winwin = Winwin::find($id);
        $winwin->user();
        $campanada_body = $request->input('body');
        if($user->id == $winwin->user->id) {
            $users = $winwin->users;
            foreach($users as $member) {
                //if($member->id != $user->id)

                $member->newNotification()
                    ->from($user)
                    ->withType('CAMPANADA')
                    ->withSubject('New campanada')
                    ->withBody($campanada_body)
                    ->regarding($winwin)
                    ->deliver();
            }
            return response()->json(['message' => 'winwin_campanada_sent', 'amount' => count($users)], 200);
        } else {
            return response()->json(['message' => 'winwin_you_are_not_the_admin'], 400);
        }
	}

	public function acceptSponsor(Request $request, $id, $sponsorId) {
        DB::transaction(function() use ($id, $sponsorId) {
            DB::table('sponsors_winwins')->where('winwin_id', $id)->where('sponsor_id', $sponsorId)->update(['ww_accept' => 1]);
        });
        return response()->json(['message' => 'winwin_sponsor_accepted'], 200);
    }


	public function sentEmailInvitations(Request $request, Mailer $mailer, $winwinId) {

        $template_name = 'winwin_ww_invitation';
        $user = User::find($request['user']['sub']);
        $winwin = Winwin::find($winwinId);
        $detail = $user->detail;


        foreach($request->input('mails') as $recipient) {
            $message = new Message($template_name, array(
                'meta' => array(
                    'base_url' => 'http://dev-winwins.net',
                    'winwin_link' => 'http://dev-winwins.net/#/winwin-view/'.$winwin->id,
                    'logo_url' => 'http://winwins.org/imgs/logo-winwins_es.gif'
                ),
                'sender' => array(
                    'name' => $detail->name,
                    'lastname' => $detail->lastname,
                    'photo' => 'http://images.dev-winwins.net/72x72/smart/'.$detail->photo,
                ),
                'winwin' => array(
                    'id' => $winwin->id,
                    'users_amount' => $winwin->users_amount,
                    'what_we_do' => $winwin->what_we_do,
                ),

            ));
            $message->subject('WW - '.$winwin->title);
            $message->to(null, $recipient);
            $message_sent = $mailer->send($message);
        }





        return response()->json(['message' => 'winwin_emails_sent'], 200);
    }


	public function makeActivator(Request $request, $id, $participanteId) {
        DB::transaction(function() use ($id, $participanteId) {
            DB::table('winwins_users')->where('winwin_id', $id)->where('user_id', $participanteId)->update(['moderator' => 1]);
        });
        return response()->json(['message' => 'winwin_user_activated'], 200);
    }



	public function makeNormal(Request $request, $id, $participanteId) {
        DB::transaction(function() use ($id, $participanteId) {
            DB::table('winwins_users')->where('winwin_id', $id)->where('user_id', $participanteId)->update(['moderator' => 0]);
        });
        return response()->json(['message' => 'winwin_user_activated'], 200);
    }

	public function sponsorRequest(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $sponsor = $user->sponsor;

        $winwin = Winwin::find($id);
        $ww_user = $winwin->user;
        $request_body = $request->input('body');

        if((!isset($sponsor)) || $user->sponsor->status != 'ACTIVE') {
            return response()->json(['message' => 'winwin_you_are_not_an_sponsor'], 400);
        } else {
            $already_sponsored = count($winwin->sponsors->filter(function($model) use ($sponsor) {
                return $model->id == $sponsor->id;
            })) > 0;

            if($already_sponsored) {
                return response()->json(['message' => 'winwin_you_are_already_sponsored_this_winwin'], 400);
            } else {
                DB::transaction(function() use ($winwin, $user, $sponsor, $request_body) {
                    $winwinsSponsors = new SponsorsWinwin;
                    $winwinsSponsors->sponsor_id = $sponsor->id;
                    $winwinsSponsors->winwin_id = $winwin->id;
                    $winwinsSponsors->sponsor_message = $request_body;
                    $winwinsSponsors->sponsor_accept = 1;

                    $winwinsSponsors->save();
                });
                $ww_user->newNotification()
                    ->from($user)
                    ->withType('SPONSOR_REQUEST')
                    ->withSubject('Sponsor_request')
                    ->withBody($request_body)
                    ->regarding($winwin)
                    ->deliver();

                return response()->json(['message' => 'winwin_sponsor_request_sent'], 200);
            }
        }

	}


	public function sponsorForRequest(Request $request, $id, $sponsorId) {
        $user = User::find($request['user']['sub']);
        $sponsor = Sponsor::find($sponsorId);
        $winwin = Winwin::find($id);

        $ww_user = $winwin->user;
        $request_body = $request->input('body');
        $request_legend = $request->input('legend');

        $already_sponsored = count($winwin->sponsors->filter(function($model) use ($sponsor) {
            return $model->id == $sponsor->id;
        })) > 0;

        if($already_sponsored) {
            return response()->json(['message' => 'winwin_is_already_sponsored_this_winwin'], 400);
        } else {
            DB::transaction(function() use ($winwin, $user, $sponsor, $request_body, $request_legend) {
                $winwinsSponsors = new SponsorsWinwin;
                $winwinsSponsors->sponsor_id = $sponsor->id;
                $winwinsSponsors->winwin_id = $winwin->id;
                $winwinsSponsors->ww_message = $request_body;
                $winwinsSponsors->sponsor_text = $request_legend;
                $winwinsSponsors->ww_accept = 1;

                $winwinsSponsors->save();


                $sponsor->user->newNotification()
                    ->from($user)
                    ->withType('WW_REQUEST_SPONSOR')
                    ->withSubject('ww_request_sponsor')
                    ->withBody($request_body)
                    ->regarding($winwin)
                    ->deliver();
            });

            return response()->json(['message' => 'winwin_request_sent'], 200);
        }

	}

	public function sponsorLegend(Request $request, $id, $sponsorId) {
        $user = User::find($request['user']['sub']);
        $sponsor = Sponsor::find($sponsorId);
        $winwin = Winwin::find($id);

        $ww_user = $winwin->user;
        $legend = $request->input('legend');

        $already_sponsored = count($winwin->sponsors->filter(function($model) use ($sponsor) {
            return $model->id == $sponsor->id;
        })) > 0;

        if($already_sponsored) {
            DB::transaction(function() use ($winwin, $user, $sponsor, $legend) {

                SponsorsWinwin::where('sponsor_id', $sponsor->id)
                ->where('winwin_id', $winwin->id)
                ->update(['sponsor_text' => $legend]);

            });

            //ToDo: Add message
            return response()->json(['message' => 'winwin_sponsor_legend_set'], 200);
        } else {
            //ToDo: Add message
            return response()->json(['message' => 'winwin_is_not_sponsored_this_winwin'], 400);
        }

	}



	public function closeWinwin(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $winwin = Winwin::find($id);

        $request_body = $request->input('body');

        if($user->id == $winwin->user->id) {
            DB::transaction(function() use ($winwin, $user, $request_body) {
                $winwin->canceled = 1;
                $winwin->published = 0;
                $winwin->canceled_reason = $request_body;
                $winwin->save();
            });

            return response()->json(['message' => 'winwin_closed'], 200);
        } else {
            return response()->json(['message' => 'winwin_only_owner_can_close'], 400);
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
        
        $filename = 'winwin_'.md5(strtolower(trim($image->name))).'_'.$image->id . '.' . $image->ext;

        Storage::disk('s3-gallery')->put('/' . $filename, file_get_contents($file), 'public');
        $image->name = $filename;
        $image->save();

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

	public function socialShow(Request $request, $id) {
        $winwin = Winwin::find($id);
        $ww_user = $winwin->user;
        $ww_user->detail;
        return view('winwins.view', [
		'winwin' => $winwin,
                'facebook_app_id' => Config::get('facebook_app_id')
	]);
	}

	public function rate(Request $request, $id) {
        $user = User::find($request['user']['sub']);

        if($user->active == 0) {
            return response()->json(['message' => 'operation_not_until_activate_account'], 400);
        }


        $winwin = Winwin::find($id);

        DB::transaction(function() use ($winwin, $user, $request) {
            $rate = $request->input('rate');
            $winwinUser = WinwinsUser::firstOrNew([
                'user_id' => $user->id,
                'winwin_id' => $winwin->id,
            ]);
            WinwinsUser::where('user_id', $user->id)
                ->where('winwin_id', $winwin->id)
                ->update(['process_rate' => $rate]);

            $average = DB::table('winwins_users')->where('winwin_id', '=', $winwin->id)->where('process_rate', '>', 0)->avg('process_rate');
            $winwin->process_rate = (int) $average;
            $winwin->save();
        });



        return response()->json(['message' => 'winwin_rated'], 200);
        
	}

    public function processGeoValue($geo) {
        $result = array(
            'formatted_address' => $geo['formatted_address'],
            'google_id' => $geo['id'],
            'place_id' => $geo['place_id'],
            'name' => $geo['name']
        );
        $values_allowed = array(
            'sublocality' => true,
            'locality' => true,
            'sublocality_level_1',
            'administrative_area_level_2' => true,
            'administrative_area_level_1' => true,
            'country' => true,
            'latitude ' => true,
            'longitude' => true
        );

        $address_components = $geo['address_components'];
        if(is_array($address_components)) {
            foreach($address_components as $component) {
                $key_code =  $component['types'][0];
                if(isset($values_allowed[$key_code])) {
                    if($key_code == 'sublocality_level_1') {
                        $key_code = 'sublocality';
                    }
                    $result[$key_code] = $component['short_name']; 
                }
            }
        }
        $coordinates = $geo['coordinates'];
        if(is_array($coordinates)) {
            $result['latitude'] = $coordinates['lat'];
            $result['longitude'] = $coordinates['lng'];
        }
    
        return $result;
    }


	public function sentCompleteQuorum(Request $request, Mailer $mailer, $winwin) {
        Log::info("Enviando mails completado");
        $template_name = 'winwin_ww_total_users_joined';
        foreach($winwin->users as $user) {
            $recipient = $user->email;
            Log::info("Mail: ".$recipient);
            if(isset($recipient)) {
                $message = new Message($template_name, array(
                    'meta' => array(
                        'base_url' => 'http://dev-winwins.net',
                        'winwin_link' => 'http://dev-winwins.net/#/winwin-view/'.$winwin->id,
                        'logo_url' => 'http://winwins.org/imgs/logo-winwins_es.gif'
                    ),
                    'sender' => array(
                        'username' => $user->username,
                        'name' => $user->detail->name,
                        'photo' => 'http://images.dev-winwins.net/72x72/smart/'.$user->photo,
                    ),
                    'winwin' => array(
                        'id' => $winwin->id,
                        'users_amount' => $winwin->users_amount,
                        'winwin_title' => $winwin->title,
                        'what_we_do' => $winwin->what_we_do,
                    ),

                ));
                $message->subject('WW - '.$winwin->title);
                $message->to(null, $recipient);
                $message_sent = $mailer->send($message);
                Log::info("Mail enviado");
            }
        }
    }

	public function sentNewPost(Request $request, Mailer $mailer, $winwin, $post) {
        Log::info("Enviando mails nuevo Post");
        $template_name = 'winwin_ww_new_post';
        foreach($winwin->users as $user) {
            $recipient = $user->email;
            Log::info("Mail: ".$recipient);
            if(isset($recipient)) {
                $message = new Message($template_name, array(
                    'meta' => array(
                        'base_url' => 'http://dev-winwins.net',
                        'winwin_link' => 'http://dev-winwins.net/#/winwin-view/'.$winwin->id,
                        'logo_url' => 'http://winwins.org/imgs/logo-winwins_es.gif'
                    ),
                    'sender' => array(
                        'username' => $user->username,
                        'name' => $user->detail->name,
                        'photo' => 'http://images.dev-winwins.net/72x72/smart/'.$user->photo,
                    ),
                    'winwin' => array(
                        'id' => $winwin->id,
                        'users_amount' => $winwin->users_amount,
                        'winwin_title' => $winwin->title,
                        'what_we_do' => $winwin->what_we_do,
                    ),

                ));
                $message->subject('WW - '.$winwin->title);
                $message->to(null, $recipient);
                $message_sent = $mailer->send($message);
                Log::info("Mail enviado");
            }
        }
    }

	public function sponsorCancel(Request $request, $winwinId, $id) {
        $sponsor = Sponsor::find($id);
        $winwin = Winwin::find($winwinId);
        $ww_user = $winwin->user;
        $request_body = $request->input('body');

        if(!isset($sponsor)) {
            return response()->json(['message' => 'winwin_you_are_not_an_sponsor'], 400);
        } else {
            $already_sponsored = count($winwin->sponsors->filter(function($model) use ($sponsor) {
                return $model->id == $sponsor->id;
            })) > 0;

            if($already_sponsored) {
                DB::transaction(function() use ($winwin, $ww_user, $sponsor, $request_body) {
                    DB::table('sponsors_winwins')->where('sponsor_id', $sponsor->id )->where('winwin_id', $winwin->id)->delete();
                });
                $sponsor->user->newNotification()
                    ->from($ww_user)
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



}
