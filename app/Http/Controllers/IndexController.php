<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Contact;
use App\Quote;
use Mail;
use App\Query;
use Illuminate\Support\Facades\Cache;
use App\User;
class IndexController extends Controller
{
    //
    public function createCache()
    {
        Cache::forever('categories', Contact::all());
        if (Cache::has('categories')) 
        {
                //
                echo"Cache Created Successfully";
        }
    }
    public function fetchCache()
    {
        return Cache('categories');
    }

    public function getQueries()
    {
        return cache('query');
    }
   
    public function index()
    {
        $data=Quote::All()->take(3);$users=User::All();
        return view('index',[ 'passdata' => $data, 'users' => $users  ]);
    }
     public function getAuthors()
    {
        return view('authors');
    }
    public function getContact()
    {
        return view('contact');
    }
    public function submitContact(Request $request)
    {
        $request->validate([
            'name' => 'bail|required|max:255',
        ]);        
                
        Contact::create( [ 'uname' => $request['name'],
        'email' => $request['email'], 'msg' => $request['msg'], ] ); 
                
        return redirect()->route('contact')->with( ['success' => 'Data Submitted Successfully. We will contact you soon.', ] );
        
    }
    
}
//$quote = Quote::All()->take(10)->shuffle();