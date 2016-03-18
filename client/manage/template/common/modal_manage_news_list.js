/*
* 首页模块管理-新闻列表
* author ysj
*/
Template.modalManageNewsList.helpers({
	"listData" : function(){//重新编辑数据
		 var self = this;
		 return _.map(self.dataObj,function(p,index) {
            p.parent = self;
            p.index = index;
            p.parentTempType = self.parentTempType;//标识 列表更新的表结构
            return p;
        });
	},
});

//点击事件
Template.modalManageNewsList.events({
	"click button.js-add-banner-box" : function(e){// @添加@ 按钮
		var eveObj = $(e.currentTarget);		
		//显示新增box
		
		var boxObj = eveObj.parent().parent().parent();
		var obj = boxObj.find("div.js-add-news-box");
		var index = boxObj.children("div.cell-box").length + ":"; 

		obj.find("span.js-index").text(index);
		obj.toggle();
	},
});
