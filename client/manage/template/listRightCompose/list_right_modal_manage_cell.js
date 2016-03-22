/*
* 新闻模块cell
*/ 
Template.listRightModalManageCell.helpers({
	
});

Template.listRightModalManageCell.events({
	"click button.js-modal-info-bt" : function(e){// @基本信息@ 按钮
		var eveObj = $(e.currentTarget);
		//模块信息
		var modalInfoObj = eveObj.parent().parent().parent().next();

		modalInfoObj.toggle();
		return false;
	},
	"click button.js-modal-list-bt" : function(e){// @内容列表@ 按钮
		var eveObj = $(e.currentTarget);
		//内容列表
		var linstInfoObj = eveObj.parent().parent().parent().next().next();

		linstInfoObj.toggle();
		return false;

	},
	"click button.js-delete" : function(e){//删除按钮
		var eveObj = $(e.currentTarget);
		// id
		var deleteID = eveObj.data().id;
		
		Meteor.call("deleteSecondRightModalData",deleteID,function(error,result){
			if(error){
				alert(DELETE_ERROR);
			}else{
				alert(DELETE_SUCCESS);
			}
		});
		return false;
	},
	
});

