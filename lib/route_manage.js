//login
Router.route("/managelogin",{
  name:"managelogin",template:"managelogin",layoutTemplate: 'loginLayout',
  waitOn: function(){return Meteor.subscribe("bus_manage_user_info");}
});
//logout
Router.route("/managelogout",{name:"managelogout",template:"managelogout",layoutTemplate: 'manageLayout'});
//首页
Router.route("/manage",{name:"manageIndex",template:"manageIndex",layoutTemplate: 'manageLayout'});
//客户信息添加
Router.route("/manage/custormeradd",{name:"custormeradd",template:"coustomerAdd",layoutTemplate: 'manageLayout'});
//新闻信息添加
Router.route("/manage/newsinfoadd",{name:"newsinfoadd",template:"newsInfoAdd",layoutTemplate: 'manageLayout'});
//广告信息添加
Router.route("/manage/adinfoadd",{name:"adinfoadd",template:"adInfoAdd",layoutTemplate: 'manageLayout'});
//类型信息添加
Router.route("/manage/typeinfoadd",{name:"typeinfoadd",template:"typeInfoAdd",layoutTemplate: 'manageLayout'});
//标签信息添加
Router.route("/manage/taginfoadd",{name:"taginfoadd",template:"tagInfoAdd",layoutTemplate: 'manageLayout'});

//新闻一览
Router.route("/manage/newslist",{name:"newslist",template:"newsList",layoutTemplate: 'manageLayout'});
//新闻update
Router.route('newsview', {
  path: '/manage/newslist/:_id',template:"newsView",layoutTemplate: 'manageLayout',
  data: function () {
  	var newsdata = NewsInfo.findOne({_id:new Meteor.Collection.ObjectID(this.params._id)});
  	//var sId = this.params._id.split("\"")[1];
  	Session.set("news_info",newsdata);
    return newsdata;
  },
  waitOn: function(){return Meteor.subscribe("bus_news_info");},
  action: function () {
    this.render();
  }
});

//标签一览
Router.route("/manage/taglist",{name:"taglist",template:"tagList",layoutTemplate: 'manageLayout'});
//标签update
Router.route('tagUpdate', {
  path: '/manage/taglist/:_id',template:"tagUpdate",layoutTemplate: 'manageLayout',
  data: function () {
    var tagdata = TagInfo.findOne({_id:new Meteor.Collection.ObjectID(this.params._id)});
    //var sId = this.params._id.split("\"")[1];
    //Session.set("news_info",tagdata);
    return tagdata;
  },
  waitOn: function(){return Meteor.subscribe("bus_tag_info");},
  action: function () {
    this.render();
  }
});

//类型一览
Router.route("/manage/typelist",{name:"typelist",template:"typeList",layoutTemplate: 'manageLayout'});
//类型update
Router.route('typeUpdate', {
  path: '/manage/typelist/:_id',template:"typeUpdate",layoutTemplate: 'manageLayout',
  data: function () {
    var typedata = TypeInfo.findOne({_id:new Meteor.Collection.ObjectID(this.params._id)});
    //var sId = this.params._id.split("\"")[1];
    //Session.set("news_info",typedata);
    return typedata;
  },
  waitOn: function(){return Meteor.subscribe("bus_type_info");},
  action: function () {
    this.render();
  }
});

//广告一览
Router.route("/manage/adlist",{name:"adlist",template:"adList",layoutTemplate: 'manageLayout'});
//广告信息view
Router.route('adview', {
  path: '/manage/adview/:_id',template:"adView",layoutTemplate: 'adLayout',
  data: function () {
    var addata = AdInfo.findOne({_id:new Meteor.Collection.ObjectID(this.params._id)});
    //var sId = this.params._id.split("\"")[1];
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
    //var sId = this.params._id.split("\"")[1];
    Session.set("ad_info",addata);
    return addata;
  },
  waitOn: function(){return Meteor.subscribe("bus_advertisement_info");},
  action: function () {
    this.render();
  }
});