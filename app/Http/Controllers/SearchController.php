<?php namespace Winwins\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Response;
use Carbon;
use Illuminate\Support\Collection;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\User;
use Elasticsearch\Client;

use Illuminate\Http\Request;

class SearchController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['search']]);
        $params = array();
        $params['hosts'] = array(Config::get('app.es_hosts'));
        $this->elasticsearch = new Client($params);
    }

    public function paginate(Request $request, $page = 0, $amount = 15) {
        $winwins = DB::table('winwins')->where('published', '=', 1)->skip($page * $amount)->take($amount)->get();
        $collection = Collection::make($winwins);
        $collection->each(function($winwin) {
            if($winwin->users_amount) {
                $users_count = DB::table('users')
                    ->join('winwins_users', 'users.id', '=', 'winwins_users.user_id')
                    ->where('winwins_users.winwin_id', '=', $winwin->id)->count();
                $winwin->users_already_joined = $users_count;
                $winwin->users_left = ($winwin->users_amount - $users_count);
            }
        });
        return $collection;

    }

	public function index() {
        $winwins = Winwin::where('selected', 1)->where('published', 1)->where('closing_date', '>=', Carbon::now())->orderBy('created_at')->get();

        $collection = Collection::make($winwins);
        $collection->each(function($winwin) {
            $users_count = count($winwin->users);
            $winwin->users_already_joined = $users_count;
            if($winwin->users_amount) {
                $winwin->users_left = ($winwin->users_amount - $users_count);
            }
        });
        return $collection;
	}


    //Search
	public function search(Request $request) {
        $query = $request->input('q');
        $winwin = $request->input('winwin');
        $user = $request->input('user');
        $group = $request->input('group');
        $sponsor = $request->input('sponsor');

        $items = $this->elasticsearch->search([
            'index' => 'winwins',
            'body' => [
                'query' => [
                    'query_string' => [
                        'query' => $query
                    ]
                ]
            ]
        ]);

        if($request->has('groupped')) {
            return Collection::make($items['hits']['hits'])->groupBy('_type');
        } else {
            return Collection::make($items['hits']['hits']);
        }
    }


	public function summary(Request $request, WinwinRepository $winwinRepository) {
        $summary = $winwinRepository->summary();
        return $summary;
    }


}

