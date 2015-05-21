<?php namespace Winwins\Http\Controllers;

use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Model\Group;

use Illuminate\Http\Request;

class GroupController extends Controller {

	public function index() {
        $groups = Group::all();
        return $groups;
	}

	public function store() {
        $group = Group::create(Request::all());
        return $group;
	}

	public function show($id) {
        $group = Group::find($id);
        return $group;
	}


	public function update($id) {
        $group = Group::find($id);
        //Set updated
        $group->save();
        return $group;
	}

	public function destroy($id) {
        Group::destroy($id);
	}

    //Actions
	public function create() {
		//
	}

	public function edit($id) {
		//
	}

}
