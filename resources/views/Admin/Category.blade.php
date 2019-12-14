@extends('Admin.layouts.home')
@section('content')
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Category
        <small>Preview</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Category</a></li>
        <li class="active">Add Category</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <!-- left column -->
        <div class="col-md-4">
          <!-- general form elements -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">Quotes Category</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form action="{{ route('Category_submit') }}" method="post">
            	@csrf
              <div class="box-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">Category Name</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Category Name" name="cat">
                </div>
                <div class="form-group">
                 
                  <label>Description :</label>
                  <textarea class="form-control" name="des" rows="3" placeholder="Enter ..."></textarea>
                
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Date :</label>
                  <input type="date" name="dates" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>        
              </div>
              <!-- /.box-body -->

              <div class="box-footer">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-8">
          <div class="box box-warning">
            <div class="box-header">
              <h3 class="box-title">Quotes Category List</h3>
            </div>
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped text-center select_eventsss_listssst">
                <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Category Name</th>
                  <th>Created By</th>
                  <th>Creation Date</th>
                  <th>Action</th>                 
                </tr>
                </thead>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!--/.col (right) -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
@endsection