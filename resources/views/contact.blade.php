@extends('layouts.index')
@section('content')
<div class="container-wrap">
<div id="fh5co-contact">
			<div class="row animate-box">
				<div class="col-md-6 col-md-offset-3 text-center fh5co-heading">
					<h2>Contact us</h2>
					<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
				</div>
			</div>
            @if(Session::has('success'))
            
            <div class="alert alert-success alert-dismissible fade in">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            {{ Session::get('success')  }}
            </div>
            
            @endif
            
            @if ($errors->any())
            @foreach ($errors->all() as $error)
            <div class="alert alert-danger alert-dismissible fade in">
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                {{$error}}
            </div>
            @endforeach
            @endif
            
			<div class="row">
				<div class="col-md-3 col-md-push-8 animate-box">
					<h3>Our Address</h3>
					<ul class="contact-info">
						<li><i class="icon-location4"></i>198 West 21th Street, Suite 721 New York NY 10016</li>
						<li><i class="icon-phone3"></i>+ 1235 2355 98</li>
						<li><i class="icon-location3"></i><a href="#">info@yoursite.com</a></li>
						<li><i class="icon-globe2"></i><a href="#">www.yoursite.com</a></li>
					</ul>
				</div>
                <form method="POST" action="{{ route('contact_submit')  }}">
                @csrf
				<div class="col-md-7 col-md-pull-2 animate-box">
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<input type="text" name="name" class="form-control" placeholder="Name">
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<input type="text" name="email" required="" class="form-control" placeholder="Email">
							</div>
						</div>
						<div class="col-md-12">
							<div class="form-group">
								<textarea required="" 
                                name="msg" class="form-control" required="" 
                                id="" cols="30" rows="7" placeholder="Message">
                                </textarea>
							</div>
						</div>
						<div class="col-md-12">
							<div class="form-group">
								<input type="submit" value="Send Message" class="btn btn-primary btn-modify">
							</div>
						</div>
					</div>
				</div>
                </form>
			</div>
		</div>
  </div>      
@endsection