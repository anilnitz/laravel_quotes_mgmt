<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
class CheckUserTypeReverse
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
        if(Auth::user()->type == "Author")
        {
            return redirect()->route('home');
        }
        
        return $next($request);
    }
}
