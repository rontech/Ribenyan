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

//二级列表右侧：模块管理
Router.route("manage/secondlist/modal",
			{
				name:"secondlistmodalmanage",
				template:"listRightModalManage",
				layoutTemplate:"manageLayout"
			}
);

// 广告投放管理
Router.route("manage/adv/setting",
			{
				name:"advsettingmanage",
				template:"advSettingManage",
				layoutTemplate:"manageLayout"
			}
);