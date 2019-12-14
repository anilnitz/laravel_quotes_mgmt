@extends('layouts.home_one')
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
                </div>
                <div class="card-body">
                  <form method="POST" action="{{ route('quote_update_submit') }}" >
                  @csrf
                  <input type="hidden" name="id" value="{{ $data->id }}">
                    <div class="row">
                      <div class="col-md-9">
                        <div class="form-group">
                          <label class="bmd-label-floating">Quote Title</label>
                          <input type="text" class="form-control" name="title" value="{{ $data->title }}">
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label class="bmd-label-floating">Author Name</label>
                          <input type="text" class="form-control" name="author" value="{{ $data->author_name }}">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="bmd-label-floating">Category ( {{ $data->category }} )</label>
                          <select name="category" class="form-control" required="">
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
                            <textarea class="form-control" name="quote" rows="5" >{{ $data->quote }}</textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary pull-right">Update Quote</button>
                    <div class="clearfix"></div>
                  </form>
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


@endsection