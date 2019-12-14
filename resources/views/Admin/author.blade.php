@extends('Admin.layouts.home')
@section('content')
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Author
        <small>Preview</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Author</a></li>
        <li class="active">Author List</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <!-- left column -->
        <!-- <div class="col-md-4">
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">Quotes Category</h3>
            </div>
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
              <div class="box-footer">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div> -->
        <div class="col-md-12">
          <div class="box box-warning">
            <div class="box-header text-center">
              <h2 class="box-title"><b>Author List</b></h2>
            </div>
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped text-center select_author_list">
                <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Creation Date</th>
                  <th>Action</th>                 
                </tr>
                </thead>
                <!-- <tbody>
                <tr>
                  <td>1</td>
                  <td>Internet Explorer 4.0</td>
                  <td>Win 95+</td>
                  <td>4</td>                  
                </tr>
              </tbody> -->
                <!-- <tfoot>
                <tr>
                   <th>Sl No.</th>
                  <th>Category Name</th>
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
 <div class="modal fade" id="view-author">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Default Modal</h4>
              </div>
              <div class="modal-body">
                <table class="table table-striped bordergray col-lg-12">       
                    <tbody>
                        <tr class="row m-0 p-0">
                            <th class="col-lg-2">Name :</th>
                            <td class="col-lg-4" id="holiday_titles"></td>
                            <th class="col-lg-2">Type :</th>
                            <td class="col-lg-4" id="holiday_froms_dates"></td>
                        </tr>
                    </tbody>
                </table>
                <table class="table table-striped bordergray col-lg-12">    
                    <tbody>
                        <tr class="row m-0 p-0">
                            <th class="col-lg-2">Email :</th> 
                            <td class="col-lg-4" id="holiday_to_dates"></td>
                            <th class="col-lg-2">About :</th>
                            <td class="col-lg-4" id="holiday_description"></td>
                        </tr>
                    </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
<div class="modal fade" id="edit-author">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Default Modal</h4>
              </div>
              <div class="modal-body">
                <form id="update_holiday" class="smooth-submit" method="post" action="#">
                <div class="row p-3">
                    <div class="col-xs-4 mail_view_info">
                        <div class="form-group">
                            <label for="pwd">Holiday Category :</label><small class="req"> *</small>
                            <select id="holidays_cats_id" name="cat_id" class="form-control usernamer"> 
                              <option value="">Select</option>  
                                 
                            </select>
                        </div>
                    </div>  
                    <div class="col-xs-4 mail_view_info">
                        <div class="form-group">
                            <label for="pwd">Title</label><small class="req"> *</small>
                            <input id="holidays_ids" type="hidden" class="form-control usernamer" value="" name="id">
                            <input id="holidays_titles" type="text" class="form-control usernamer" value="" name="title" required="true">
                        </div>
                    </div>
                    <div class="col-xs-4 mail_view_info">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="pwd">Date From</label>
                                <input id="holidays_froms" type="text" class="form-control usernamer datepicker"  data-format="yyyy-mm-dd" placeholder="DD/MM/YYYY" name="from_date" readonly="">
                                <span class="text-danger"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 mail_view_info">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="pwd">To Date</label>
                                <input id="holidays_tos" type="text" class="form-control usernamer datepicker"  data-format="yyyy-mm-dd" placeholder="DD/MM/YYYY" name="to_date" readonly="">
                                <span class="text-danger"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6 mail_view_info">
                        <div class="form-group">
                            <label for="pwd">Description</label>
                            <textarea id="holidays_descs" class="form-control usernamer" id="description" name="description" rows="3"></textarea>
                            <span class="text-danger"></span>
                        </div>
                    </div>
                    <div class="modal-footer col-lg-12">
                        
                       
                    </div>
                    <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
                </div> 
        </div>
        </form>
              </div>
              <!-- <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div> -->
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>


@endsection