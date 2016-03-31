<?php namespace Winwins\Http\Controllers;

use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Language;
use Winwins\TranslateNamespace;
use Winwins\TranslateValue;
use Log;
use DB;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;

class LanguageController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['translation']]);
    }

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

    public function translation(Request $request) {
        $words = DB::table('translate_values')
            ->join('translate_namespaces', function($join) {
                 $join->on('translate_values.namespace_id', '=', 'translate_namespaces.id')->where('translate_namespaces.type', '=', 'GLOBAL');
            })
            ->join('languages', function($join) use($request) {
                 $join->on('translate_values.language_id', '=', 'languages.id')->where('languages.iso_code', '=', $request->input('lang'));
            })
            ->select(DB::raw('translate_namespaces.module, translate_namespaces.sub_module, translate_namespaces.key, translate_values.text'))
            ->get();


        $collection = Collection::make($words);
        $translations = $collection->map(function ($item, $key) {
            $key_trans = $item->module.'.'.(isset($item->sub_module) && $item->sub_module != '' ? $item->sub_module.'.' : '').$item->key;
            return array($key_trans => $item->text);
        });
        Log::info($translations);
        
        return $translations; 
    }

}
