(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/route_demo.js                                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
//动态加载模板                                                               //
Router.route("dynamic", { name: "dynamicDemo" });                      // 2
                                                                       //
//显示数据                                                                 //
Router.route("showdata", { name: "showData" });                        // 5
                                                                       //
//路由配置                                                                 //
Router.route("showdatarouter", { name: "showDataRouter" });            // 8
                                                                       //
//参数传递                                                                 //
Router.route("showdetail/:title/:_id", {                               // 11
	name: "showDetail",                                                   // 14
	data: function () {                                                   // 15
		var id = this.params._id;                                            // 16
		return Posts.findOne(this.params._id);                               // 17
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=route_demo.js.map
