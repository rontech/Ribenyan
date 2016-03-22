/*
*  添加模块基本信息
* data : {
			parentTempType : 外部引用类型
		  }
*/
Template.modalInfoAddTemplate.helpers({
	"id" : function(){
		var id = new Meteor.Collection.ObjectID();
		return id._str;
	},
	"parentTempType" : function(){
		return Template.currentData().parentTempType;
	},
	"isIndexManage" : function(){
		if(Template.currentData().parentTempType == "indexmodal"){//
			return true;
		}else{
			return false;
		}
	},
});

Template.modalInfoAddTemplate.events({
	"change input[name=isshowmore]" : function(e){// ＠是否显示更多＠切换
		var eveObj = $(e.currentTarget);
		var typeObj = eveObj.parent().parent().next();
		typeObj.toggle();
		return false;

	},
	"click button.js-modal-info-save-bt" :function(e){// 基本信息@保存@按钮
		var eveObj = $(e.currentTarget);
		var boxObj = eveObj.parent().parent().parent();
		var modalID = boxObj.data().id;
		//数据
		// var type = eveObj.find("input[name=type]:checked").val();
		var tempname = boxObj.find("select[name=tempname]").val();
		var isshowmore = boxObj.find("input[name=isshowmore]:checked").val();
		var moretype = boxObj.find("select[name=moretype]").val();
		var typeshowname = boxObj.find("input[name=typeshowname]").val();
		var temptype = boxObj.data().temptype;

		//数据校验
		if("0" == tempname){
			alert(MODAL_TEMP_NOT_NULL);
			return false;
		}

		if(temptype == "indexmodal"){//首页模块信息 更改
			if(isEmpty(isshowmore)){
				alert(MODAL_ISSHOWMORE_NOT_NULL);
				return false;
			}

			if("1" == isshowmore){//显示
				if("0" == moretype){
					alert(MODAL_MORE_TYPE);
					return false;
				}else{
					if(isHaveObjIndexLayout("typeID",moretype)){
						alert(MODAL_TYPE_IS_HAVE);
						return false;
					}
				}
			}
		}

		if(isEmpty(typeshowname)){
			alert(MODAL_TITLE_NAME);
			return false;
		}else{
			if(temptype == "indexmodal"){//首页模块信息 更改
				if(isHaveObjIndexLayout("typeShowName",typeshowname)){
					alert(MODAL_NAME_IS_HAVE);
					return false;
				}
			}else if(temptype == "secondlistmodal"){// 二级列表右侧模板
				if(isHaveObjSecondListRightLayout("typeShowName",typeshowname)){
					alert(MODAL_NAME_IS_HAVE);
					return false;
				}
			}
		}

		//传递数据
		var data = {
				"id" : "add",
				"tempname" : tempname,
				"isshowmore" : isshowmore,
				"moretype" : moretype,
				"typeshowname" : typeshowname
		};

		
		var methodName = "";
		switch (temptype){
			case "indexmodal"://首页 模块新闻
				methodName = "upSetIndexModalDate";
				break;
			case "secondlistmodal"://二级列表右侧模块
				methodName = "upSetSecondRightModalData";
				break;
			default :
			    methodName = false;
			    break;
		}

		// 提交数据
		Meteor.call(methodName,data,function(error,result){
			if(error){
				alert(MODAL_INSERT_ERROR);
			}else{
				if(result.reason){
					alert(result.reason);
				}else{
					alert(MODAL_INSERT_SUCCESS);
					// 关闭添加框
					var box = boxObj.parent().parent().parent();
					box.toggle();
				}
			}
		});
		return false;
	}
});