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
use Winwins\Model\Story;
use Winwins\Model\Media;
use Winwins\Model\Winwin;
use Winwins\User;

use Illuminate\Http\Request;

class StoryController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

	public function index() {
        $stories = Story::all();
        return $stories;
	}

	public function show(Request $request, $id) {
        $story = Story::find($id);
        return $story;
	}

	public function store(Request $request) {
        Log::info($request['user']);
        $user = User::find($request['user']['sub']);
        Log::info($user);

        $story = new Story;
        DB::transaction(function() use ($request, $story, $user) {
            $story->user_id = $user->id;
            $story->title = $request->input('title');
            $story->subtitle = $request->input('subtitle');
            $story->content = $request->input('content');
            $story->media_id = $request->input('media_id');
                 
            if($request->input('media_type')) {
                if($request->input('media_type') == 'VIDEO') {
                    $video = new Media();
                    $video->path = $request->input('media_path');
                    $video->bucket = 'youtube';
                    $video->user_id = $user->id;
                    $video->type = 'VIDEO';
                    $video->save();

                    $story->media_id = $video->id;

                }
            }

            $story->save();
           
        });

        return $story;
	}

	public function comment(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $story = new Story;

        DB::transaction(function() use ($request, $story, $user) {
            $story->reference_id = $request->input('$id');
            $story->type = 'WW_COMMENT';
            $story->user_id = $user->id;
            $story->title = '';
            $story->content = $request->input('content');
            $story->save();
        });

        return $story;
	}


	public function update($id) {
        $story = Story::find($id);
        $story->title = $request->input('title');
        $story->subtitle = $request->input('subtitle');
        $story->content = $request->input('content');
        $story->media_id = $request->input('media_id');
        $story->save();
        return $story;
	}

	public function destroy($id) {
        Story::destroy($id);
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
        
        $filename = 'story_'.md5(strtolower(trim($image->name))).'_'.$image->id . '.' . $image->ext;

        Log::info('Uploading to S3 file '.$filename);
        Storage::disk('s3-gallery')->put('/' . $filename, file_get_contents($file), 'public');

        return Response::json(['OK' => 1, 'filename' => $filename, 'media_id' => $image->id]);
    }




}


