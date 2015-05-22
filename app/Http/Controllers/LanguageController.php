<?php namespace Winwins\Http\Controllers;

use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Model\Language;

use Illuminate\Http\Request;

class LanguageController extends Controller {

	public function index() {
        $languages = Language::all();
        return $languages;
	}

	public function store() {
        $language = Language::create(Request::all());
        return $language;
	}

	public function show($id) {
        $language = Language::find($id);
        return $language;
	}


	public function update($id) {
        $language = Language::find($id);
        //Set updated
        $language->save();
        return $language;
	}

	public function destroy($id) {
        Language::destroy($id);
	}

	public function create() {
		//
	}

	public function edit($id) {
		//
	}

}
