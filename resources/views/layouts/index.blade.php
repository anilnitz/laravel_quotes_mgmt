<!doctype html>
<html >
    <head>
@include('partials.header')        
    </head> 
    
    <body>		
	<div class="fh5co-loader"></div>
	<div id="page">
        
@include('partials.nav')     

@yield('content')

@include('partials.footer')   
 
	</body>
</html>   