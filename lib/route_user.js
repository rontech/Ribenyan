
UserController = RouteController.extend({
    layoutTemplate : "userLayout"

  });

myPageController = RouteController.extend({
	layoutTemplate : "myPageLayout",
	onBeforeAction: function () {
		if(!Meteor.userId()){
			Router.go("/user/login")
		}
		this.next();
	}

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

//个人中心新闻登陆-pc
Router.route("/user/mypage/",
	{
		name:"mypage",
		template:"contentBoxListNews",
		controller : "myPageController"
	}
);
//个人中心新闻登陆-pc
Router.route("/user/mypage/news_add",
	{
		name:"contentBox",
		template:"contentBox",
		controller : "myPageController"
	}
);
//个人中心新闻登陆-mobile
Router.route("/user/mypage/mobile/news_add",
	{
		name:"contentBoxMobile",
		template :"contentBoxMobileAddNews",
		controller:"myPageController"
	});

//个人中心新闻一览
Router.route("/user/mypage/newslist",
	{
		name:"contentBoxListNews",
		template:"contentBoxListNews",
		controller : "myPageController"
	}
);
//个人中心新闻update-pc
Router.route('newsupdate', {
	path: '/user/newsupdate/:_id',template:"contentBoxNewsUpdate",controller: 'myPageController',
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
//个人中心新闻update-mobile
Router.route('newsupdatemobile', {
	path: '/user/newsupdate/mobile/:_id',template:"contentBoxMobileUpdateNews",controller: 'myPageController',
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
		controller : "myPageController"
	}
);
//个人中心 点赞一览
Router.route("/user/mypage/parise_list",
	{
		name:"contentBoxListParise",
		template:"contentBoxListParise",
		controller : "myPageController"
	}
);
//个人中心 AD一览
Router.route("/user/mypage/ad_list",
	{
		name:"frontAdList",
		template:"frontAdList",
		controller : "myPageController"
	}
);

Router.route("/user/mypage/ad_add",
	{
		name:"frontAdInfoAdd",
		template:"frontAdInfoAdd",
		controller : "myPageController"
	}
);
//广告update
Router.route('frontAdUpdate', {
	path: '/user/adupdate/:_id',template:"frontAdInfoUpdate",controller: 'myPageController',
	data: function () {
		var addata = AdInfo.findOne({_id:new Meteor.Collection.ObjectID(this.params._id)});
		Session.set("ad_info",addata);
		return addata;
	},
	waitOn: function(){return Meteor.subscribe("bus_advertisement_info");},
	action: function () {
		this.render();
	}
});