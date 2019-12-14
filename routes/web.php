<?php

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
//------------------------------For Home Page ---------------------------------------------



Route::get('/','IndexController@index')->name('index');
Route::get('/authors','IndexController@getAuthors')->name('authors');

Route::get('/submit-contact','IndexController@getContact')->name('contact');
Route::post('/submit-contact','IndexController@submitContact')->name('contact_submit');



//----------------------------------- End Home Page Controller ------------------------


//------------------------------------ for Author Controller ---------------------

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/post-quote', 'HomeController@postQuote')->name('post_quote');
Route::post('/post-quote', 'HomeController@postQuoteSubmit')->name('quote_submit');
Route::post('/quote-update-submit', 'HomeController@postQuoteUpdate')->name('quote_update_submit');

Route::get('/quote-delete/{id}', 'HomeController@quoteDelete')->name('quotedelete');
Route::get('/quote-update/{id}', 'HomeController@quoteUpdate')->name('quoteupdate');

Route::get('/update-quote', 'HomeController@updateQuote')->name('update_quote');
Route::get('/query', 'HomeController@insertQuery')->name('query');
Route::post('/query','HomeController@sendMail')->name('sendmail');

Route::get('/profile', 'HomeController@profileQuery')->name('profile');

Route::get('ajax/getmorequotes/{count}','AjaxController@getmorequotes');
Route::post('/upload-author-photo','HomeController@uploadAuthorPhoto')->name('upload_author_photo');


Route::post('/upload-author-profile','HomeController@uploadAuthorProfile')->name('upload_author_profile');

//------------------------End Author controller -------------------------------


//---------------------------For admin controller ---------------------------

Route::post('/admin_delete/', 'AdminController@delete');
Route::post('/admin_update/', 'AdminController@update');
Route::post('/admin_get/', 'AdminController@get');
Route::get('/admin-home','AdminController@index')->name('AdminHome');
Route::get('/add-user','AdminController@addUser')->name('AddUser');
Route::get('/add-Category','AdminController@addcategory')->name('addcategory');
Route::get('/add-Category_list','AdminController@addcategory_list')->name('addcategory_list');
Route::get('/add-quotes_list','AdminController@addquotes_list')->name('addquotes_list');
Route::get('/add-author_list','AdminController@addauthor_list')->name('addauthor_list');
Route::get('/list-Author','AdminController@authorlist')->name('authorlist');
Route::get('/list-Quotes','AdminController@quoteslist')->name('quoteslist');
Route::get('/abc','AdminController@abc')->name('abc');
Route::get('/query-reply','AdminController@queryReply')->name('QueryReply');

Route::post('/post-Category', 'AdminController@postCategorySubmit')->name('Category_submit');
Route::post('/post-Quotes', 'AdminController@postQuotesSubmit')->name('Quotes_submit');


//--------------------------------End admin controller ------------------------


//Only For Test to Get Data from Database

Route::get('/generateCache','IndexController@createCache');
Route::get('/fetchCache','IndexController@fetchCache');


