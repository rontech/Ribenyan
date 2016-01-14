Router.configure({
	layoutTemplate:"layout",
	notFoundTemplate:"notFound"
});
Router.route("/",{name:"index"});
Router.route("/test",{name:"postList1",template:"postList"});
Router.route("/post/:_id",{
	name:"postDetail",
	data:function() {
		return Posts.findOne({_id:this.params._id});
	}
});

/****************新闻********************/
//主页

//二级分类

/*
*分类新闻列表
*根据新闻类别区分
*/
Router.route("/list",{
	name:"newsList",
	template:"newsListLayout"
});

/*
*新闻详情
*/
Router.route("/list/detail/:_id",{
	name : "newsDetail",
	template : "newsDetailLayout"
});