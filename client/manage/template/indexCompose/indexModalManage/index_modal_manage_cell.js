/*
* 新闻模块cell
*/ 
Template.indexModalManageCell.helpers({
	
});

Template.indexModalManageCell.events({
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
	"click button.js-modal-up-bt" : function(e){// @上升@ 按钮
		var eveObj = $(e.currentTarget);
		var boxObj = $(e.currentTarget).parent().parent().parent().parent();
		var updateid =  eveObj.data().id;
		var sort = eveObj.attr("data-sort");
		//验证
		if(boxObj.prev().length > 0 ){//可以上升
			Meteor.call("upDownIndexModalData",updateid,sort,1,function(error,result){
				if(error){
					alert(UPDATE_ERROR);
					return false;
				}else{
					if(result.reason){
						alert(result.reason);
						return false;
					}

					alert(UPDATE_SUCCESS);
					return false;
				}
			});
		}else{//已是
			alert(SORT_IS_FIRST);
			return false;
		}
	},
	"click button.js-modal-down-bt" : function(e){// @下降@ 按钮
		var eveObj = $(e.currentTarget);
		var boxObj = $(e.currentTarget).parent().parent().parent().parent();
		var updateid =  eveObj.data().id;
		var sort = eveObj.attr("data-sort");
		//验证
		if(boxObj.next().length > 0 ){//可以下降
			Meteor.call("upDownIndexModalData",updateid,sort,0,function(error,result){
				if(error){
					alert(UPDATE_ERROR);
					return false;
				}else{
					if(result.reason){
						alert(result.reason);
						return false;
					}
					
					alert(UPDATE_SUCCESS);
					return false;
				}
			});
		}else{//已是
			alert(SORT_IS_LAST);
			return false;
		}
	},
	"click button.js-delete" : function(e){//删除按钮
		var eveObj = $(e.currentTarget);
		// id
		var deleteID = eveObj.data().id;
		if(window.confirm("确认要删除吗？")==true){
			Meteor.call("deleteIndexModalDate",deleteID,function(error,result){
				if(error){
					alert(DELETE_ERROR);
				}else{
					alert(DELETE_SUCCESS);
				}
			});
			return false;
		}else{
			return false;
		}
		
	},
	
});

