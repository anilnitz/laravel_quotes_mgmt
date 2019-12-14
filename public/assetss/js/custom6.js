var base_url = $("base").attr('href');
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
$('.bs-component [data-toggle="popover"]').popover();
$('.bs-component [data-toggle="tooltip"]').tooltip();
// Gallery Start
$("#AddGalleryCat").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message);
    if (data.type === 'success') {
        $(this).trigger('reset');
        location.reload();
    }
});
$("#uploaded_images").on('click', '.img_id', function () {
    var id = $(this).attr('img_id');
    var url = $(this).attr('img_url');
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url: base_url + 'Gallery_master/delete/gallery_items/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id,
                    url: url
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        $('#items_' + id).hide();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }

                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});
// Gallery End


//Category Gallery

$("#uploaded_category").on('click', '.cat_id', function () {
    var id = $(this).attr('cat_id');
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url: base_url + 'Gallery_master/delete/gallery/s_no/' + id,
                type: 'post',
                dataType: 'json',
                data: {id: id},
                success: function (data) {
                    $('.lg-close').trigger('click');
                    if (data.type === "success")
                    {
                        $('#cat' + id).hide();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }

                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});
// End Category Gallery

// Front Desk Start......................................................................................................................................
// Admission_enquary Start 
var adenquiryTable = $('.adenquiryTables').DataTable({
    serverSide: false,
    ajax: base_url + 'front_desk/Addmission_enq_list',
    "columns": [
        {"data": "sr_no"},
        {"data": "name"},
        {"data": "phone"},
        {"data": "sourceName"},
        {"data": "dates"},
        {"data": "last_dates"},
        {"data": "next_dates"},
        {"data": "status"},
        {"data": "type"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
     buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});

$(".sub-menu").on('click','#on_dept', function(){
    $('#comps').addClass('menueActives');
});

$("#myModal").on('hidden.bs.modal', function(){
    $('#comps').removeClass('menueActives');
});

$("#addenq").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        adenquiryTable.ajax.url(base_url + "Front_desk/Addmission_enq_list").load();
        $(this).trigger('reset');
        $("#add-new-addenq").modal('hide');
    }
});

$("#updateenq").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        adenquiryTable.ajax.url(base_url + "Front_desk/Addmission_enq_list").load();
        $(this).trigger('reset');
        $("#edit-addenq").modal('hide');
    }
});

$("#enquirySearch").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    if (data.type === 'success') {
        adenquiryTable.ajax.url(base_url + "Front_desk/Addmission_enq_list?senquiry_date=" + $("#senquiry_date").val() + "&eenquiry_date=" + $("#eenquiry_date").val() + "&source=" + $("#sourcea").val() + "&status=" + $("#statusa").val()).load();
        console.log(a)
    }
});

$(".adenquiryTables").on('click', '.edit-addenqCall', function () {
    var id = $(this).attr('addenq_id');
    console.log(id)
    $.ajax({
        url: base_url + 'Front_desk/addmision_enq_frontdesk_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#aefr_id").val(permission.id);
            $("#create_by").html(permission.staffName);
            $("#select_status").val(permission.status);
            $("#enq_date").html(permission.dates);
            $("#last_enq_date").html(permission.last_dates);
            $("#next_enq_date").html(permission.next_dates);
            $("#enq_phone").html(permission.phone);
            $("#enq_address").html(permission.address);
            $("#enq_ref").html(permission.ref);
            $("#enq_desc").html(permission.des);
            $("#enq_note").html(permission.note);
            $("#enq_source").html(permission.source);
            $("#enq_assigned").html(permission.assigned);
            $("#enq_email").html(permission.email);
            $("#enq_class").html(permission.className + permission.sectionName);
            $("#enq_child").html(permission.no_child);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$(".adenquiryTables").on('click', '.edit-addenq', function () {
    var id = $(this).attr('addenq_id');
    $.ajax({
        url: base_url + 'Front_desk/addmision_enq_frontdesk_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            console.log(data);
            $("#aenq_id").val(permission.id);
            $("#aenq_name_add").val(permission.name);
            $("#aenq_enquiry_date").val(permission.dates);
            $("#aenq_enquiry_dates").val(permission.next_dates);
            $("#aenq_number").val(permission.phone);
            $("#aenq_address").val(permission.address);
            $("#aenq_ref").val(permission.ref);
            $("#aenq_desc").val(permission.des);
            $("#aenq_note").val(permission.note);
            $("#aenq_source").val(permission.source);
            $("#aenq_assign").val(permission.assigned);
            $("#aenq_email").val(permission.email);
            $("#aenq_class").val(permission.classid);
            $("#aenq_child").val(permission.no_child);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$(".adenquiryTables").on('click', '.delete_addenq', function () {
    var id = $(this).attr('addenq_id');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url: base_url + 'Front_desk/delete/addmision_enq_frontdesk/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        adenquiryTable.ajax.url(base_url + "Front_desk/Addmission_enq_list").load();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});

$(".adenquiryTables").on('click', '.edit-addenqCall', function () {
    var id = $(this).attr('addenq_id');
    $(".timeline").html('');
    $.ajax({
        url: base_url + 'Front_desk/Addmission_enq_list_follow',
        type: 'post',
        dataType: 'json',
        data: {
            id: id
        },
        success: function (datas) {
            var datas = datas.data;
            $.each(datas, function (index, data) {
                $(".timeline").append(data['action']);
            });
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

function abc(id) {
    $.ajax({
        url: base_url + 'Front_desk/Addmission_enq_list_follows',
        type: 'post',
        dataType: 'json',
        data: {
            id: id
        },
        success: function (datas) {
            var datas = datas.data;
            $.each(datas, function (index, data) {
                $(".timeline").append(data['action']);
            });
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
}

$("#addenqfollow").on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    $.ajax({
        url: base_url + 'Front_desk/add_enquiry_call',
        type: 'post',
        dataType: 'json',
        data: form.serialize(),
        success: function (data) {
            $(".timeline").html('');
            toastr[data.type](data.message)
            var id = data.data;
            if (data.type === 'success') {
                $('#addenqfollow').trigger('reset');
                abc(id);
            }
            adenquiryTable.ajax.url(base_url + "Front_desk/Addmission_enq_list").load();
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});
$("#edit-addenqCall").on('change', '#select_status', function (e) {
    var status = $(this).val();
    var id = $('#aefr_id').val();
    $.ajax({
        url: base_url + 'Front_desk/update_status_enquiry_call',
        type: 'post',
        dataType: 'json',
        data: {
            id: id,
            status: status
        },
        beforeSend: function () {
            $('#pleasewait').modal('show');
        },
        success: function (data) {
            $('#pleasewait').modal('hide');
            toastr[data.type](data.message)
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});
$(".timeline").on('click', '.delete_addenq_vont', function () {
    var id = $(this).attr('addenq_id');
    var ids = $(this).attr('addenq_ids');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url: base_url + 'Front_desk/delete/admission_enq_followup/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    $(".timeline").html('');
                    if (data.type === "success")
                    {
                        toastr[data.type](data.message);
                        abc(ids);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});
// Admission_enquary End 

// Visitor Add Start

var visiterLists = $('.visiterList').DataTable({
    serverSide: false,
    ajax: base_url + 'front_desk/visiter_list',
    "columns": [
        {"data": "sr_no"},
        {"data": "purposeName"},
        {"data": "name"},
        {"data": "contact"},
        {"data": "dates"},
        {"data": "in_time"},
        {"data": "out_time"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});

$("#addVisitor").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        visiterLists.ajax.url(base_url + "Front_desk/visiter_list").load();
        $(this).trigger('reset');
    }
});

$(".visiterList").on('click', '.view-visior', function () {
    var id = $(this).attr('visior_id');
    $.ajax({
        url: base_url + 'Front_desk/addmision_visitor_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#visior_purpose").html(permission.purposeName);
            $("#visior_name").html(permission.name);
            $("#visior_phone").html(permission.contact);
            $("#visior_person").html(permission.pepples);
            $("#visior_date").html(permission.dates);
            $("#visior_itime").html(permission.in_time);
            $("#visior_otime").html(permission.out_time);
            $("#visior_note").html(permission.note);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$(".visiterList").on('click', '.edit-visior', function () {
    var id = $(this).attr('visior_id');
    $.ajax({
        url: base_url + 'Front_desk/addmision_visitor_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#visitor_id").val(permission.id);
            $("#visitor_purpose").val(permission.purpose);
            $("#visitor_name").val(permission.name);
            $("#visitor_contact").val(permission.contact);
            $("#visitor_idp").val(permission.id_proof);
            $("#visitor_person").val(permission.pepples);
            $("#visitor_date").val(permission.dates);
            $("#visitor_time").val(permission.in_time);
            $("#visitor_timeo").val(permission.out_time);
            $("#visitor_note").val(permission.note);
            $("#visitor_upload").html(permission.doc_url);
            $("#visitor_uploads").val(permission.doc_url);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$("#update_visitor").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        $('#edit-visior').modal('hide');
        visiterLists.ajax.url(base_url + "Front_desk/visiter_list").load();

    }
});


$(".visiterList").on('click', '.delete_visior', function () {
    var id = $(this).attr('visior_id');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url: base_url + 'Front_desk/delete/add_visitors/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        visiterLists.ajax.url(base_url + "Front_desk/visiter_list").load();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});
// Visitor Add End


// Call Log Add Start

var call_log_List = $('.call_log_List').DataTable({
    serverSide: false,
    ajax: base_url + 'front_desk/call_log_list',
    "columns": [
        {"data": "sr_no"},
        {"data": "name"},
        {"data": "phone"},
        {"data": "dates"},
        {"data": "next_follw_date"},
        {"data": "call_type"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});
$("#addcalllog").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        call_log_List.ajax.url(base_url + "Front_desk/call_log_list").load();
        $(this).trigger('reset');
    }
});

$(".call_log_List").on('click', '.view-call', function () {
    var id = $(this).attr('visior_id');
    $.ajax({
        url: base_url + 'Front_desk/addmision_call_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#calld_name").html(permission.name);
            $("#calld_phone").html(permission.phone);
            $("#calld_date").html(permission.dates);
            $("#calld_datenext").html(permission.next_follw_date);
            $("#calld_duration").html(permission.call_dureation);
            $("#calld_desc").html(permission.description);
            $("#calld_note").html(permission.note);
            $("#calld_type").html(permission.call_type);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$(".call_log_List").on('click', '.edit-call', function () {
    var id = $(this).attr('visior_id');
    $.ajax({
        url: base_url + 'Front_desk/addmision_call_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#call_id").val(permission.id);
            $("#call_name").val(permission.name);
            $("#call_contact").val(permission.phone);
            $("#call_date").val(permission.dates);
            $("#call_datenext").val(permission.next_follw_date);
            $("#call_duration").val(permission.call_dureation);
            $("#call_desc").val(permission.description);
            $("#call_note").val(permission.note);
            if (permission.call_type === 'Incoming') {
                $("#call_in").prop("checked", true);
            } else {
                $("#call_out").prop("checked", true);
            }
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$("#update_call").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        $('#edit-call').modal('hide');
        call_log_List.ajax.url(base_url + "Front_desk/call_log_List").load();
    }
});

$(".call_log_List").on('click', '.delete_call', function () {
    var id = $(this).attr('visior_id');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url: base_url + 'Front_desk/delete/add_call_log/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        call_log_List.ajax.url(base_url + "Front_desk/call_log_List").load();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});
// Call log Add End



// Postal Disptatch Start

var postal_Dispatch_list = $('.Postal_Dispatch_list').DataTable({
    serverSide: false,
    ajax: base_url + 'front_desk/Postal_Dispatch_list',
    "columns": [
        {"data": "sr_no"},
        {"data": "to_title"},
        {"data": "reference"},
        {"data": "from_title"},
        {"data": "dates"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});
// for adding tostar will open
$("#add_postals").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        postal_Dispatch_list.ajax.url(base_url + "Front_desk/Postal_Dispatch_list").load();
        $(this).trigger('reset');
    }
});

$(".Postal_Dispatch_list").on('click', '.view-postal', function () {
    var id = $(this).attr('postal_id');
    $.ajax({
        url: base_url + 'Front_desk/addmision_postal_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#postals_title").html(permission.to_title);
            $("#postals_ref").html(permission.reference);
            $("#postals_address").html(permission.address);
            $("#postals_note").html(permission.note);
            $("#postals_titlef").html(permission.from_title);
            $("#postals_date").html(permission.dates);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$(".Postal_Dispatch_list").on('click', '.edit-postal', function () {
    var id = $(this).attr('postal_id');
    $.ajax({
        url: base_url + 'Front_desk/addmision_postal_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#postal_id").val(permission.id);
            $("#postal_title").val(permission.to_title);
            $("#postal_ref").val(permission.reference);
            $("#postal_address").val(permission.address);
            $("#postal_note").val(permission.note);
            $("#postal_titlef").val(permission.from_title);
            $("#postal_date").val(permission.dates);
            $("#postal_upload").html(permission.doc_url);
            $("#postal_url").val(permission.doc_url);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$("#update_postal").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        $('#edit-postal').modal('hide');
        postal_Dispatch_list.ajax.url(base_url + "Front_desk/Postal_Dispatch_list").load();
    }
});

$(".Postal_Dispatch_list").on('click', '.delete_postal', function () {
    var id = $(this).attr('postal_id');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url: base_url + 'Front_desk/delete/add_postal/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        //for delete tostr will open
                        postal_Dispatch_list.ajax.url(base_url + "Front_desk/Postal_Dispatch_list").load();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});
// postal_dispatch  Add End

// Postal receive Add Start

var postal_Receive_list = $('.Postal_Receive_list').DataTable({
    serverSide: false,
    ajax: base_url + 'front_desk/Postal_Receive_list',
    "columns": [
        {"data": "sr_no"},
        {"data": "from_title"},
        {"data": "reference"},
        {"data": "to_title"},
        {"data": "dates"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});

//here write form id
$("#addpostalrec").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        postal_Receive_list.ajax.url(base_url + "Front_desk/Postal_Receive_list").load();
        $(this).trigger('reset');
    }
});

$(".Postal_Receive_list").on('click', '.view-postal_rec', function () {
    var id = $(this).attr('postal_rec_id');
    $.ajax({
        url: base_url + 'Front_desk/Postal_Recieve_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#postal_rec_titles").html(permission.from_title);
            $("#postal_rec_refrences").html(permission.reference);
            $("#postal_rec_addresss").html(permission.address);
            $("#postal_rec_notes").html(permission.note);
            $("#postal_rec_to_titles").html(permission.to_title);
            $("#postal_rec_datesss").html(permission.dates);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$(".Postal_Receive_list").on('click', '.edit-postal_rec', function () {
    var id = $(this).attr('postal_rec_id');
    $.ajax({
        url: base_url + 'Front_desk/Postal_Recieve_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#postal_rec_id").val(permission.id);
            $("#postal_rec_title").val(permission.from_title);
            $("#postal_rec_refrence").val(permission.reference);
            $("#postal_rec_address").val(permission.address);
            $("#postal_rec_note").val(permission.note);
            $("#postal_rec_to_title").val(permission.to_title);
            $("#postal_rec_datessssss").val(permission.dates);
            $("#postal_rec_uploads").html(permission.doc_url);
            $("#postal_rec_uploadss").val(permission.doc_url);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$("#update_postal_recs").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        $('#edit-postal_rec').modal('hide');
        postal_Receive_list.ajax.url(base_url + "Front_desk/Postal_Receive_list").load();
    }
});

$(".Postal_Receive_list").on('click', '.delete_postal_rec', function () {
    var id = $(this).attr('postal_rec_id');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
//here write Table name
                url: base_url + 'Front_desk/delete/add_postal_receive/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        //here write var name
                        postal_Receive_list.ajax.url(base_url + "Front_desk/Postal_Receive_list").load();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});
// postal_receive Add End

// Complain Add Start

var complain_Lists = $('.complain_List').DataTable({
    serverSide: false,
    ajax: base_url + 'front_desk/complain_list',
    "columns": [
        {"data": "sr_no"},
        {"data": "complaintType"},
        {"data": "Complain_by"},
        {"data": "phone"},
        {"data": "dates"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});

//here write form id
$("#complain_Lists").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        complain_Lists.ajax.url(base_url + "Front_desk/complain_list").load();
        $(this).trigger('reset');
    }
});

$(".complain_List").on('click', '.view-complain', function () {
    var id = $(this).attr('complain_id');
    $.ajax({
        url: base_url + 'Front_desk/complain_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#complains_complanitss").html(permission.complaintType);
            $("#complains_sourcess").html(permission.sourceName);
            $("#complains_complain_byss").html(permission.Complain_by);
            $("#complains_phoness").html(permission.phone);
            $("#complains_datesssssss").html(permission.dates);
            $("#complains_descriptionss").html(permission.description);
            $("#complains_action_takenss").html(permission.action_taken);
            $("#complains_assignedss").html(permission.assigned);
            $("#complains_notessss").html(permission.note);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$(".complain_List").on('click', '.edit-complain', function () {
    var id = $(this).attr('complain_id');
    $.ajax({
        url: base_url + 'Front_desk/complain_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#complain_id").val(permission.id);
            $("#complain_complanitss").val(permission.complaint);
            $("#complain_sourcess").val(permission.source);
            $("#complain_complain_byss").val(permission.Complain_by);
            $("#complain_phoness").val(permission.phone);
            $("#complain_datesssssss").val(permission.dates);
            $("#complain_descriptionss").val(permission.description);
            $("#complain_action_takenss").val(permission.action_taken);
            $("#complain_assignedss").val(permission.assigned);
            $("#complain_notessss").val(permission.note);
            $("#complain_uploads").html(permission.doc_url);
            $("#complain_uploadss").val(permission.doc_url);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$("#update_complains").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        $('#edit-complain').modal('hide');
        complain_Lists.ajax.url(base_url + "Front_desk/complain_list").load();
    }
});

/*$("#update_postal_recs").on("aftersubmit", function (e, data) {
 $('#pleasewait').modal('hide');
 toastr[data.type](data.message)
 if (data.type === 'success') {
 $('#edit-postal_rec').modal('hide');
 postal_Receive_list.ajax.url(base_url + "Front_desk/Postal_Receive_list").load();
 }
 });
 */
// here datatable class name     and here write pointer class name in complain list model
$(".complain_List").on('click', '.delete_complain_rec', function () {
    var id = $(this).attr('complain_id');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
//here write Table name
                url: base_url + 'Front_desk/delete/add_complain/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        //here write var name
                        complain_Lists.ajax.url(base_url + "Front_desk/complain_list").load();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});
// Complain End

// Setup Front office Start

/*--------------------------------------- add purpose--------------------------------------------------*/
var purpose_Listss = $('.purpose_Listssss').DataTable({
    serverSide: false,
    ajax: base_url + 'front_desk/purpose_list',
    "columns": [
        {"data": "sr_no"},
        {"data": "purpose"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});

$("#purpose_Lists").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        purpose_Listss.ajax.url(base_url + "Front_desk/purpose_list").load();
        $(this).trigger('reset');
    }
});

$(".purpose_Listssss").on('click', '.edit-purpose', function () {
    var id = $(this).attr('purpose_id');
    $.ajax({
        url: base_url + 'Front_desk/addmision_purpose_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#purpose_id").val(permission.id);
            $("#purpose_title").val(permission.purpose);
            $("#purpose_desc").val(permission.description);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$("#update_purpose").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        $('#edit-purpose').modal('hide');
        purpose_Listss.ajax.url(base_url + "Front_desk/purpose_list").load();

    }
});
// here datatable class name     and here write pointer class name in complain list model
$(".purpose_Listssss").on('click', '.delete_purpose_rec', function () {
    var id = $(this).attr('purpose_id');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
//here write Table name
                url: base_url + 'Front_desk/delete/add_purpose/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        //here write var name
                        purpose_Listss.ajax.url(base_url + "Front_desk/purpose_list").load();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});

/*--------------------------------------- Complain Type--------------------------------------------------*/
var complain_type_Listsss = $('.complain_type_Listssssss').DataTable({
    serverSide: false,
    ajax: base_url + 'front_desk/complalin_type_list',
    "columns": [
        {"data": "sr_no"},
        {"data": "complain_type"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});

$("#complain_type_Listsssss").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        complain_type_Listsss.ajax.url(base_url + "Front_desk/complalin_type_list").load();
        $(this).trigger('reset');
    }
});

$(".complain_type_Listssssss").on('click', '.edit-complain_type', function () {
    var id = $(this).attr('complain_type_id');
    $.ajax({
        url: base_url + 'Front_desk/addmision_complain_type_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#complaint_id").val(permission.id);
            $("#complaint_type").val(permission.complain_type);
            $("#complaint_desc").val(permission.description);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$("#update_complain_type").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        $('#edit-complain_type').modal('hide');
        complain_type_Listsss.ajax.url(base_url + "Front_desk/complalin_type_list").load();

    }
});
// here datatable class name     and here write pointer class name in complain list model
$(".complain_type_Listssssss").on('click', '.delete_complain_type_rec', function () {
    var id = $(this).attr('compain_type_id');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
//here write Table name
                url: base_url + 'Front_desk/delete/add_complain_type/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        //here write var name
                        complain_type_Listsss.ajax.url(base_url + "Front_desk/complalin_type_list").load();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});

/*--------------------------------------- source--------------------------------------------------*/
var source_Listsss = $('.source_Listssssss').DataTable({
    serverSide: false,
    ajax: base_url + 'front_desk/source_list',
    "columns": [
        {"data": "sr_no"},
        {"data": "source"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});

$("#source_Lists").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        source_Listsss.ajax.url(base_url + "Front_desk/source_list").load();
        $(this).trigger('reset');
    }
});

$(".source_Listssssss").on('click', '.edit-source', function () {
    var id = $(this).attr('source_id');
    $.ajax({
        url: base_url + 'Front_desk/addmision_source_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#source_id").val(permission.id);
            $("#source_type").val(permission.source);
            $("#source_desc").val(permission.description);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$("#update_source").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        $('#edit-source').modal('hide');
        source_Listsss.ajax.url(base_url + "Front_desk/source_list").load();
    }
});
// here datatable class name     and here write pointer class name in complain list model
$(".source_Listssssss").on('click', '.delete_source_rec', function () {
    var id = $(this).attr('source_id');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
//here write Table name
                url: base_url + 'Front_desk/delete/add_source/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        //here write var name
                        source_Listsss.ajax.url(base_url + "Front_desk/source_list").load();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});

/*--------------------------------------- refrence--------------------------------------------------*/

var refrence_Listsss = $('.refrence_Listssssss').DataTable({
    serverSide: false,
    ajax: base_url + 'front_desk/reference_list',
    "columns": [
        {"data": "sr_no"},
        {"data": "reference"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});

$("#refrence_Lists").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        refrence_Listsss.ajax.url(base_url + "Front_desk/reference_list").load();
        $(this).trigger('reset');
    }
});

$(".refrence_Listssssss").on('click', '.edit-reference', function () {
    var id = $(this).attr('referemce_id');
    $.ajax({
        url: base_url + 'Front_desk/addmision_reference_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#reference_id").val(permission.id);
            $("#reference_type").val(permission.reference);
            $("#reference_desc").val(permission.description);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$("#update_reference").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        $('#edit-refrence').modal('hide');
        refrence_Listsss.ajax.url(base_url + "Front_desk/reference_list").load();
    }
});
// here datatable class name     and here write pointer class name in complain list model
$(".refrence_Listssssss").on('click', '.delete_referemce_rec', function () {
    var id = $(this).attr('refrence_id');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
//here write Table name
                url: base_url + 'Front_desk/delete/add_reference/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        //here write var name
                        refrence_Listsss.ajax.url(base_url + "Front_desk/reference_list").load();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});
// Setup front office End

// Start Appointment
$('#appointment_dept').change(function () {
    var board_id = $(this).val();
    $.ajax({
        url: base_url + 'front_desk/get_staff',
        method: 'post',
        data: {
            id: board_id,
        },
        dataType: 'json',
        success: function (response) {
            $('#appointment_staff').html('');
            $.each(response, function (index, data) {
                $('#appointment_staff').append('<option value="' + data['emp_id'] + '">' + data['first_name'] + ' ' + data['mid_name'] + ' ' + data['last_name'] + '</option>');
            });
        }
    });
});

var appointment_List = $('.appointment_List').DataTable({
    serverSide: false,
    ajax: base_url + 'front_desk/appointment_list',
    "columns": [
        {"data": "sr_no"},
        {"data": "name"},
        {"data": "departmentName"},
        {"data": "firstName",
            "className": "left",
            "render": function (data, type, full, meta) {
                return full.firstName + ' ' + full.midName + ' ' + full.lastName;
            }
        },
        {"data": "date_appoint"},
        {"data": "time_appoint"},
        {"data": "purposeName"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});

$("#appointment_Lists").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        appointment_List.ajax.url(base_url + "Front_desk/appointment_List").load();
        $(this).trigger('reset');
    }
});

$("#update_appointment").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        $('#edit-appoint').modal('hide');
        appointment_List.ajax.url(base_url + "Front_desk/appointment_List").load();
    }
});

$('.appoint_dept').change(function () {
    var board_id = $(this).val();
    $.ajax({
        url: base_url + 'front_desk/get_staff',
        method: 'post',
        data: {
            id: board_id,
        },
        dataType: 'json',
        success: function (response) {
            $('.appoint_staff').html('');
            $.each(response, function (index, data) {
                $('.appoint_staff').append('<option value="' + data['emp_id'] + '">' + data['first_name'] + ' ' + data['mid_name'] + ' ' + data['last_name'] + '</option>');
            });
        }
    });
});

$(".appointment_List").on('click', '.edit-appoint', function () {
    var id = $(this).attr('appoint_id');
    $.ajax({
        url: base_url + 'Front_desk/appointment_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#appoint_id").val(permission.id);
            $("#appoint_purpose").val(permission.purpose);
            $(".appoint_dept").val(permission.dept);
            $("#appoint_depts").val(permission.dept);
            $(".appoint_staff").val(permission.staff);
            $("#appoint_name").val(permission.name);
            $("#appoint_date").val(permission.date_appoint);
            $("#appoint_time").val(permission.time_appoint);
            $("#appoint_note").val(permission.note);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$(".appointment_List").on('click', '.edit-appoint', function () {
    var id = $(this).attr('dept_id');
    var sid = $(this).attr('staff_id');
    $.ajax({
        url: base_url + 'front_desk/get_staff',
        method: 'post',
        data: {
            id: id,
        },
        dataType: 'json',
        success: function (response) {
            $('.appoint_staff').html('');
            $.each(response, function (index, data) {
                if (data['emp_id'] === sid) {
                    $('.appoint_staff').append('<option selected value="' + data['emp_id'] + '">' + data['first_name'] + ' ' + data['mid_name'] + ' ' + data['last_name'] + '</option>');
                } else {
                    $('.appoint_staff').append('<option value="' + data['emp_id'] + '">' + data['first_name'] + ' ' + data['mid_name'] + ' ' + data['last_name'] + '</option>');
                }
            });
        }
    });
});

$(".appointment_List").on('click', '.view-appoint', function () {
    var id = $(this).attr('appoint_id');
    $.ajax({
        url: base_url + 'Front_desk/appointment_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#appoints_purpose").html(permission.purposeName);
            $("#appoints_dept").html(permission.departmentName);
            $("#appoints_staff").html(permission.firstName + ' ' + permission.midName + ' ' + permission.lastName);
            $("#appoints_name").html(permission.name);
            $("#appoints_date").html(permission.date_appoint);
            $("#appoints_time").html(permission.time_appoint);
            $("#appoints_note").html(permission.note);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$(".appointment_List").on('click', '.delete_appoint', function () {
    var id = $(this).attr('appoint_id');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url: base_url + 'Front_desk/delete/add_appointment/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        appointment_List.ajax.url(base_url + "Front_desk/appointment_List").load();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});

$("#on_dept").on('click', function () {
    $.ajax({
        url: base_url + 'front_desk/get_department',
        method: 'post',
        dataType: 'json',
        success: function (response) {
            $('#selDatabase').html('');
            $.each(response, function (index, data) {
                $('#selDatabase').append('<option selected value="' + data['department_id'] + '">' + data['department_name'] + '</option>');
            });
        }
    });
});

$('#selDatabase').change(function () {
    var board_id = $('#selDatabase').val();
    $.ajax({
        url: base_url + 'front_desk/get_staff',
        method: 'post',
        data: {
            id: board_id,
        },
        dataType: 'json',
        success: function (response) {
            $('#pName').html('');
            $.each(response, function (index, data) {
                $('#pName').append('<option value="' + data['emp_id'] + '">' + data['first_name'] + ' ' + data['mid_name'] + ' ' + data['last_name'] + '</option>');
            });
        }
    });
});

var Communication_list = $('.Communication_list').DataTable({
    serverSide: false,
    ajax: base_url + 'front_desk/Communication_list',
     pageLength : 2,
    "columns": [
        {"data": "sr_no"},
        {"data": "current_dates"},
        {"data": "message"},
    ]
});

$('#pName').change(function () {
    var id = $('#pName').val();
    $(".listCom").removeClass("d-none");
    Communication_list.ajax.url(base_url + "Front_desk/Communication_list?id=" + id).load();
});

$("#invitePartyForm").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        var id = data.data;
        $(".listCom").removeClass("d-none");
        Communication_list.ajax.url(base_url + "Front_desk/Communication_list?id=" + id).load();
        $(this).trigger('reset');
    }
});

var currentBoxNumber = 0;
$("#addVisitor,#addcalllog,#add_postals,#addpostalrec,#complain_Lists,#appointment_Lists").keypress(function (event) {
    if (event.keyCode == 13) {
        textboxes = $("input.usernamer");
        currentBoxNumber = textboxes.index(event.target);
        if (textboxes[currentBoxNumber + 1] != null) {
            nextBox = textboxes[currentBoxNumber + 1];
            nextBox.focus();
            nextBox.select();
            event.preventDefault();
            return false;
        }
    }
});
// End Appointment

//********************************************Event Management ****************************************



//***********************************Event Laravel*****************************************************

var select_eventsss_eventssssst = $('.select_eventsss_listssst').DataTable({
    serverSide: false,
    ajax:'add-Category_list',
    "columns": [
        {"data": "sr_no"},
        {"data": "category"},
        {"data": "name"},
        {"data": "dates"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});


$(".select_eventsss_listssst").on('click','.delete_cat', function () {
    var id = $(this).attr('cat_id');
    var token = $('meta[name="csrf-token"]').attr('content');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url:'admin_delete/',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    "id": id,
                    "table": 'quote_categories',
                    "_token": token,
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        select_eventsss_eventssssst.ajax.url("add-Category_list").load();
                        toastr[data.type](data.message);
                       
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});
var select_quotes_list = $('.select_quotes_list').DataTable({
    serverSide: false,
    ajax:'add-quotes_list',
    "columns": [
        {"data": "sr_no"},
        {"data": "category"},
        {"data": "title"},
        {"data": "name"},
        {"data": "created_at"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});

$(".select_quotes_list").on('click','.delete_quotes', function () {
    var id = $(this).attr('quotes_id');
    var token = $('meta[name="csrf-token"]').attr('content');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url:'admin_delete/',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    "id": id,
                    "table": 'quotes',
                    "_token": token,
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        select_quotes_list.ajax.url("add-quotes_list").load();
                        toastr[data.type](data.message);
                       
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                        console.log(data.data);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});






var select_author_list = $('.select_author_list').DataTable({
    serverSide: false,
    ajax:'add-author_list',
    "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        var imgLink = aData['deleted'];
        if (imgLink == 'Y') {
            $('td:eq(4)', nRow).html('Enable');
        } else {
            $('td:eq(4)', nRow).html('Disable');
        }
        return nRow;
    },
    "columns": [
        {"data": "sr_no"},
        {"data": "name"},
        {"data": "email"},
        {"data": "type"},
        {"data": "deleted"},
        {"data": "created_at"},
        {"data": "action"}
    ],
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
});

$(".select_author_list").on('click', '.edit-author', function () {
    var id = $(this).attr('author_id');
    $.ajax({
        url:'admin_get/',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#appoints_purpose").html(permission.purposeName);
            $("#appoints_dept").html(permission.departmentName);
            $("#appoints_staff").html(permission.firstName);
            $("#appoints_name").html(permission.name);
            $("#appoints_date").html(permission.date_appoint);
            $("#appoints_time").html(permission.time_appoint);
            $("#appoints_note").html(permission.note);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$(".appointment_List").on('click', '.edit-appoint', function () {
    var id = $(this).attr('appoint_id');
    $.ajax({
        url: base_url + 'Front_desk/appointment_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#appoint_id").val(permission.id);
            $("#appoint_purpose").val(permission.purpose);
            $(".appoint_dept").val(permission.dept);
            $("#appoint_depts").val(permission.dept);
            $(".appoint_staff").val(permission.staff);
            $("#appoint_name").val(permission.name);
            $("#appoint_date").val(permission.date_appoint);
            $("#appoint_time").val(permission.time_appoint);
            $("#appoint_note").val(permission.note);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$(".select_author_list").on('click','.delete_author', function () {
    var id = $(this).attr('author_id');
    var token = $('meta[name="csrf-token"]').attr('content');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url:'admin_update/',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    "id": id,
                    "table": 'users',
                    "_token": token,
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        select_author_list.ajax.url("add-author_list").load();
                        toastr[data.type](data.message);
                       
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                        console.log(data.data);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});

/*r*/

//***********************************End Event Laravel*************************************************
/*
/*$('#selDatabasess').change(function () {
    var board_id = $('#selDatabasess').val();
    $.ajax({
        url: base_url + 'Event/get_department',
        method: 'post',
        data: {
            id: board_id,
        },
        dataType: 'json',
        success: function (response) {
            $('#pName').html('');
            $.each(response, function (index, data) {
                $('#pName').append('<option value="' + data['emp_id'] + '">' + data['first_name'] + ' ' + data['mid_name'] + ' ' + data['last_name'] + '</option>');
            });
        }
    });
});*/

/*$('#selDatabasess').change(function () {
    var board_id = $('#selDatabasess').val();
    $.ajax({
        url: base_url + 'Event/get_staff',
        method: 'post',
        data: {
            id: board_id,
        },
        dataType: 'json',
        success: function (response) {
            $('#pName').html('');
            $.each(response, function (index, data) {
                $('#pName').append('<option value="' + data['emp_id'] + '">' + data['first_name'] + ' ' + data['mid_name'] + ' ' + data['last_name'] + '</option>');
            });
        }
    });
});*/

/*var Communication_list = $('.Communication_list').DataTable({
    serverSide: false,
    ajax: base_url + 'front_desk/Communication_list',
     pageLength : 2,
    "columns": [
        {"data": "sr_no"},
        {"data": "current_dates"},
        {"data": "message"},
    ]
});*/


//******************************End staff notification *******************************
// for adding tostar will open
/*$("#addholiday").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        select_student_eventsssss.ajax.url(base_url + "Event/seleted_student_list").load();
        $(this).trigger('reset');
    }
});

$(".add_holiday_lists").on('click', '.view-holiday', function () {
    var id = $(this).attr('holiday_id');
    $.ajax({
        url: base_url + 'Event/holiday_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) 
        {
            var permission = data.data[0];
            $("#holiday_titles").html(permission.title);
            $("#holiday_froms_dates").html(permission.from_date);
            $("#holiday_to_dates").html(permission.to_date);
            $("#holiday_description").html(permission.description);

        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$(".add_holiday_lists").on('click', '.edit-holiday', function () {
    var id = $(this).attr('holiday_id');
    $.ajax({
        url: base_url + 'Event/holiday_retrive',
        type: 'post',
        dataType: 'json',
        data: {id: id},
        success: function (data) {
            var permission = data.data[0];
            $("#holidays_ids").val(permission.id);
            $("#holidays_cats_id").val(permission.holiday_cat_id);
            $("#holidays_titles").val(permission.title);
            $("#holidays_froms").val(permission.from_date);
            $("#holidays_tos").val(permission.to_date);
            $("#holidays_descs").val(permission.description);
        },
        error: function (data) {
            console.log('unable to send request..');
        }
    });
});

$("#update_holiday").on("aftersubmit", function (e, data) {
    $('#pleasewait').modal('hide');
    toastr[data.type](data.message)
    if (data.type === 'success') {
        $('#edit-holiday').modal('hide');
        add_holidays.ajax.url(base_url + "Event/Holiday_add_list").load();
    }
});

$(".add_holiday_lists").on('click', '.delete_holiday', function () {
    var id = $(this).attr('holiday_id');
    swal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete !'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url: base_url + 'Event/delete/Holidays/id/' + id,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.type === "success")
                    {
                        //for delete tostr will open
                        add_holidays.ajax.url(base_url + "Event/Holiday_add_list").load();
                        toastr[data.type](data.message);
                    } else if (data.type === "error") {
                        toastr[data.type](data.message);
                    }
                },
                error: function (data) {
                    console.log('unable to send request..');
                }
            });
        }
    });
});
*/
//-----------------------end select student add----------------------------------------------



//*********************************************End Event Management************************************

// build key actions
$(document)
        .keydown(function (e) {
            switch (e.which) {
                case 37: // left
                    console.log('fsdafsa');
                    if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
                        $('#show-previous-image')
                                .click();
                    }
                    break;
                case 39: // right
                    if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
                        $('#show-next-image')
                                .click();
                    }
                    break;
                default:
                    return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });


function isNumber(evt)
{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

// Gallery Design


let modalId = $('#image-gallery');
$(document)
        .ready(function () {

            loadGallery(true, 'a.thumbnail');
            //This function disables buttons when needed
            function disableButtons(counter_max, counter_current) {
                $('#show-previous-image, #show-next-image')
                        .show();
                if (counter_max === counter_current) {
                    $('#show-next-image')
                            .hide();
                } else if (counter_current === 1) {
                    $('#show-previous-image')
                            .hide();
                }
            }

            /**
             *
             * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
             * @param setClickAttr  Sets the attribute for the click handler.
             */

            function loadGallery(setIDs, setClickAttr) {
                let current_image,
                        selector,
                        counter = 0;
                $('#show-next-image, #show-previous-image')
                        .click(function () {
                            if ($(this)
                                    .attr('id') === 'show-previous-image') {
                                current_image--;
                            } else {
                                current_image++;
                            }

                            selector = $('[data-image-id="' + current_image + '"]');
                            updateGallery(selector);
                        });
                function updateGallery(selector) {
                    let $sel = selector;
                    current_image = $sel.data('image-id');
                    $('#image-gallery-title')
                            .text($sel.data('title'));
                    $('#image-gallery-image')
                            .attr('src', $sel.data('image'));
                    disableButtons(counter, $sel.data('image-id'));
                }

                if (setIDs == true) {
                    $('[data-image-id]')
                            .each(function () {
                                counter++;
                                $(this)
                                        .attr('data-image-id', counter);
                            });
                }
                $(setClickAttr)
                        .on('click', function () {
                            updateGallery($(this));
                        });
            }
        });
$('.clockpicker').clockpicker();
