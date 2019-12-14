<?php

namespace App\Http\Middleware;

use Closure;
use Log;
class apicheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->api != "bjasbdjbjasd5656565")
        {
            $msg="--------------------------".$_SERVER['REMOTE_ADDR']." Tried with Wrong API --------------------------";
            Log::info($msg);
            return redirect('/');
        }
        
        return $next($request);
    }
}
