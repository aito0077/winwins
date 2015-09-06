<?php namespace Winwins\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Illuminate\Support\Collection;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Model\Post;
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

	public function posts($type, $reference) {
        $posts = Post::where('type', strtoupper($type))->where('reference_id', $reference)->orderBy('created_at', 'desc')->get();
        $collection = Collection::make($posts);
        $collection->each(function($post) {
            $user = $post->user;
            $user->detail;
            $post->media;
        });
        
        return array(
            'posts' => $collection,
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
        
        $filename = $image->id . '.' . $image->ext;

        Log::info('Uploading to S3 file '.$filename);
        Storage::disk('s3-gallery')->put('/' . $filename, file_get_contents($file), 'public');

        return Response::json(['OK' => 1, 'filename' => $filename, 'media_id' => $image->id]);
    }




}

