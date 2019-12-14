@extends('layouts.home')
@section('content')
<div class="content">
        <div class="container-fluid">         
          <div class="row">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h3 class="card-title text-center"><b>Profile</b></h3>
                  <p class="card-category text-center">Please ask your query.</p>
                </div>
                <div class="card-body">                   
                  <form method="POST" action="{{ route('upload_author_profile') }}" enctype="multipart/form-data">
                  @csrf
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="bmd-label-floating">Enter Name</label>
                          <input type="text" class="form-control" name="name" value="{{ Auth::user()->name }}" required="">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="bmd-label-floating">Contact</label>
                          <input type="text" class="form-control" maxlength="10" required="" name="phone" value="{{ Auth::user()->phone }}">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="bmd-label-floating">Email:</label>
                          <input type="text" class="form-control" maxlength="10" value="{{ Auth::user()->email }}" name="email">
                        </div>
                      </div>
                    </div>
                     <div class="row">
                      <div class="col-md-12">
                      	<br>
                      	<label class="bmd-label-floating">Date Of Birth:</label>
                        <div class="form-group">
                          
                          <input type="date" class="form-control" maxlength="10" required="" name="dob" value="{{ Auth::user()->dob }}">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Write About Self: </label>
                          <div class="form-group">
                            <textarea class="form-control" name="about" rows="5"  placeholder="Write something here About Self...">{{ Auth::user()->about }}</textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                      	<br>
                      	<label class="bmd-label-floating">Select Profile Pic:</label>
                        <div class="form-group">
                          
                          <input type="file" name="file" class="form-control"  />
                        </div>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary pull-right">Submit</button>
                    <div class="clearfix"></div>
                  </form>
                  @if(Session::has('success'))
                        <div class="col-md-12">
                          <div class="card">
                          <div class="card-body">
                          {{ Session::get('success')  }}
                          </div>
                          </div>
                    @endif
                </div>
              </div>
            </div>
           <div class="col-md-4">
              <div class="card card-profile">
                <div class="card-avatar">
                  <a href="#pablo">
                    <img class="img" src="../{{ Auth::user()->photo }}" />
                  </a>
                </div>
                <div class="card-body">
                  <h6 class="card-category text-gray">Author</h6>
                  <h4 class="card-title">{{ Auth::user()->name }}</h4>
                  <p class="card-description">
                    Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
                  </p>
                  <a href="#pablo" class="btn btn-primary btn-round">Follow</a>
                </div>
              </div>
            </div>
          </div>


          
        </div>
      </div>

     @endsection('content')