/*
*  banner 添加 模板
*/
// 页面初始数据
Template.bannerAddCellMange.helpers({
	"index" :function(){//序号
		var boxObj = $("div.js-slidediv");
		var index = boxObj.children("div.cell-box").length;
		return index + ":";
	},
	"_id" : function(){//唯一ID
		var id = new Meteor.Collection.ObjectID();
		return id;
	}
});

// 点击事件
Template.bannerAddCellMange.events({
	"click div.js-cancel-save-box":function(e){
		$("div.js-add-banner-box").toggle();
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
	"click button.js-banner-update" : function(e){// banner 信息保存
		var eveObj = $(e.currentTarget);
		var boxObj = eveObj.parent().parent().parent();
		var boxID = boxObj.data().id;

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

		// 数据
		var data = {
						updateID:"add",
						type:type,
						siteType:siteType,
						title:title,
						introduce:introduce,
						link:link,
						newsID:newsID,
						evaID :evaID,
						imageID:"56c42bd6845339d6637d6e1b"
					};

		//提交修改
		Meteor.call("upSetIndextBannerSlideDate",data,function(error,result){
			if(error){
				alert(BANNER_ADD_ERROR);
			}else{
				
				// 清空数据
				$("div.js-add-banner-box").find("input[type=text]").val("");
				$("div.js-add-banner-box").find("input[type=hidden]").val("");

				//关闭添加窗口
				$("div.js-add-banner-box").toggle();

				if(result.result){
					alert("保存成功");
				}else{
					alert(result.reason);
				}
			}
		});

		return false;
	}
});