Template.indexContainer.onRendered(function(){
	var title = SYS_APP_NAME ;
	// 网页标题　类型＋网站名称
	document.title = title  ;
});

Template.indexContainer.onCreated(function(){
	var url = location.href;
	if(url.indexOf("/index") > 0 ){
		$(".header .content .respBox .menu li").removeClass("on");
		$(".header .content .respBox #nav li:first").addClass("on");
	}else  if(url.indexOf("second/") > 0 ) {
		url = url.split("second/");
		var tmp = HeaderInfoCol.find({typeID:new Meteor.Collection.ObjectID(url[1])}).fetch();
		$(".header .content .respBox #nav li ").each(function(){
			if($(this).text().trim() == tmp[0].showName.trim()){
				$(this).addClass("on");
			}else {
				$(this).removeClass("on");
			}
		});
	}else if(url.indexOf("news/detail/") > 0){
		url = url.split("news/detail/");
		console.log(url[1]);
	}
});

// Template.indexContainer.helpers({
// 	bannerData : function(){//轮播图
// 		return IndexLayoutCol.findOne({showType:1});
// 	},
// 	typeNewsList : function(){//新闻及广告
// 		return IndexLayoutCol.find(
// 								{
// 									showType:{$ne:1}
// 								},
// 								{
// 									sort:{showRule:1}
// 								}
// 								);
// 	}
// });