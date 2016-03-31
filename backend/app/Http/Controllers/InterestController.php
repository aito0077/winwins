<?php namespace Winwins\Http\Controllers;

use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Model\Interest;

use Illuminate\Http\Request;

class InterestController extends Controller {

	public function index() {
        $interests = Interest::all();
        return $interests;
	}

	public function store() {
        $interest = Interest::create(Request::all());
        return $interest;
	}

	public function show($id) {
        $interest = Interest::find($id);
        return $interest;
	}


	public function update($id) {
        $interest = Interest::find($id);
        //Set updated
        $interest->save();
        return $interest;
	}

	public function destroy($id) {
        Interest::destroy($id);
	}

	public function create() {
		//
	}

	public function edit($id) {
		//
	}

}
