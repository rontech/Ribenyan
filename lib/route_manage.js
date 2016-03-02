//首页
Router.route("/manage",{name:"manageIndex",template:"manageIndex",layoutTemplate: 'manageLayout'});


Router.route("/manage/custormeradd",{name:"custormeradd",template:"coustomerAdd",layoutTemplate: 'manageLayout'});
Router.route("/manage/newsinfoadd",{name:"newsinfoadd",template:"newsInfoAdd",layoutTemplate: 'manageLayout'});
Router.route("/manage/newslist",{name:"newslist",template:"newsList",layoutTemplate: 'manageLayout'});
Router.route("/manage/adinfoadd",{name:"adinfoadd",template:"adInfoAdd",layoutTemplate: 'manageLayout'});


Router.route('newsview', {
  path: '/manage/newslist/:_id',template:"newsView",layoutTemplate: 'manageLayout',
  data: function () {
  	//var sId = this.params._id.split("\"")[1];
    return NewsInfo.findOne({_id:new Meteor.Collection.ObjectID(this.params._id)});
  },
  waitOn: function(){return Meteor.subscribe("bus_news_info");},
  action: function () {
    this.render();
  }
});