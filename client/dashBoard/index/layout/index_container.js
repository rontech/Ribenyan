Template.indexContainer.onRendered(function(){
	var title = SYS_APP_NAME ;
	// 网页标题　类型＋网站名称
	document.title = title  ;
	myscroll=new IScroll("#wrapper",{ eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
	//mobile 导航颜色
	var tmp=-1;
	$("#scroller li").each(function(){
		switch(tmp%4+1){
			case 1:
				$(this).addClass("one");
				break;
			case 2:
				$(this).addClass("two");
				break;
			case 3:
				$(this).addClass("three");
				break;
			case 4:
				$(this).addClass("four");
				break;
		}
		tmp++;
	});
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