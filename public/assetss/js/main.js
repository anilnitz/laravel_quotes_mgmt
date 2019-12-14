(function () {
	"use strict";
	var treeviewMenu = $('.app-menu');
	// Toggle Sidebar
	$('[data-toggle="sidebar"]').click(function(event) {
		event.preventDefault();
		$('.page-topbar').toggleClass('sidebar_shift');
                $('.page-sidebar').toggleClass('collapseit');
                $('.page-sidebar').toggleClass('expandit');
                $('#main-content').toggleClass('sidebar_shift');
	});
	// Activate sidebar treeview toggle
	$("[data-toggle='treeview']").click(function(event) {
		event.preventDefault();
		if(!$(this).parent().hasClass('is-expanded')) {
			treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
		}
		$(this).parent().toggleClass('is-expanded');
	});
	// Set initial active toggle
	$("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');
	//Activate bootstrip tooltips
	$("[data-toggle='tooltip']").tooltip();
})();
