<?php namespace Winwins\Http\Controllers;

use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\ActivityType;

use Illuminate\Http\Request;

class ActivityTypeController extends Controller {

	public function index() {
        $activityTypes = ActivityType::all();
        return $activityTypes;
	}

	public function store() {
        $activityType = ActivityType::create(Request::all());
        return $activityType;
	}

	public function show($id) {
        $activityType = ActivityType::find($id);
        return $activityType;
	}


	public function update($id) {
        $activityType = ActivityType::find($id);
        //Set updated
        $activityType->save();
        return $activityType;
	}

	public function destroy($id) {
        ActivityType::destroy($id);
	}

	public function create() {
		//
	}

	public function edit($id) {
		//
	}

}
