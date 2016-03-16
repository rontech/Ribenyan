// 首页banner 排版

// 
Template.indexLayoutBannerManage.rendered = function() {
   var tmp =   sessionStorage.getItem('login_user');//Session.get("login_user");
   console.log(tmp);
   if(tmp==null){
      Router.go("/managelogin");
   }
 };

Template.indexLayoutBannerManage.events({
	"click button.js-edit" : function(e){// ＠编辑＠　按钮
		var eventObj = $(e.currentTarget);
		var briefObj = eventObj.parent().parent();
		var detailObj = briefObj.next();

		briefObj.toggle();
		detailObj.toggle();
	},
	"click div.js-show-hide-box " : function(e){// ＠收起＠　div
		var eventObj = $(e.currentTarget);
		var detailObj = eventObj.parent();
		var briefObj = detailObj.prev();

		briefObj.toggle();
		detailObj.toggle();
	},
	"click button.js-add-banner-box" : function(e){// @添加@ 按钮
		//Session.set("isAddBox",true);

		//显示新增box
		var obj = $("div.js-add-banner-box");

		var boxObj = $("div.js-slidediv");
		var index = boxObj.children("div.cell-box").length;

		obj.find("span.js-index").text(index);

		obj.toggle();
	},
	"click button.js-delete" : function(e){ // @删除@ 按钮
		var eventObj = $(e.currentTarget);
		var boxObj = $("div.js-slidediv");
		var index = boxObj.children("div.cell-box").length - 1 ;
		if(index == 1){
			alert(BANNER_DELETE_LAST_ONE);
			return false;
		}else{
			var deleteID = eventObj.data().id;
			//提交Id
			Meteor.call("deleteIndexBannerSlideDate",deleteID,function(error,result){
				if(error){
					alert(BANNER_DELETE_ERROR);
				}else{
					// 待调整 
					alert(BANNER_DELETE_SUCCESS);
				}
			});
		}
	}
});

Template.indexLayoutBannerManage.helpers({
	"slideData" : function(){
		var topInfo = getTopData();
		if(topInfo){
			return topInfo.dataObj.slideData;
		}else{	
			//alert(DATA_ERROR);
			return "";
		}
	},
	"rightData" : function(){
		var topInfo = getTopData();
		if(topInfo){
			return topInfo.dataObj.rightData;
		}else{	
			//alert(DATA_ERROR);
			return "";
		}
	}
});

//查询数据
function getTopData(){
	var topData = IndexLayoutCol.findOne({"showType":1,"isVaild":1});
	if(topData){
		return topData;
	}else{
		 return false;
	}
}