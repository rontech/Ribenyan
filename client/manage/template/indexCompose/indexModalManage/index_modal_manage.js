Template.indexModalManage.created = function() {
    ckPerms('ctrlperms');
}
/*
* 首页 模块新闻管理
*/
Template.indexModalManage.helpers({
	"listData" : function(){//模块list
		var list = IndexLayoutCol.find({"showType":{$ne:1},isVaild:1},{sort:{"showRule":1}});
		 return _.map(list.fetch(),function(p,index) {
            p.index = index;
            p.parentTempType = "indexmodal";//标识 列表更新的表结构
            return p;
        });
	},
});

Template.indexModalManage.events({
	"click button.js-add-modal-info-bt" : function(e){
		var boxObj = $(e.currentTarget).parent().parent().parent();
		var addBoxObj = boxObj.children().last();
		addBoxObj.toggle();
	}
});
