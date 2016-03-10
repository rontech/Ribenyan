// 首页banner 排版
Template.indexLayoutBannerManage.events({
	"click button.js-edit" : function(e){// ＠编辑＠　按钮
		var eventObj = $(e.currentTarget);
		var briefObj = eventObj.parent().parent();
		var detailObj = briefObj.next();

		briefObj.toggle();
		detailObj.toggle();
	},
	"click div.js-show-hide-box" : function(e){// ＠收起＠　div
		var eventObj = $(e.currentTarget);
		var detailObj = eventObj.parent();
		var briefObj = detailObj.prev();

		briefObj.toggle();
		detailObj.toggle();
	}
});