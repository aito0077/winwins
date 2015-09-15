<?php


// OAuth, Login and Signup Routes.
Route::post('auth/twitter', 'AuthController@twitter');
Route::post('auth/facebook', 'AuthController@facebook');
Route::post('auth/google', 'AuthController@google');
Route::post('auth/login', 'AuthController@login');
Route::post('auth/signup', 'AuthController@signup');
Route::get('auth/token', 'AuthController@getToken');
Route::get('auth/unlink/{provider}', ['middleware' => 'auth', 'uses' => 'AuthController@unlink']);

// API Routes.
Route::get('api/posts/{post_type}/{post_reference}/posts', ['uses' => 'PostController@posts']);

Route::get('api/winwins/paginate/{page}/{amount}', ['uses' => 'WinwinController@paginate']);
Route::get('api/winwins/search', ['uses' => 'WinwinController@search']);
Route::get('api/winwins/gallery', ['uses' => 'WinwinController@gallery']);
Route::get('api/winwins/summary', ['uses' => 'WinwinController@summary']);
Route::get('api/winwins/activate/{id}', ['middleware' => 'auth', 'uses' => 'WinwinController@activate']);
Route::post('api/winwins/campanada/{id}', ['middleware' => 'auth', 'uses' => 'WinwinController@campanada']);
Route::post('api/winwins/sponsor_request/{id}', ['middleware' => 'auth', 'uses' => 'WinwinController@sponsorRequest']);

Route::get('api/winwins/join/{id}', ['middleware' => 'auth', 'uses' => 'WinwinController@join']);
Route::get('api/winwins/left/{id}', ['middleware' => 'auth', 'uses' => 'WinwinController@left']);
Route::post('api/winwins/upload', ['middleware' => 'auth', 'uses' => 'WinwinController@storeImage']);
//Route::post('api/winwins/upload', ['uses' => 'WinwinController@storeImage']);
Route::get('api/winwins/upload', ['middleware' => 'auth', 'uses' => 'WinwinController@flowUpload']);
Route::resource('api/winwins', 'WinwinController');
Route::post('api/winwins/{id}', ['middleware' => 'auth', 'uses' => 'WinwinController@update']);

Route::resource('api/posts', 'PostController');
Route::post('api/posts/upload', ['middleware' => 'auth', 'uses' => 'PostController@storeImage']);
Route::post('api/posts/{id}/comment', ['middleware' => 'auth', 'uses' => 'PostController@comment']);


Route::get('api/groups/paginate/{page}/{amount}', ['uses' => 'GroupController@paginate']);
Route::get('api/groups/search', ['uses' => 'GroupController@search']);
Route::get('api/groups/join/{id}', ['middleware' => 'auth', 'uses' => 'GroupController@join']);
Route::get('api/groups/left/{id}', ['middleware' => 'auth', 'uses' => 'GroupController@left']);
Route::get('api/groups/{id}/add_winwin/{winwin_id}', ['middleware' => 'auth', 'uses' => 'GroupController@addWinwin']);
Route::get('api/groups/{id}/remove_winwin/{winwin_id}', ['middleware' => 'auth', 'uses' => 'GroupController@removeWinwin']);
Route::resource('api/groups', 'GroupController');

Route::get('api/sponsors/paginate/{page}/{amount}', ['uses' => 'SponsorController@paginate']);
Route::get('api/sponsors/search', ['uses' => 'SponsorController@search']);
Route::get('api/sponsors/follow/{id}', ['middleware' => 'auth', 'uses' => 'SponsorController@follow']);
Route::get('api/sponsors/unfollow/{id}', ['middleware' => 'auth', 'uses' => 'SponsorController@unfollow']);
Route::resource('api/sponsors', 'SponsorController');

Route::get('api/me/status', ['middleware' => 'auth', 'uses' => 'UserController@getUserStatus']);
Route::get('api/me', ['middleware' => 'auth', 'uses' => 'UserController@getUser']);
Route::put('api/me', ['middleware' => 'auth', 'uses' => 'UserController@updateUser']);
Route::get('api/users/paginate/{page}/{amount}', ['uses' => 'UserController@paginate']);
Route::get('api/users/search', ['uses' => 'UserController@search']);
Route::get('api/users/follow/{id}', ['middleware' => 'auth', 'uses' => 'UserController@follow']);
Route::get('api/users/unfollow/{id}', ['middleware' => 'auth', 'uses' => 'UserController@unfollow']);
Route::post('api/users/{id}/comment', ['middleware' => 'auth', 'uses' => 'UserController@comment']);
Route::resource('api/users', 'UserController');

Route::resource('api/parametric/interests', 'InterestController');
Route::resource('api/parametric/marital', 'MaritalStatusController');
Route::resource('api/parametric/languages', 'LanguageController');
Route::resource('api/parametric/activities', 'ActivityTypeController');

Route::get('api/ww/search', ['uses' => 'SearchController@search']);


// Initialize Angular.js Winwins Route.
Route::get('/', 'HomeController@index');

