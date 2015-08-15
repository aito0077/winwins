<?php namespace Winwins\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Model\Post;
use Winwins\Model\Winwin;
use Winwins\User;

use Illuminate\Http\Request;

class PostController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

	public function index() {
        $posts = Post::all();
        return $posts;
	}

	public function show(Request $request, $id) {
        $post = Post::find($id);
        return $post;
	}

	public function store(Request $request) {
        $user = User::find($request['user']['sub']);

        $post = new Post;
        DB::transaction(function() use ($request, $post, $user) {

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

        return Response::json(['OK' => 1, 'filename' => $filename]);
    }




}

