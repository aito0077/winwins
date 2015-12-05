<?php namespace Winwins\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Storage;
use Validator;
use Response;
use Illuminate\Support\Collection;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Model\Post;
use Winwins\Model\PostVote;
use Winwins\Model\Media;
use Winwins\Model\Winwin;
use Winwins\User;

use Illuminate\Http\Request;

class PostController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show', 'posts']]);
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



        $posts = Post::where('type', strtoupper($type))->where('reference_id', $reference)->orderBy('created_at', 'desc')->get();
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

	public function store(Request $request) {
        Log::info($request['user']);
        $user = User::find($request['user']['sub']);
        Log::info($user);

        $post = new Post;
        DB::transaction(function() use ($request, $post, $user) {
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




}

