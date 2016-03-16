/*
* 后台管理　排版路由配置
*
* author ysj
*/
//　首页:banner
Router.route("/manage/index/banner",
			{
				name:"indexbannermanage",
				template:"indexLayoutBannerManage",
				layoutTemplate: 'manageLayout'
			}
);

//首页：模块管理
Router.route("manage/index/modal",
			{
				name:"indexmodalmanage",
				template:"indexModalManage",
				layoutTemplate: 'manageLayout'
			}
);
