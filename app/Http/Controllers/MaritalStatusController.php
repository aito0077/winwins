<?php namespace Winwins\Http\Controllers;

use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Model\MaritalStatus;

use Illuminate\Http\Request;

class MaritalStatusController extends Controller {

	public function index() {
        $maritalStatus = MaritalStatus::all();
        return $maritalStatus;
	}

	public function store() {
        $maritalStatus = MaritalStatus::create(Request::all());
        return $maritalStatus;
	}

	public function show($id) {
        $maritalStatus = MaritalStatus::find($id);
        return $maritalStatus;
	}


	public function update($id) {
        $maritalStatus = MaritalStatus::find($id);
        //Set updated
        $maritalStatus->save();
        return $maritalStatus;
	}

	public function destroy($id) {
        MaritalStatus::destroy($id);
	}

	public function create() {
		//
	}

	public function edit($id) {
		//
	}

}
