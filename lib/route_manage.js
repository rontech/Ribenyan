//首页
Router.route("/manage",{name:"manageIndex",template:"manageIndex",layoutTemplate: 'manageLayout'});


Router.route("/manage/custormeradd",{name:"custormeradd",template:"coustomerAdd",layoutTemplate: 'manageLayout'});
Router.route("/manage/newsinfoadd",{name:"newsinfoadd",template:"newsInfoAdd",layoutTemplate: 'manageLayout'});
Router.route("/manage/newslist",{name:"newslist",template:"newsList",layoutTemplate: 'manageLayout'});

Router.route('/manage/newslist', {
  path: '/manage/newslist/:_id',template:"newsList",layoutTemplate: 'manageLayout',
  data: function () {
	// var a = new Mongo.Collection.ObjectID("56c3ddf0ec1cf6cce3a8805e");
	// console.log(a._str);

	console.log(NewsInfo.findOne({_id:

								new Meteor.Collection.ObjectID("56c3ddf0ec1cf6cce3a8805e")

							})
	);

    return NewsInfo.find({_id:{
							$elemMatch:{
								typeID: new Meteor.Collection.ObjectID("56c3ddf0ec1cf6cce3a8805e")
							}
						}
						});
  },

  action: function () {
    this.render();
  }
});