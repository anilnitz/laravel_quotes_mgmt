<?php

namespace App\Http\Controllers;
//--------------------this package only use for direct access the database
use Illuminate\Support\Facades\DB;
//---------------------------end-----------------------------------
use Auth;
use Illuminate\Http\Request;
use App\Quote;
use App\Quote_category;
use App\User;
use App\Events\QueryEvent;
use App\Query;
class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
     public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('CheckUserTypeReverse');
    }
     
     function message($type, $msg, $data = null) {
        $this->data['type'] = $type;
        $this->data['message'] = $msg;
        $this->data['data'] = $data;
        header('Content-Type: application/json');
        echo json_encode($this->data);
    }
    function retrieve() 
    {
        $res=DB::table('$request->table')->where('id', '=',$request->id);

        /*$res = $this->FrontdeskModel->retrieveRecord($table, $condCol, $id);*/
        if (!$res) {
            $this->message('error', '','');
        } else {
            $this->message('success', '', $res);
        }
    }

    function delete(Request $request) 
    {
        /*$tablessss=$reqest->table;*/


        /*$abc=$request->id;*/
        $res = DB::delete("DELETE FROM `$request->table` WHERE `id` = '$request->id'");

       /* $deleteQuote=quote_category::find($request->id);
        $res=$deleteQuote->delete();*/




        // $deleteQuote = Quote::find($request['id']);
        // $res = $quote_categories->delete();
        /*$res = $this->Event_model->deleteRecord($table, $condCol, $id);*/
        if (!$res) 
        {
            $this->message('error', "Not Deleted" ,$res);
        } 
        else 
        {
            $this->message('success', "Deleted Successfully", $res);
        }
    }
    function update(Request $request) 
    {
        $res = DB::update("UPDATE `$request->table` set `deleted`= 'N' WHERE `id` = '$request->id'");
        /*print_r($res);
        die;
*/         if (!$res) 
        {
            $this->message('error', "Not Updated" ,$res);
        } 
        else 
        {
            $this->message('success', "Updated Successfully", $res);
        }
    }
    function get(Request $request) 
    {
        $res=DB::table('$request->table')->where('id', '=',$request->id);
        /*print_r($res);
        die;
*/      if (!$res) {
            $this->message('error', '','');
        } else {
            $this->message('success', '', $res);
        }
    }
     public function index()
     {
        $AuthQuotesCount=Quote::all()->count();
        $CategoryCount=Quote_category::all()->count();
        $TotalAuthors=User::all()->count();
        return View('Admin/home',['AuthQuotesCount' => $AuthQuotesCount, 'TotalAuthors' => $TotalAuthors,'CategoryCount'=>$CategoryCount,]);
     }
     public function addUser()
     {
        return "Add User";
     }
     public function addcategory()
     {
        $cat_list = DB::table('quote_categories')->select('quote_categories.*','users.name','users.photo')
            ->leftJoin('users', 'quote_categories.user_id', '=', 'users.id')
            ->get();

        return view('Admin/Category',compact('cat_list'));
     }
     public function authorlist()
     {
        return view('Admin/author');
     }
     public function quoteslist()
     {
        return view('Admin/quotes');
     }
     public function QueryReply()
     {
        return "Query Reply";
     }
     public function postCategorySubmit(Request $request)
    {
        /*dd($request->all());
        die;*/
      Quote_category::create([ 'category' =>$request['cat'], 'description' =>$request['des'], 'dates' =>$request['dates'],'user_id' =>Auth::user()->id , 
      ]);
      return redirect()->route('addcategory')->with( ['success' => 'Category Submitted Successfully.', ] );       
    }
    public function postQuotesSubmit(Request $request)
    {
        /*dd($request->all());
        die;*/
      Quote::create(['title' =>$request['titles'],'category' =>$request['category'],'author_name' =>$request['authors'], 'quote' =>$request['quotes'],'user_id' =>Auth::user()->id , 
      ]);
      return redirect()->route('quoteslist')->with( ['success' => 'Quotes Submitted Successfully.', ] );       
    }
    public function addcategory_list()
    {
        $cat_list = DB::table('quote_categories')->select('quote_categories.*','users.name','users.photo')
            ->leftJoin('users', 'quote_categories.user_id', '=', 'users.id')
            ->get();
     $i = 1;
        foreach ($cat_list as $key => &$value) {
            $value->sr_no = $i;
            $value->action = "<a cat_id='" . $value->id . "' class='pr-2 pointer view-cat' data-toggle='modal' data-target='#view-cat'><i class='fa fa-reorder'></i></a>"
                    . "<a cat_id='" . $value->id . "' class='pr-2 pointer edit-cat' data-toggle='modal' data-target='#edit-cat'><i class='fa fa-edit'></i></a>"
                    . "<a cat_id='" . $value->id . "' class='pointer delete_cat'><i class='fa fa-trash text-danger'></i></a>";
            $i++;
        }
        $this->message('success', '', $cat_list);

    }
    public function addquotes_list()
    {
        $quotes_listss = DB::table('quotes')->select('quotes.*','users.name')
            ->leftJoin('users', 'quotes.user_id', '=', 'users.id')
            ->get();
            /*print_r($quotes_listss);
     die;*/
     $i = 1;
     
        foreach ($quotes_listss as $key => &$value) {
            $value->sr_no = $i;
            $value->action = "<a quotes_id='" . $value->id . "' class='pr-2 pointer view-quotes' data-toggle='modal' data-target='#view-quotes'><i class='fa fa-reorder'></i></a>"
                    . "<a quotes_id='" . $value->id . "' class='pr-2 pointer edit-quotes' data-toggle='modal' data-target='#edit-quotes'><i class='fa fa-edit'></i></a>"
                    . "<a quotes_id='" . $value->id . "' class='pointer delete_quotes'><i class='fa fa-trash text-danger'></i></a>";
            $i++;
        }
        $this->message('success', '',$quotes_listss);

    }

    public function addauthor_list()
    {
        $author_listss = DB::table('users')->select('users.*')
            ->get();
            /*print_r($author_listss);
            die;*/
            /*print_r($quotes_listss);
     die;*/
     $i = 1;
     
        foreach ($author_listss as $key => &$value) {
            $value->sr_no = $i;
            $value->action = "<a author_id='" . $value->id . "' class='pr-2 pointer view-author' data-toggle='modal' data-target='#view-author'><i class='fa fa-reorder'></i></a>"
                    . "<a author_id='" . $value->id . "' class='pr-2 pointer edit-author' data-toggle='modal' data-target='#edit-author'><i class='fa fa-edit'></i></a>"
                    . "<a author_id='" . $value->id . "' class='pointer delete_author'><i class='fa fa-trash text-danger'></i></a>";
            $i++;
        }
        $this->message('success', '',$author_listss);

    }



    public function abc()
    {
        $arr['result']="ok";
        $arr['msg']="data found";
        $arr['type']="true";
        $users = DB::table('quotes')->select('quotes.*','users.name','users.photo')
            ->leftJoin('users', 'quotes.user_id', '=', 'users.id')
            ->get();
           /* DB::table('users')->select('users.name');*/
       /* $users = DB::table('quotes')->get();*/
       /*return $users;
       die;*/
       if(empty($users))
       {
        $arr['result']="not ok";
        $arr['msg']="data not found";
        $arr['type']="false";
        return $arr;
       }
        foreach($users as $key=>&$xyz)
        {
            $arr[]=$xyz;
            /*print_r($xyz);*/

        }

        return $arr;
        
        

    }
}    