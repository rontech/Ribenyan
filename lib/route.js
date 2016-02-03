/**
* 基础路由文件，保证此文件加载顺序在其它路由文件之前
* author ysj 
*/

//默认模板
Router.configure({
	layoutTemplate: 'indexLayout'
});

ApplicationController = RouteController.extend({
	layoutTemplate: 'indexLayout',
});

Router.route("/",{name:"indexContentLayout"});

