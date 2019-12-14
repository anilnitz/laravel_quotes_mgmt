<?php
namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Quote;
use App\User;
use App\Events\QueryEvent;
use App\Query;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('CheckUserType');
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function sendMail(Request $request)
    {
      Query::create([
     'subject' =>$request['title'], 'contact' => $request['contact'],'query' =>$request['query'] , 'user_id' => Auth::user()->id,
     ]);
     
     Session(['subject' => $request['title'], 'contact' => $request['contact'], 'query' => $request['query'],
     'name'  => Auth::user()->name,
      ]);
     
     event( new QueryEvent() ); 
     return redirect()->route('query')->with( ['success' => 'Your query is submitted successfully. Our executive will contact you soon.', ] );
      
    }
    public function index()
    {
        $AuthQuotesCount=Quote::where('user_id',Auth::user()->id)->count();
        $TotalAuthors=User::all()->count();
        return view('author_home',['AuthQuotesCount' => $AuthQuotesCount, 'TotalAuthors' => $TotalAuthors]);
    }
   
    public function postQuote()
    {
        return view('post_quote');
    }
    
    public function updateQuote()
    {
        //$AuthQuotes=Quote::where('user_id',Auth::user()->id)->orderBy('id','DESC')->get();
        $AuthQuotes=Auth::user()->quotes;
        return view('update_quote',['quotes' => $AuthQuotes,  ]);
    }
    public function insertQuery()
    {
        return view('query');
    }
    public function profileQuery()
    {
      return view('profile');
    }
    public function postQuoteSubmit(Request $request)
    {
      Quote::create([ 'title' =>$request['title'], 'category' =>$request['category'], 'author_name' =>$request['author'], 
      'quote' =>$request['quote'], 'user_id' =>Auth::user()->id , 
      ]);  
      return redirect()->route('post_quote')->with( ['success' => 'Quote Submitted Successfully.', ] );       
    }
    public function quoteDelete($id)
    {
        $deleteQuote=Quote::find($id);
        $deleteQuote->delete();
        return redirect()->route('update_quote')->with( ['success' => 'Quote Deleted Successfully.', ] );
    }
    public function quoteUpdate($id)
    {
        return View('quote_update',['data' =>Quote::find($id)->first(), ]);
    }
    public function postQuoteUpdate(Request $request)
    {
      $data=Quote::find($request['id']);
      $data->title=$request['title'];$data->category=$request['category'];$data->author_name=$request['author'];
      $data->quote=$request['quote'];
      $data->save();
      return redirect()->route('update_quote')->with( ['success' => 'Quote Updated Successfully.', ] );  
    }
    public function uploadAuthorPhoto(Request $request)
    {
        $request->validate([
            'file' => 'max:500',
                           ]);                  
        $image=$request->file('file');
        $input['imagename']=time().'.'.$image->getClientOriginalExtension();
        $destinationPath = public_path('images/authors/');
        $photoPath="images/authors/".$input['imagename'];
        $image->move($destinationPath,$input['imagename']);
        $getUserRow=User::find(Auth::user()->id);
        $getUserRow->photo=$photoPath;
        $getUserRow->save();
        return redirect()->route('post_quote');  
    }
    public function uploadAuthorProfile(Request $request)
    {

      if(!empty($request['file']))
      {
        $request->validate([
            'file' => 'max:500',
                           ]);                  
        $image=$request->file('file');
        $input['imagename']=time().'.'.$image->getClientOriginalExtension();
        $destinationPath = public_path('images/authors/');
        $photoPath="images/authors/".$input['imagename'];
        $image->move($destinationPath,$input['imagename']);
        $getUserRow=User::find(Auth::user()->id);
        $getUserRow->name=$request['name'];
        $getUserRow->phone=$request['phone'];
        $getUserRow->dob=$request['dob'];
        $getUserRow->about=$request['about'];
        $getUserRow->email=$request['email'];
        $getUserRow->photo=$photoPath;
        $getUserRow->save();
        return redirect()->route('profile');
      }
      else{
         $getUserRow=User::find(Auth::user()->id);
        $getUserRow->name=$request['name'];
        $getUserRow->phone=$request['phone'];
        $getUserRow->dob=$request['dob'];
        $getUserRow->about=$request['about'];
        $getUserRow->email=$request['email'];
        $getUserRow->save();
        return redirect()->route('profile');  
      }
       
    }
}
