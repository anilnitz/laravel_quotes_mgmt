<?php
namespace App\Listeners;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Mail;
class EmailToAdmin
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        //
        
      $data = array( 'name' =>Session('name') , 'subject'=>Session('subject'), 'contact' => Session('contact'), 'query' => Session('query'));
      Mail::send('mail', $data, function($message) {    
         $message->to('muhdsaad07@gmail.com', 'New Query')->subject
            ('Latest Query From Motivate Yourself');
         $message->from('abhinavsbbgi@gmail.com','Abhinav Bhatnagar');
      });
        
        
    }
}
