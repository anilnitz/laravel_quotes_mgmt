@extends('layouts.home')
@section('content')
<div class="content">
        <div class="container-fluid">
          
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Quotes</h4>
                  <p class="card-category">You can update or delete</p>
                </div>
                <div class="card-body">
                <div class="row">
                @if(Session::has('success'))
                    <div class="col-md-12">
                      <div class="card">
                      <div class="card-body">
                      {{ Session::get('success')  }}
                      </div>
                      </div>
                @endif
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th>
                          Srno
                        </th>
                        <th>
                          Title
                        </th>
                        <th>
                          Category
                        </th>
                        <th>
                          Author
                        </th>
                        <th>
                          Quote
                        </th>
                        <th>
                          Created At
                        </th>
                        <th>
                          Update
                        </th>
                        <th>
                          Delete
                        </th>
                      </thead>
                      <tbody>
                      <?php   $i=1;  ?>
                      @foreach($quotes as $getQuotes)
                        <tr>
                          <td>
                            {{ $i }}
                          </td>
                          <td>
                            {{ $getQuotes->title }}
                          </td>
                          <td>
                            {{ $getQuotes->category }}
                          </td>
                          <td>
                            {{ $getQuotes->author_name }}
                          </td>
                          <td >
                            {{ $getQuotes->quote }}
                          </td>
                          <td>{{ $getQuotes->created_at }}</td>
                          <td><a href="{{ route('quoteupdate', ['id' => $getQuotes->id ]) }}">Click </a></td>
                          <td><a href="{{ route('quotedelete', ['id' => $getQuotes->id ]) }}">Click </a></td>
                        </tr>
                      <?php  $i++;   ?>  
                      @endforeach  
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>


@endsection