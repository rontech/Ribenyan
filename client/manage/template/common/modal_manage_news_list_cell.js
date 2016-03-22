/*
* 首页模块管理-新闻列表
* author ysj
*/
Template.modalManageNewsListCell.helpers({
	"isNews" : function(){
		if(this.type == "1"){
			return "checked";
		}else {
			return "";
		}
	},
	"isEva" : function(){
		if(this.type == "2"){
			return "checked";
		}else {
			return "";
		}
	},
	"siteIn" : function(){
		if(isEmpty(this.siteType)){
			return "checked";
		}
		if(this.siteType == "1"){
			return "checked";
		}else {
			return "";
		}
	},
	"siteOut" : function(){
		if(this.siteType == "2"){
			return "checked";
		}else {
			return "";
		}
	},
	"isSiteIn" : function(){
		if(isEmpty(this.siteType)){
			return "display";
		}
		if(this.siteType == "1"){
			return "display";
		}else {
			return "none";
		}
	},
	"isSiteOut" : function(){

		if(this.siteType == "2"){
			return "display";
		}else {
			return "none";
		}
	}
});

//点击事件
Template.modalManageNewsListCell.events({
  "click button.js-edit" : function(e){// ＠编辑＠　按钮
		var eventObj = $(e.currentTarget);
		var briefObj = eventObj.parent().parent();
		var detailObj = briefObj.next();

		briefObj.toggle();
		detailObj.toggle();
		return false;
	},
	"click div.js-show-hide-box " : function(e){// ＠收起＠　div
		var eventObj = $(e.currentTarget);
		var detailObj = eventObj.parent();
		var briefObj = detailObj.prev();

		briefObj.toggle();
		detailObj.toggle();
		return false;
	},
	"click button.js-delete" : function(e){ // @删除@ 按钮
		var eventObj = $(e.currentTarget);

		var deleteID = eventObj.data().id;
		var modalID = eventObj.data().modalid;
		var temptype = eventObj.data().temptype;
		// 数据
		var data = {
						updateID:modalID,//更新ID
						dataID:deleteID,//内嵌数据ID
		};
		var methodName = "";
		switch (temptype){
			case "indexsilde"://首页 banner 轮播图
				methodName = "deleteIndexBannerSlideDate";
				break;
			case "indexmodal"://首页 模块新闻
				methodName = "deleteIndexModalShowData";
				break;
			case "secondlistmodal"://二级列表右侧模块
				methodName = "deleteSecondRightModalShowData";
				break;
			default :
			    methodName = false;
			    break;
		}

		//提交Id
		Meteor.call(methodName,data,function(error,result){
			if(error){
				alert(DELETE_ERROR);
			}else{
				// 待调整
				alert(DELETE_SUCCESS);
			}
		});
		
		return false;
	},
	"change input[name=site]" :function(e) {//选择　跳转位置
		var eveObj = $(e.currentTarget);
		var val = eveObj.val();
		var siteOutLinkObj = eveObj.parent().parent().next();
		var siteInLikeObj = siteOutLinkObj.next();

		//切换
		siteOutLinkObj.toggle();
		siteInLikeObj.toggle();
	},
	"click a.js-request" :function(e){//＠访问＠按钮
		var eveObj = $(e.currentTarget);
		var url = eveObj.prev().val();
		if(isEmpty(url)){
			alert(URL_NOT_NULL);
		}else{
			//打开新窗口
			eveObj.attr("href",url);
		}
	},
	"click button.js-select" : function(e){//　弹出框选择新闻或广告
		var eveObj = $(e.currentTarget);
		var boxObj = eveObj.parent().parent().parent();
		var boxID = boxObj.attr("id");

		Session.set("boxID",boxID);

		var type = boxObj.find("input[name=type]:checked").val();

		if(type =="1" ){//新闻窗口
			//弹出新闻窗口
			Modal.show("popupViewNewsModal");
		}else if(type=="2"){
			//弹出广告选窗口
			alert("暂未对应");
		}
		return false;
	},
	"click button.js-news-info-update" :function(e){ // @保存@ 按钮
		var eventObj = $(e.currentTarget);
		var boxObj = eventObj.parent().parent().parent();

		// 模块ID
		var updateID = boxObj.data().modalid;
		// 内嵌ID
		var dataID = boxObj.data().id;

		//数据

		//标题
		var title = boxObj.find("input[name=title]").val();
		//简介
		var introduce = boxObj.find("input[name=introduce]").val();
		//类型
		var type = boxObj.find("input[name=type]:checked").val();
		//详情页类型
		var siteType = boxObj.find("input[name=site]:checked").val();
		// 新闻Ｉｄ
		var newsID = boxObj.find("input[name=newsid]").val();
		// 广告ID
		var evaID = boxObj.find("input[name=evaid]").val();

		// link
		var link = ""
		if(siteType == "1"){//站内
			link = boxObj.find("input[name=siteinlink]").val();
		}else{//站外
			link = boxObj.find("input[name=siteoutlink]").val();
		}

		var imageID = boxObj.find("img.js-selectImage").data().imageid;

		//数据验证
		if(isEmpty(title)){
			alert(BANNER_TITLE_NOT_NULL);
			return false;
		}

		if(checkTextNum(title,BANNER_INFO_TITLE_NUM)){
			alert(BANNER_TEXT_OUT_NUMBER);
			return false;
		}

		if(isEmpty(introduce)){
			alert(BANNER_INTRODUCE_NOT_NULL);
			return false;
		}

		if(checkTextNum(introduce,BANNER_INFO_INTRODUCE_NUM)){
			alert(BANNER_TEXT_OUT_NUMBER);
			return false;
		}

		if(siteType == "1"){//站内
			if(type =="1"){//新闻
				if(isEmpty(newsID)){
					alert(BANNER_SELECT_NEWS);
					return false;	
				}
			}else if(type=="2"){//广告
				if(isEmpty(evaID)){
					alert(BANNER_SELECT_NEWS);
					return false;	
				}
			}
		}else if(siteType == "2"){//站外
			if(isEmpty(link)){
				alert(BANNER_LINK_NOT_NULL);
				return false;
			}
		}

		if(isEmpty(imageID)){
			alert(BANNER_IMAGE_NOT_NULL);
			return false;
		}

		// 数据
		var data = {
						updateID:updateID,//更新ID
						dataID:dataID,//内嵌数据ID
						type:type,//类型
						siteType:siteType,//跳转类型
						title:title,//标题
						introduce:introduce,//简介
						link:link,//点击详情页 
						newsID:newsID,//新闻ID
						evaID :evaID,//广告ID
						imageID:imageID
					};

		// 更新方法请求方法判断
		var tempType = boxObj.data().temptype;
		var methodName = "";
		switch (tempType){
			case "indexsilde"://首页 banner 轮播图
				methodName = "upSetIndextBannerSlideDate";
				break;
			case "indexright"://首页 右侧 轮播图
				methodName = "updateIndextBannerRightDate";
				break;
			case "indexmodal"://首页 模块新闻
				methodName = "upSetIndexModalShowData";
				break;
			case "secondlistmodal"://二级列表右侧模块
				methodName = "upSetSecondRightModalShowData";
				break;
			default :
			    methodName = false;
			    break;
		}
		if(methodName){
			Meteor.call(methodName,data,function(error,result){
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
		}else{
			alert(SYSTEM_ERROR);
		}
		return false;
	}

});
