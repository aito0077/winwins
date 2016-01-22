<?php namespace Winwins\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Storage;
use Validator;
use Carbon;
use Response;
use Illuminate\Support\Collection;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Model\Post;
use Winwins\Model\PostVote;
use Winwins\Model\Media;
use Winwins\Model\Winwin;
use Winwins\User;

use Winwins\Message\Mailer;
use Winwins\Message\Message;

use Illuminate\Http\Request;

class PostController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show', 'posts', 'socialShow']]);
    }

	public function index() {
        $posts = Post::all();
        return $posts;
	}

	public function posts(Request $request, $type, $reference) {
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



        $posts = Post::where('type', strtoupper($type))->where('canceled', '<>', 1)->where('reference_id', $reference)->orderBy('created_at', 'desc')->get();
        $collection = Collection::make($posts);
        $stickies = new Collection();
        $regulars = new Collection();
        $final = new Collection();

        $collection->each(function($post) use($stickies, $regulars, $user) {
            $userPost = $post->user;
            $userPost->detail;
            $post->media;
            $post->votes;
            $post->comments = Post::where('type', 'WW_COMMENT')->where('reference_id', $post->id)->orderBy('created_at', 'desc')->get();

            $post->comments->each(function($comment) {
                $userComment = $comment->user;
                $userComment->detail;
                $comment->media;
                $comment->votes;
            });

            if($user && count($post->votes) > 0) {
                $vote = $post->votes->search(function($item) use ($post, $user) {
                    if($item->user_id == $user->id) {
                        $post->self_vote = $item;
                    }
                });
            }
             
            if($post->sticky) {
                $stickies->push($post);
            } else {
                $regulars->push($post);
            }
        });

        

        $final = $stickies->sortByDesc('sticky_date')->merge($regulars);
        
        return array(
            'posts' => $final,
            'last' => $collection->last()
        );
	}

	public function show(Request $request, $id) {
        $post = Post::find($id);
        return $post;
	}

	public function store(Request $request, Mailer $mailer) {
        Log::info($request['user']);
        $user = User::find($request['user']['sub']);
        Log::info($user);

        $post = new Post;
        DB::transaction(function() use ($request, $post, $user, $mailer) {
            $post->reference_id = $request->input('reference_id');
            $post->type = $request->input('type');
            $post->user_id = $user->id;
            $post->title = $request->input('title');
            $post->content = $request->input('content');
            $post->media_id = $request->input('media_id');
                 
            if($request->input('media_type')) {
                if($request->input('media_type') == 'VIDEO') {
                    $video = new Media();
                    $video->path = $request->input('media_path');
                    $video->bucket = 'youtube';
                    $video->user_id = $user->id;
                    $video->type = 'VIDEO';
                    $video->save();

                    $post->media_id = $video->id;

                }
            }

            $post->save();

            if($post->type == 'WINWIN') {
                $winwin = Winwin::find($post->reference_id);
                $this->sentNewPost(Request $request, Mailer $mailer, $winwin, $post) {
            }

           
        });

        return $post;
	}

	public function comment(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $post = Post::find($id);
        $comment = new Post;

        DB::transaction(function() use ($request, $post, $user, $comment) {
            $comment->reference_id = $post->id;
            $comment->type = 'WW_COMMENT';
            $comment->user_id = $user->id;
            $comment->title = '';
            $comment->content = $request->input('content');
            $comment->media_id = $request->input('media_id');
                 
            if($request->input('media_type')) {
                if($request->input('media_type') == 'VIDEO') {
                    $video = new Media();
                    $video->path = $request->input('media_path');
                    $video->bucket = 'youtube';
                    $video->user_id = $user->id;
                    $video->type = 'VIDEO';
                    $video->save();

                    $comment->media_id = $video->id;

                }
            }

            $comment->save();
        });

        $post->comments;
        return $post;
	}


	public function update($id) {
        $post = Post::find($id);

        $post->save();
        return $post;
	}

	public function destroy($id) {
        Post::destroy($id);
	}

	public function dashboard($post_reference) {
        $posts = Post::winwins()->where('reference_id', $post_reference);
        return $posts;
	}

    //Actions
	public function create() {
		//
	}

	public function edit($id) {
		//
	}

    public function storeImage(Request $request, Media $media) {

        Log::info('subiendo imagen');
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

        $image = $media::create([
            'name' => $request->file('file')->getClientOriginalName(),
            'ext' => $request->file('file')->guessExtension(),
            'user_id' => $user->id,
            'type' => 'IMAGE'
        ]);
        
        $filename = 'post_'.md5(strtolower(trim($image->name))).'_'.$image->id . '.' . $image->ext;

        Log::info('Uploading to S3 file '.$filename);
        Storage::disk('s3-gallery')->put('/' . $filename, file_get_contents($file), 'public');
        $image->name = $filename;
        $image->save();

        return Response::json(['OK' => 1, 'filename' => $filename, 'media_id' => $image->id]);
    }

	public function vote(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $post = Post::find($id);

        DB::transaction(function() use ($post, $user, $request) {
            $positive = $request->input('positive');

            $postVote = PostVote::firstOrNew([
                'user_id' => $user->id,
                'post_id' => $post->id,
            ]);

            $firstTime = !isset($postVote->id);
            $changeVote = !$firstTime && $positive != $postVote->positive;

            $postVote->positive = $positive;
            $postVote->save();

            Log::info('first time? '.$firstTime);
            Log::info('changeVote? '.$changeVote);
            if($firstTime) {
                DB::table('posts')->whereId($post->id)->increment($positive ? 'up_votes' : 'down_votes');
            } else {
                if($changeVote) {
                    DB::table('posts')->whereId($post->id)->increment($positive ? 'up_votes' : 'down_votes');
                    DB::table('posts')->whereId($post->id)->decrement($positive ? 'down_votes' : 'up_votes');
                }
            }

        });

	}

	public function socialShow(Request $request, $id) {
        $post = Post::find($id);
        $winwin = Winwin::find($post->reference_id);
        $post_user = $post->user;
	$post->media;
        $post_user->detail;
        Log::info($post);
        return view('posts.view', [
            'winwin' => $winwin,
            'post' => $post,
            'media' => $post->media,
            'facebook_app_id' => Config::get('facebook_app_id')
        ]);
	}

	public function sticky(Request $request, $id) {
        $post = Post::find($id);

        DB::transaction(function() use ($post, $request) {
            $sticky = $request->input('sticky');
            $post->sticky = $sticky;
            if($sticky) {
                $post->sticky_date = Carbon::now();
            }
            $post->save();

        });

        return response()->json(['message' => 'sticky_set'], 200);
	}

	public function remove(Request $request, $id) {
        $post = Post::find($id);

        DB::transaction(function() use ($post, $request) {
            $sticky = $request->input('sticky');
            $post->canceled = true;
            $post->save();
        });
        return response()->json(['message' => 'post_removed'], 200);
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
                        'post_username' => $user->username,
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

}

