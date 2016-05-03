
Template.secondContainer.onCreated(function () {
	// $("body").css({'background-color': 'white'});
});

Template.secondContainer.helpers({

});
Template.secondContainer.onRendered(function(){
	//导航高亮显示
	var url = location.href;
	if(url.indexOf("second/") > 0 ) {
		url = url.split("/");
		var tmp = HeaderInfoCol.find({typeID:new Meteor.Collection.ObjectID(url[4])}).fetch();
		$(".header .content .respBox #nav li ").each(function(){
			if($(this).text().trim() == tmp[0].showName.trim()){
				$(this).addClass("on");
			}else {
				$(this).removeClass("on");
			}
		});
	}
});