/**
* 基础路由文件，保证此文件加载顺序在其它路由文件之前
* author ysj
*/

//默认模板
Router.configure({
	layoutTemplate: 'defaultLayout',notFoundTemplate: 'notFound'
});

ApplicationController = RouteController.extend({
	layoutTemplate: 'defaultLayout',
});

//默认页面
Router.route("/",{name:"default",template:"indexContainer"});

//首页
Router.route("index",{name:"index",template:"indexContainer"});




//二级新闻列表
SecondController = RouteController.extend({
	template:"secondContainer",
	layoutTemplate:"secondContainer",

	newsLimit : function(){
		if ( this.params.limit ) {
			return parseInt(this.params.limit);
		}else {
			return INCREMENT;
		}
	},
    waitOn: function() {
		var typeID = this.params.typeID;
		var sort = {_id: -1};
		return Meteor.subscribe("News",typeID,sort,this.newsLimit());
    },
    data:function(){
    	return {
    		typeID:this.params.typeID,
    		limit : this.newsLimit()
    	}
    }
});

//二级新闻列表画面
Router.route("second/:typeID/:limit?",
				function(){
						this.render("secondLeftList",{to : "main"});
				},
				{
					name:"second",
					template:"secondLeftList"
				}
			);
DetailController = RouteController.extend({
	layoutTemplate:"secondContainer",
});
//新闻详情
Router.route("news/detail/:id",
			function(){
						this.render("newsDetail",{to : "main"});
			},
			{
				name:"newsDetail",
				template:"newsDetail",
				controller : "DetailController",
				waitOn:function(){
					Meteor.subscribe("detailNews",this.params.id);
				},
				data:function(){
					var id = new Meteor.Collection.ObjectID(this.params.id);
					return NewsCol.findOne({_id:id});
				}
			}
		);

