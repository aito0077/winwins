<?php namespace Winwins\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Carbon;
use Storage;
use Validator;
use Response;
use Illuminate\Support\Collection;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Model\Poll;
use Winwins\Model\PollVote;
use Winwins\Model\PollAnswer;
use Winwins\Model\Media;
use Winwins\Model\Winwin;
use Winwins\User;

use Illuminate\Http\Request;

class PollController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

	public function index() {
        $polls = Poll::all();
        return $polls;
	}

	public function show(Request $request, $id) {
        $poll = Poll::find($id);

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

        $total = 0;
        foreach($poll->answers as $answer) {
            $answer->vote_count = count($answer->votes);
            $total = $total + $answer->vote_count;
            if($user) {
                foreach($answer->votes as $vote) {
                    Log::info($vote->user_id);
                    Log::info($user->id);
                    if($vote->user_id == $user->id) {
                        $poll->has_answered = true;
                        Log::info($poll);
                        break;
                    } 
                    Log::info($poll);
                }
            }
        }
        $poll->total_votes = $total;

        Log::info($poll);
        return $poll;
	}

	public function createPoll(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $winwin = Winwin::find($id);

        $poll = new Poll;
        DB::transaction(function() use ($request, $poll, $user, $winwin) {

            if($request->has('closedate')) {
                $arr = explode(".", $request->input('closedate'), 2);
                $event_date = str_replace("T", " ", $arr[0]);
                $poll->closedate = Carbon::createFromFormat('Y-m-d H:i:s', $event_date);
            }

            $poll->user_id = $user->id;
            $poll->winwin_id = $winwin->id;
            $poll->name = $request->input('name');
            $poll->question = $request->input('question');
            $poll->selected = $request->input('selected');
            $poll->save();

            if($request->has('option_1')) {
                $answer = new PollAnswer;
                $answer->poll_id = $poll->id;
                $answer->content = $request->input('option_1');
                $answer->save();
            }

            if($request->has('option_2')) {
                $answer = new PollAnswer;
                $answer->poll_id = $poll->id;
                $answer->content = $request->input('option_2');
                $answer->save();
            }

            if($request->has('option_3')) {
                $answer = new PollAnswer;
                $answer->poll_id = $poll->id;
                $answer->content = $request->input('option_3');
                $answer->save();
            }

            if($request->has('option_4')) {
                $answer = new PollAnswer;
                $answer->poll_id = $poll->id;
                $answer->content = $request->input('option_4');
                $answer->save();
            }

                 
           
        });

        return $poll;
	}

	public function store(Request $request) {
        Log::info($request['user']);
        $user = User::find($request['user']['sub']);
        Log::info($user);

        $poll = new Poll;
        DB::transaction(function() use ($request, $poll, $user) {
            $poll->reference_id = $request->input('reference_id');
            $poll->type = $request->input('type');
            $poll->user_id = $user->id;
            $poll->title = $request->input('title');
            $poll->content = $request->input('content');
            $poll->media_id = $request->input('media_id');
                 
            if($request->input('media_type')) {
                if($request->input('media_type') == 'VIDEO') {
                    $video = new Media();
                    $video->path = $request->input('media_path');
                    $video->bucket = 'youtube';
                    $video->user_id = $user->id;
                    $video->type = 'VIDEO';
                    $video->save();

                    $poll->media_id = $video->id;

                }
            }

            $poll->save();
           
        });

        return $poll;
	}

	public function comment(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $poll = Poll::find($id);
        $comment = new Poll;

        DB::transaction(function() use ($request, $poll, $user, $comment) {
            $comment->reference_id = $poll->id;
            $comment->type = 'WW_COMMENT';
            $comment->user_id = $user->id;
            $comment->title = '';
            $comment->content = $request->input('content');
            $comment->save();
        });

        return $comment;
	}


	public function update($id) {
        $poll = Poll::find($id);

        $poll->save();
        return $poll;
	}

	public function destroy($id) {
        Poll::destroy($id);
	}

    //Actions
	public function create() {
		//
	}

	public function edit($id) {
		//
	}


	public function votePoll(Request $request, $id, $answerId) {
        $user = User::find($request['user']['sub']);
        $answer = PollAnswer::find($answerId);
        DB::transaction(function() use ($answer, $user) {
            $pollVote = PollVote::firstOrCreate([
                'user_id' => $user->id,
                'answer_id' => $answer->id,
            ]);
        });
        return response()->json(['message' => 'poll_voted'], 200);
    }

	public function vote(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $poll = Poll::find($id);

        DB::transaction(function() use ($poll, $user, $request) {
            $positive = $request->input('positive');

            $pollVote = PollVote::firstOrNew([
                'user_id' => $user->id,
                'poll_id' => $poll->id,
            ]);

            $firstTime = !isset($pollVote->id);
            $changeVote = !$firstTime && $positive != $pollVote->positive;

            $pollVote->positive = $positive;
            $pollVote->save();

            Log::info('first time? '.$firstTime);
            Log::info('changeVote? '.$changeVote);
            if($firstTime) {
                DB::table('polls')->whereId($poll->id)->increment($positive ? 'up_votes' : 'down_votes');
            } else {
                if($changeVote) {
                    DB::table('polls')->whereId($poll->id)->increment($positive ? 'up_votes' : 'down_votes');
                    DB::table('polls')->whereId($poll->id)->decrement($positive ? 'down_votes' : 'up_votes');
                }
            }

        });

	}




}


