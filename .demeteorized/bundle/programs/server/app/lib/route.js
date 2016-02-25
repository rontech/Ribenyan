(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/route.js                                                        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
* 基础路由文件，保证此文件加载顺序在其它路由文件之前                                            //
* author ysj                                                           //
*/                                                                     //
                                                                       //
//默认模板                                                                 //
Router.configure({                                                     // 7
	layoutTemplate: 'defaultLayout'                                       // 8
});                                                                    //
                                                                       //
ApplicationController = RouteController.extend({                       // 11
	layoutTemplate: 'defaultLayout'                                       // 12
});                                                                    //
                                                                       //
//默认页面                                                                 //
Router.route("/", { name: "default", template: "indexContainer" });    // 16
                                                                       //
//首页                                                                   //
Router.route("index", { name: "index", template: "indexContainer" });  // 19
                                                                       //
//二级新闻列表                                                               //
SecondController = RouteController.extend({                            // 22
	layoutTemplate: "secondContainer",                                    // 23
	newsLimit: function () {                                              // 24
		if (this.params.limit) {                                             // 25
			return parseInt(this.params.limit);                                 // 26
		} else {                                                             //
			return INCREMENT;                                                   // 28
		}                                                                    //
	},                                                                    //
	waitOn: function () {                                                 // 31
		var typeID = this.params.typeID;                                     // 32
		var sort = { _id: -1 };                                              // 33
		return Meteor.subscribe("News", typeID, sort, this.newsLimit());     // 34
	},                                                                    //
	data: function () {                                                   // 36
		return {                                                             // 37
			typeID: this.params.typeID,                                         // 38
			limit: this.newsLimit()                                             // 39
		};                                                                   //
	}                                                                     //
});                                                                    //
                                                                       //
//二级新闻列表画面                                                             //
Router.route("second/:typeID/:limit?", function () {                   // 45
	this.render("secondLeftList", { to: "main" });                        // 47
}, {                                                                   //
	name: "second"                                                        // 50
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=route.js.map
