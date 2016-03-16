/*
* 首页 模块新闻管理
*/
Template.indexModalManage.helpers({
	"listData" : function(){//模块list
		var list = IndexLayoutCol.find({"showType":{$ne:1},isVaild:1},{sort:{"showRule":1}});
		return list;
	},
});
