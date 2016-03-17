/*
* 首页模块管理-新闻列表
* author ysj
*/
Template.indexModalManageNewsList.helpers({
	"listData" : function(){//重新编辑数据
		 var self = this;
		 return _.map(self.dataObj,function(p,index) {
            p.parent = self;
            p.index = index;
            p.tempType = "indexmodal";//标识 列表更新的表结构
            return p;
        });
	}
});

//点击事件
Template.indexModalManageNewsList.events({
	"click button.js-add-banner-box" : function(e){// @添加@ 按钮
		//Session.set("isAddBox",true);

		//显示新增box
		var obj = $("div.js-add-banner-box");

		var boxObj = $("div.js-slidediv");
		var index = boxObj.children("div.cell-box").length;

		obj.find("span.js-index").text(index);

		obj.toggle();
	},
});
