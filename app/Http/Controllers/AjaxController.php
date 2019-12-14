<?php
namespace App\Http\Controllers;
use Auth;
use Illuminate\Http\Request;
use App\Quote;
use App\User;
use App\Events\QueryEvent;
use App\Query;
class AjaxController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
  public function getmorequotes()
  {
    $newvalue=$_GET['count']+3;
    $html="";
    $data=Quote::All()->take($newvalue);
    $i=1;
    foreach($data as $getData){
      if($i%3==0)  
      {
        $html.="<div class='row'>";
      }
      $html.="<div class='col-md-4'><div class='events-entry'><span class='date'>".$getData->created_at."</span><h5>
      ".$getData->quote."<p>".$getData->user->name."</p><p>Reference:- ".$getData->author_name."</p><a href='#'>Comment<i class='icon-arrow-right3'></i></a></div>
        </div>";
      
      if($i%3==0)  
      {
        $html.="</div>";
      }
      $i++;
                              }
      $html.="<input type='hidden' name='count' id='count' value='".$newvalue."'/>";                     
    return Response($html);
  }
   
}    