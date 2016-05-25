
UserController = RouteController.extend({
    layoutTemplate : "userLayout"
  });

Router.route("/user/login",
            {
              name:"login",
              template:"loginRegister",
              controller : "UserController"
            });

Router.route("/user/forgotpassword",
			{
				name:"forgotpassword",
				template:"forgotPassword",
				controller:"UserController"
			}	
	);

Router.route("/user/resetpassword/:token?",
			{
				name:"resetpassword",
				template:"resetPassword",
				controller:"UserController",
				data : function(){
					return this.params;
				}
			}	
	);
//个人中心新闻登陆
Router.route("/user/mypage/",
	{
		name:"contentBox",
		template:"contentBox",
		layoutTemplate : "myPageLayout"
	}
);
//个人中心新闻一览
Router.route("/user/mypage/newslist",
	{
		name:"contentBoxListNews",
		template:"contentBoxListNews",
		layoutTemplate : "myPageLayout"
	}
);
//个人中心新闻update
Router.route('newsupdate', {
	path: '/user/newsupdate/:_id',template:"contentBoxNewsUpdate",layoutTemplate: 'myPageLayout',
	data: function () {
		var newsdata = NewsInfo.findOne({_id:new Meteor.Collection.ObjectID(this.params._id)});
		Session.set("news_info",newsdata);
		return newsdata;
	},
	waitOn: function(){return Meteor.subscribe("bus_news_info");},
	action: function () {
		this.render();
	}
});
//个人中心 评论一览
Router.route("/user/mypage/eval_list",
	{
		name:"contentBoxListEvaluation",
		template:"contentBoxListEvaluation",
		layoutTemplate : "myPageLayout"
	}
);
//个人中心 点赞一览
Router.route("/user/mypage/parise_list",
	{
		name:"contentBoxListParise",
		template:"contentBoxListParise",
		layoutTemplate : "myPageLayout"
	}
);
//个人中心 AD一览
Router.route("/user/mypage/ad_list",
	{
		name:"frontAdList",
		template:"frontAdList",
		layoutTemplate : "myPageLayout"
	}
);

Router.route("/user/mypage/ad_add",
	{
		name:"frontAdInfoAdd",
		template:"frontAdInfoAdd",
		layoutTemplate : "myPageLayout"
	}
);