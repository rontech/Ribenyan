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

//二级新闻列表画面
Router.route("second/:typeID",
			{
				name:"second",
				template:"secondContainer",
				data : function(){
					return this.params;
				}
			});

