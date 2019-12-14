@extends('layouts.home')
@section('content')
<div class="content">
        <div class="container-fluid">
        <div class="row">
        @if(Session::has('success'))
            <div class="col-md-12">
              <div class="card">
              <div class="card-body">
              {{ Session::get('success')  }}
              </div>
              </div>
        @endif
         </div> 
          <div class="row">
            <div class="col-md-8">
              <div class="card">
              
                <div class="card-header card-header-primary">
                  <h4 class="card-title">Post Quote</h4>
                  <p class="card-category">What is in your mind?</p>
                   @if ($errors->any())
                        @foreach ($errors->all() as $error)
                        {{$error}}
                        @endforeach
                        @endif
                </div>
                <div class="card-body">
                  <form method="POST" action="{{ route('quote_submit') }}" >
                  @csrf
                    <div class="row">
                      <div class="col-md-9">
                        <div class="form-group">
                          <label class="bmd-label-floating">Quote Title</label>
                          <input type="text" class="form-control" name="title">
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label class="bmd-label-floating">Author Name</label>
                          <input type="text" class="form-control" name="author">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="bmd-label-floating">Category</label>
                          <select name="category" class="form-control">
                          <option value="">Select</option><option value="Life">Life</option>
                          <option value="Love">Love</option><option value="Education">Education</option>
                          <option value="Career">Career</option><option value="Other">Other</option>
                          
                          </select>
                        </div>
                      </div>
                     
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Write Your Quote</label>
                          <div class="form-group">
                            <label class="bmd-label-floating">Quote</label>
                            <textarea class="form-control" name="quote" rows="5"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary pull-right">Post Quote</button>
                    <div class="clearfix"></div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-profile">
                <div class="card-avatar">
                  <a href="#pablo">
                    <img class="img" src="{{ Auth::user()->photo }}" />
                  </a>
                </div>
                <div class="card-body">
                  <h6 class="card-category text-gray">Author</h6>
                  <h4 class="card-title">{{ Auth::user()->name }}</h4>
                  <p class="card-description">
                    Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
                  </p>
                  <div class="row">
                      <div class="col-md-12">
                      
                  <form method="post" action="{{ route('upload_author_photo') }}" enctype="multipart/form-data">
                        @csrf
                                  <div class="form-group">
                                    <input type="file" name="file" class="form-control" required=""   />
                                  </div>
                                  <button type="submit" class="btn btn-primary pull-right">Upload</button>
                  </form>   
                        </div>
                   </div>          
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>


@endsection