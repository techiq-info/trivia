<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', 'HomeController@index')->name('home');

// Static Pages
Route::get('home', ['as' => 'home', 'uses' => 'HomeController@index']);
Route::post('play', ['as' => 'play', 'uses' => 'HomeController@play']);
Route::get('quiz', ['as' => 'quiz', 'uses' => 'HomeController@QuizPlay']);




Route::get('about-us', ['as' => 'about-us', 'uses' => 'Website\StaticPagesController@about']);
Route::get('contact-us', ['as' => 'contact-us', 'uses' => 'Website\StaticPagesController@contact']);
Route::post('contact-us/store', ['as' => 'contact-us/store', 'uses' => 'Website\StaticPagesController@emailer']);

Route::prefix('admin')->group(function () {
    // ADMIN
    Route::get('authority', ['as' => 'authority', 'uses' => 'Admin\AdminController@signin']);
    Route::get('signout', ['as' => 'signout', 'uses' => 'Admin\AdminController@signout']);
    Route::post('authority', ['as' => 'authority', 'uses' => 'Admin\AdminController@authenticate']);

    // Dashboard
    Route::get('dashboard', ['as' => 'dashboard', 'uses' => 'Admin\AdminController@dashboard'])->middleware('auth','check-permission');
    // MENU => START
    Route::get('menu', ['as' => 'menu', 'uses' => 'Menu\MenuController@index'])->middleware('auth','check-permission');
    Route::get('menu/add', ['as' => 'menu/add', 'uses' => 'Menu\MenuController@add'])->middleware('auth','check-permission');
    Route::get('menu/edit/{id}', ['as' => 'menu/edit', 'uses' => 'Menu\MenuController@edit'])->middleware('auth','check-permission');
    Route::get('menu/delete/{id}', ['as' => 'menu/delete', 'uses' => 'Menu\MenuController@delete'])->middleware('auth','check-permission');
    Route::post('menu/store', ['as' => 'menu/store', 'uses' => 'Menu\MenuController@store'])->middleware('auth','check-permission');
    // MENU => END
	// PAGES => START
    Route::get('page', ['as' => 'page', 'uses' => 'Page\PageController@index'])->middleware('auth','check-permission');
    Route::get('page/add', ['as' => 'page/add', 'uses' => 'Page\PageController@add'])->middleware('auth','check-permission');
    Route::get('page/edit/{id}', ['as' => 'page/edit', 'uses' => 'Page\PageController@edit'])->middleware('auth','check-permission');
    Route::get('page/delete/{id}', ['as' => 'page/delete', 'uses' => 'Page\PageController@delete'])->middleware('auth','check-permission');
    Route::post('page/store', ['as' => 'page/store', 'uses' => 'Page\PageController@store'])->middleware('auth','check-permission');
    // PAGES => END
    // User Management => START
    Route::get('user-management', ['as' => 'user-management', 'uses' => 'UserManagement\UserManagementController@index'])->middleware('auth','check-permission');
    Route::get('user-management/add', ['as' => 'user-management/add', 'uses' => 'UserManagement\UserManagementController@add'])->middleware('auth','check-permission');
    Route::get('user-management/edit/{id}', ['as' => 'user-management/edit', 'uses' => 'UserManagement\UserManagementController@edit'])->middleware('auth','check-permission');
    Route::get('user-management/delete/{id}', ['as' => 'user-management/edit', 'uses' => 'UserManagement\UserManagementController@delete'])->middleware('auth','check-permission');
    Route::post('user-management/store', ['as' => 'user-management/store', 'uses' => 'UserManagement\UserManagementController@store'])->middleware('auth','check-permission');
    // User Management => END
    // User Role => START
    Route::get('user-role', ['as' => 'user-role', 'uses' => 'UserRole\UserRoleController@index'])->middleware('auth','check-permission');
    Route::get('user-role/add', ['as' => 'user-role/add', 'uses' => 'UserRole\UserRoleController@add'])->middleware('auth','check-permission');
    Route::get('user-role/edit/{id}', ['as' => 'user-role/edit', 'uses' => 'UserRole\UserRoleController@edit'])->middleware('auth','check-permission');
    Route::get('user-role/delete/{id}', ['as' => 'user-role/edit', 'uses' => 'UserRole\UserRoleController@delete'])->middleware('auth','check-permission');
    Route::post('user-role/store', ['as' => 'user-role/store', 'uses' => 'UserRole\UserRoleController@store'])->middleware('auth','check-permission');
    // User Role => END
    // User Role => START
    Route::get('user-permission', ['as' => 'user-permission', 'uses' => 'UserPermission\UserPermissionController@index'])->middleware('auth','check-permission');
    Route::get('user-permission/add', ['as' => 'user-permission/add', 'uses' => 'UserPermission\UserPermissionController@add'])->middleware('auth','check-permission');
    Route::get('user-permission/edit/{id}', ['as' => 'user-permission/edit', 'uses' => 'UserPermission\UserPermissionController@edit'])->middleware('auth','check-permission');
    Route::get('user-permission/delete/{id}', ['as' => 'user-permission/edit', 'uses' => 'UserPermission\UserPermissionController@delete'])->middleware('auth','check-permission');
    Route::post('user-permission/store', ['as' => 'user-permission/store', 'uses' => 'UserPermission\UserPermissionController@store'])->middleware('auth','check-permission');
    // User Role => END


	// Posp Register => START
    Route::get('posp-register', ['as' => 'posp-register', 'uses' => 'PospRegister\PospRegisterController@index'])->middleware('auth','check-permission');
    // Route::get('posp-register/add', ['as' => 'posp-register/add', 'uses' => 'PospRegister\PospRegisterController@add'])->middleware('auth','check-permission');
    Route::get('posp-register/edit/{id}', ['as' => 'posp-register/edit', 'uses' => 'PospRegister\PospRegisterController@edit'])->middleware('auth','check-permission');
	Route::post('posp-register/store', ['as' => 'posp-register/store', 'uses' => 'PospRegister\PospRegisterController@store'])->middleware('auth','check-permission');
	Route::get('posp-register/export', ['as' => 'posp-register/export', 'uses' => 'PospRegister\PospRegisterController@export'])->middleware('auth','check-permission');
    // Route::get('posp-register/delete/{id}', ['as' => 'posp-register/edit', 'uses' => 'PospRegister\PospRegisterController@delete'])->middleware('auth','check-permission');
    // Route::get('posp-register/view/{id}', ['as' => 'posp-register/view', 'uses' => 'PospRegister\PospRegisterController@view'])->middleware('auth','check-permission');
    Route::post('register-status', ['as' => '/register-status', 'uses' => 'PospRegister\PospRegisterController@registerStatus']);
    // Posp Register => END

    // Action Logs => START
    Route::get('action-logs', ['as' => 'action-logs', 'uses' => 'ActionLog\ActionLogController@index'])->middleware('auth','check-permission');
    Route::get('action-logs/history/{controller}/{recordId?}/{productId?}', ['as' => 'action-logs/history', 'uses' => 'ActionLog\ActionLogController@history'])->middleware('auth','check-permission');
    // Action Logs => END

	Route::post('change-status', ['as' => 'change-status', 'uses' => 'Ajax\AdminCommonController@change_status'])->middleware('auth','check-permission');

	Route::get('/clear-cache', function() {
		$exitCode = Artisan::call('cache:clear');
		return "Cache is cleared";
	});
	Route::get('/clear-config', function() {
		$exitCode = Artisan::call('config:clear');
		return "Config Cache is cleared";
	});
});
