	var data = [
	{
		type : "1",
		modeType : "1",
		templateName : "template1"
	},
	{	
		type : "2",
		modeType : "2",
		templateName : "template2"
	},
	{	
		type : "2",
		modeType : "2",
		templateName : "template2"
	},
	{	
		type : "2",
		modeType : "2",
		templateName : "template1"
	}
]


Template.dynamicDemo.helpers({
		templateList : data
	});

Template.dynamicDemo.onRendered(function(){
	$('#example').dataTable();
$('.datatable').dataTable({"sPaginationType": "bs_normal"});
$('.datatable').dataTable({"sPaginationType": "bs_two_button"});
$('.datatable').dataTable({"sPaginationType": "bs_four_button"});
$('.datatable').dataTable({"sPaginationType": "bs_full"});

});