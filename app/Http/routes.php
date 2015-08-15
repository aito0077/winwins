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
Route::get('api/{post_type}/{post_reference}/posts', ['uses' => 'PostController@posts']);

Route::get('api/winwins/paginate/{page}/{amount}', ['uses' => 'WinwinController@paginate']);
Route::get('api/winwins/search', ['uses' => 'WinwinController@search']);
Route::get('api/winwins/gallery', ['uses' => 'WinwinController@gallery']);
Route::get('api/winwins/summary', ['uses' => 'WinwinController@summary']);
Route::get('api/winwins/join/{id}', ['middleware' => 'auth', 'uses' => 'WinwinController@join']);
Route::get('api/winwins/left/{id}', ['middleware' => 'auth', 'uses' => 'WinwinController@left']);
Route::post('api/winwins/upload', ['middleware' => 'auth', 'uses' => 'WinwinController@storeImage']);
Route::get('api/winwins/upload', ['middleware' => 'auth', 'uses' => 'WinwinController@flowUpload']);
Route::resource('api/winwins', 'WinwinController');
Route::post('api/winwins/{id}', ['middleware' => 'auth', 'uses' => 'WinwinController@update']);

Route::get('api/groups/paginate/{page}/{amount}', ['uses' => 'GroupController@paginate']);
Route::get('api/groups/search', ['uses' => 'GroupController@search']);
Route::get('api/groups/join/{id}', ['middleware' => 'auth', 'uses' => 'GroupController@join']);
Route::get('api/groups/left/{id}', ['middleware' => 'auth', 'uses' => 'GroupController@left']);
Route::get('api/groups/{id}/add_winwin/{winwin_id}', ['middleware' => 'auth', 'uses' => 'GroupController@addWinwin']);
Route::get('api/groups/{id}/remove_winwin/{winwin_id}', ['middleware' => 'auth', 'uses' => 'GroupController@removeWinwin']);
Route::resource('api/groups', 'GroupController');

Route::get('api/me', ['middleware' => 'auth', 'uses' => 'UserController@getUser']);
Route::put('api/me', ['middleware' => 'auth', 'uses' => 'UserController@updateUser']);
Route::get('api/users/search', ['uses' => 'UserController@search']);
Route::resource('api/users', 'UserController');

Route::resource('api/parametric/interests', 'InterestController');
Route::resource('api/parametric/marital', 'MaritalStatusController');
Route::resource('api/parametric/languages', 'LanguageController');
Route::resource('api/parametric/activities', 'ActivityTypeController');

// Initialize Angular.js Winwins Route.
Route::get('/', 'HomeController@index');

