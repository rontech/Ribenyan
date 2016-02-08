//动态加载模板
Router.route("dynamic",{name:"dynamicDemo"});
//显示数据
Router.route("showdata",{name:"showData"});
//路由配置跳转画面并传递参数
Router.route("showdatarouter",{name:"showDataRouter"});

Router.route(
				"showdetail/:title/:_id",
				{
					name:"showDetail",
					data : function(){
						var id = this.params._id;
						console.log("A");
						console.log(this.params);
						return this.params;
					}
				}
			);