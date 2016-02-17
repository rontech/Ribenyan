/**
* 基础路由文件，保证此文件加载顺序在其它路由文件之前
* author ysj 
*/

//默认模板
Router.configure({
	layoutTemplate: 'defaultLayout'
});

ApplicationController = RouteController.extend({
	layoutTemplate: 'defaultLayout',
});

//默认页面
Router.route("/",{name:"default",template:"indexContainer"});

//首页
Router.route("index",{name:"index",template:"indexContainer"});

//login
Router.route("admin",{name:"logins",template:"",layoutTemplate:"loginLayout"});


SecondController = RouteController.extend({
	template:"secondContainer",	
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
			{
				name:"second"
			});

