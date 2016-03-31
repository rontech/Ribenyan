Template.listRightModalManage.created = function() {
    ckPerms('ctrlperms');
}
/*
* 二级列表右侧 模块新闻管理
*/
Template.listRightModalManage.helpers({
	"listData" : function(){//模块list
		var list = SecondRightLayout.find({isVaild:1},{sort:{"showRule":1}});
		 return _.map(list.fetch(),function(p,index) {
            p.index = index;
            p.parentTempType = "secondlistmodal";//标识 列表更新的表结构
            return p;
        });
	},
});

Template.listRightModalManage.events({
	"click button.js-add-modal-info-bt" : function(e){
		var boxObj = $(e.currentTarget).parent().parent().parent();
		var addBoxObj = boxObj.children().last();
		addBoxObj.toggle();
	}
});
