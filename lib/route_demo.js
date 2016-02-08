//动态加载模板
Router.route("dynamic",{name:"dynamicDemo"});

//显示数据
Router.route("showdata",{name:"showData"});

//路由配置
Router.route("showdatarouter",{name:"showDataRouter"});

//参数传递
Router.route(
			"showdetail/:name/:type_id",
			{
				name:"showDetail",
				data : function(){
					var id = this.params._id;
					return Posts.findOne(this.params._id);
				}
			}
		);