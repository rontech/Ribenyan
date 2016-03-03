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

//类型一览
Router.route("/manage/typelist",{name:"typelist",template:"typeList",layoutTemplate: 'manageLayout'});