Template.indexContainer.onRendered(function(){
	var title = SYS_APP_NAME ;
	// 网页标题　类型＋网站名称
	document.title = title  ;
	myscroll=new IScroll("#wrapper",{ eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
});

Template.indexContainer.onCreated(function(){

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