<?php


// OAuth, Login and Signup Routes.
Route::post('auth/twitter', 'AuthController@twitter');
Route::post('auth/facebook', 'AuthController@facebook');
Route::post('auth/google', 'AuthController@google');
Route::post('auth/login', 'AuthController@login');
Route::post('auth/signup', 'AuthController@signup');
Route::get('auth/unlink/{provider}', ['middleware' => 'auth', 'uses' => 'AuthController@unlink']);

// API Routes.
Route::get('api/me', ['middleware' => 'auth', 'uses' => 'UserController@getUser']);
Route::put('api/me', ['middleware' => 'auth', 'uses' => 'UserController@updateUser']);

Route::get('api/winwins/join/{id}', ['middleware' => 'auth', 'uses' => 'WinwinController@join']);
Route::get('api/winwins/left/{id}', ['middleware' => 'auth', 'uses' => 'WinwinController@left']);
Route::resource('api/winwins', 'WinwinController');
Route::resource('api/users', 'UserController');
Route::resource('api/groups', 'GroupController');

Route::resource('api/parametric/interests', 'InterestController');
Route::resource('api/parametric/marital', 'MaritalStatusController');
Route::resource('api/parametric/languages', 'LanguageController');
Route::resource('api/parametric/activities', 'ActivityTypeController');


// Initialize Angular.js Winwins Route.
Route::get('/', 'HomeController@index');
