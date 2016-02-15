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

SecondController = RouteController.extend({
	template:"secondContainer",
	increment : 3,
	newsLimit : function(){
		console.log("1");
		if ( this.params.newslimit ) {
			return parseInt(this.params.newslimit);
		}else {
			return this.increment;
		}
	},
    waitOn: function() {
    	console.log("2",this.newsLimit());
		var typeID = this.params.typeID;
		var sort = {_id: -1};
		return Meteor.subscribe("News",typeID,sort,this.newsLimit());
    },
    news : function(){
		return News.find(
						{
							typeObj:{
								$elemMatch:{
									typeID: new Meteor.Collection.ObjectID(this.params.typeID)
								}
							}
						},
						{
							sort: {submitted: -1}, 
							limit: this.newsLimit()
						}
					);
    },
    data:function(){
    	console.log("3",this.newsLimit());
	 　　 var hasMore = this.news().count() === this.newsLimit();
    	var nextPath = this.route.path({typeID:this.params.typeID,newslimit: this.newsLimit() + this.increment});
    	return {
    		newsList : this.news(),
    		nextPath : hasMore ? nextPath : null
    	}
    }	
});

//二级新闻列表画面
Router.route("second/:typeID/:newslimit?",
			{
				name:"second"
			});

