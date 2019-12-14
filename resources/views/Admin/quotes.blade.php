@extends('Admin.layouts.home')
@section('content')
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Quotes
        <small>Preview</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Quotes</a></li>
        <li class="active">Add Quotes</li>
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
              <h3 class="box-title">Add Quotes</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form action="{{ route('Quotes_submit') }}" method="post">
            	@csrf
              <div class="box-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">Quotes Title :</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Category Name" name="titles">
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Quotes Author</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Category Name" name="authors">
                </div>
                 <div class="form-group">
                  <label for="exampleInputEmail1">Category Select</label>
                  <select name="category" class="form-control">
                          <option value="">Select</option><option value="Life">Life</option>
                          <option value="Love">Love</option><option value="Education">Education</option>
                          <option value="Career">Career</option><option value="Other">Other</option>
                          
                          </select>
                </div>
                <div class="form-group">     
                  <label>Quotes :</label>
                  <textarea class="form-control" name="quotes" rows="3" placeholder="Enter here Quotes ..."></textarea>
                
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
              <h3 class="box-title">Quotes List</h3>
            </div>
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped text-center select_quotes_list">
                <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Category Name</th>
                  <th>Quotes Title</th>
                  <th>Author Publish</th>
                  <th>Creation Date</th>
                  <th>Action</th>                 
                </tr>
                </thead>
                <!-- <tbody>
                <tr>
                  <td>Trident</td>
                  <td>Internet
                    Explorer 4.0
                  </td>
                  <td>Win 95+</td>
                  <td> 4</td>                  
                </tr>
                <tr>
                  <td>Trident</td>
                  <td>Internet
                    Explorer 5.0
                  </td>
                  <td>Win 95+</td>
                  <td>5</td>                 
                </tr>
                <tr>
                  <td>Trident</td>
                  <td>Internet
                    Explorer 5.5
                  </td>
                  <td>Win 95+</td>
                 <td>5.5</td>                  
                </tr>
                </tbody> -->
                <!-- <tfoot>
                <tr>
                   <th>Sl No.</th>
                  <th>Category Name</th>
                  <th>Quotes Title</th>
                  <th>Creation Date</th>
                  <th>Action</th>
                </tr>
                </tfoot> -->
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