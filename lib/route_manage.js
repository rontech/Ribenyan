//login
Router.route("/managelogin",{
name:"managelogin",template:"managelogin",layoutTemplate: 'loginLayout',
	waitOn: function(){return Meteor.subscribe("bus_manage_user_info");}
});
//logout
Router.route("/managelogout",{name:"managelogout",template:"managelogout",layoutTemplate: 'manageLayout'});
//forgotPwd
Router.route("/manageforgot",{name:"forgotpwd",template:"forgotPwd",layoutTemplate: 'loginLayout'});
//没有权限页面
Router.route("/manage/nopermission",{name:"nopermission",template:"noPermission",layoutTemplate: 'manageLayout'});

//新闻信息添加
Router.route("/manage/newsinfoadd",{name:"newsinfoadd",template:"newsInfoAdd",layoutTemplate: 'manageLayout'});
//新闻一览
Router.route("/manage/newslist",{name:"newslist",template:"newsList",layoutTemplate: 'manageLayout'});
//新闻update
Router.route('newsview', {
	path: '/manage/newslist/:_id',template:"newsView",layoutTemplate: 'manageLayout',
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

//类型信息添加
Router.route("/manage/typeinfoadd",{name:"typeinfoadd",template:"typeInfoAdd",layoutTemplate: 'manageLayout'});
//类型一览
Router.route("/manage/typelist",{name:"typelist",template:"typeList",layoutTemplate: 'manageLayout'});
//类型update
Router.route('typeUpdate', {
	path: '/manage/typelist/:_id',template:"typeUpdate",layoutTemplate: 'manageLayout',
	data: function () {
		var typedata = TypeInfo.findOne({_id:new Meteor.Collection.ObjectID(this.params._id)});
		return typedata;
	},
	waitOn: function(){return Meteor.subscribe("bus_type_info");},
	action: function () {
		this.render();
	}
});

//标签信息添加
Router.route("/manage/taginfoadd",{name:"taginfoadd",template:"tagInfoAdd",layoutTemplate: 'manageLayout'});
//标签一览
Router.route("/manage/taglist",{name:"taglist",template:"tagList",layoutTemplate: 'manageLayout'});
//标签update
Router.route('tagUpdate', {
	path: '/manage/taglist/:_id',template:"tagUpdate",layoutTemplate: 'manageLayout',
	data: function () {
		var tagdata = TagInfo.findOne({_id:new Meteor.Collection.ObjectID(this.params._id)});
		return tagdata;
	},
	waitOn: function(){return Meteor.subscribe("bus_tag_info");},
	action: function () {
		this.render();
	}
});

//广告信息添加
Router.route("/manage/adinfoadd",{name:"adinfoadd",template:"adInfoAdd",layoutTemplate: 'manageLayout'});
//广告一览
Router.route("/manage/adlist",{name:"adlist",template:"adList",layoutTemplate: 'manageLayout'});
//广告信息view
Router.route('adview', {
	path: '/manage/adview/:_id',template:"adView",layoutTemplate: 'adLayout',
	data: function () {
		var addata = AdInfo.findOne({_id:new Meteor.Collection.ObjectID(this.params._id)});
		Session.set("ad_view_info",addata);
		return addata;
	},
	waitOn: function(){return Meteor.subscribe("bus_advertisement_info");},
	action: function () {
		this.render();
	}
});
//广告update
Router.route('adUpdate', {
	path: '/manage/adlist/:_id',template:"adInfoUpdate",layoutTemplate: 'manageLayout',
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

//客户信息添加
Router.route("/manage/manageUserAdd",{name:"manageuseradd",template:"manageUserAdd",layoutTemplate: 'manageLayout'});
//后台用户一览
Router.route("/manage/managelist",{name:"manageuserlist",template:"manageUserList",layoutTemplate: 'manageLayout'});
//后台用户update
Router.route('manageUserUpdate', {
	path: '/manage/managelist/:_id',template:"manageUserUpdate",layoutTemplate: 'manageLayout',
	data: function () {
		var usersdata = AdminInfo.findOne({_id:new Meteor.Collection.ObjectID(this.params._id)});
		console.log(usersdata);
		Session.set("user_info",usersdata);
		return usersdata;
	},
	waitOn: function(){return Meteor.subscribe("bus_manage_user_info");},
	action: function () {
		this.render();
	}
});
//后台用户密码修改
Router.route("/manage/pwdchange",{name:"managepwdchange",template:"managePwdChange",layoutTemplate: 'manageLayout'});
