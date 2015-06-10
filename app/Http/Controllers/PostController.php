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

}

