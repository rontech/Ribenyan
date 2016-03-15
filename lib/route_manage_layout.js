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
