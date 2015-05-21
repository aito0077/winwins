<?php namespace Winwins\Http\Controllers;

use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Model\Winwin;

use Illuminate\Http\Request;

class WinwinController extends Controller {

	public function index() {
        $winwins = Winwin::all();
        return $winwins;
	}

	public function show($id) {
        $winwin = Winwin::find($id);
        return $winwin;
	}

	public function store() {
        $winwin = Winwin::create(Request::all());
        return $winwin;
	}

	public function update($id) {
        $winwin = Winwin::find($id);
        //Set updated fields
        $winwin->save();
        return $winwin;
	}

	public function destroy($id) {
        Winwin::destroy($id);
	}

    //Actions
	public function create() {
		//
	}

	public function edit($id) {
		//
	}

}
