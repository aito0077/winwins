<?php namespace Winwins\Http\Controllers;

use Log;
use File;

class HomeController extends Controller {

    public function index() {
        return File::get(public_path().'/index.html');
    }

    public function index() {
        return File::get(public_path().'/desktop/index.html');
    }


}
