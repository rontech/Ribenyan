// 新闻类型模块　平分　模板

defaultNum = 2

Template.typeContainerColumn21.onCreated(function(){
	$("#nav li:first").addClass("on");
	$("#scroller li:first").addClass("on");
});

Template.typeContainerColumn21.onRendered(function(){
	$("#main .details h2").each(function(){
		var tmp = $(this).text().trim();
		if(tmp.indexOf("社会") >= 0 )
			$(this).parent().addClass("society");
		if(tmp.indexOf("金融") >= 0 )
			$(this).parent().addClass("financial");
		if(tmp.indexOf("人文") >= 0 )
			$(this).parent().addClass("culture");
	});
	//微信分享按钮event
	// $(".onWeChat").on('click', function() {
	// 	$(".js_qrcode_wrap.on").removeClass('on');
	// 	$(this).parents('.card').find(".js_qrcode_wrap").addClass('on');
	// 	$(this).parents('.content-info').find(".js_qrcode_wrap").addClass('on');
	// });
	$(".share-close").on('click', function() {
		$(this).parents(".js_qrcode_wrap.on").removeClass('on');
	});

});

Template.typeContainerColumn21.events({
  "click #top-like-icon" : function(e){//点赞
    if(!Meteor.user()){
      Modal.show('CommonModal', {title: '警告', message: SYS_OPERATION_NEED_LOGIN });
      return false;
    }
    var eventObj = $(e.currentTarget);
    // 是否已点过赞
    var isPraise = eventObj.data().click;
    var newsID = eventObj.data().newsid;
    if(isPraise){//点赞
      $(e.currentTarget).data("click",false);

      //提交点赞
      var praiseData = {
       "newsID" : newsID,
       "userID" : Meteor.userId()
      };

      //点赞动画
      var aniObj = $(e.currentTarget).children("div");
      aniObj.animate({"margin-top": "0px","opacity":"1"}, "slow");
      aniObj.animate({"opacity":"0"}, "fast");

      Meteor.call("newsPraise",praiseData,function(error,result){
        if(error){//点赞失败
          console.log("点赞失败");
          Modal.show('CommonModal', { title: '警告', message: PRAISE_SUBMIT_ERROR });
        }else{
          if(!result.result){//成功
            Modal.show('CommonModal', { title: '警告', message: result.reason });
          }
        }
      });
    }else{
      Modal.show('CommonModal', { title: '警告', message: PRAISE_HAS_SUBMIT });
    }
  },
  "click a.js-wechatshare" : function(e){
  	if(Meteor.isCordova){
  		var url = Meteor.absoluteUrl() + this._id._str;
  		alert(url);
  		Wechat.share({
        	message: {
         		title: this.title,
         		media: {
		            type: Wechat.Type.WEBPAGE,
		            webpageUrl: url
		        }
       	    },
       	    scene: Wechat.Scene.TIMELINE,   // share to Timeline,
    	}, function () {
	     //alert("Success");
	     alert("分享成功");
	    }, function (reason) {
	     alert("分享失败");
	    });

	}else{
		console.log("click mobile");
		$(".js_qrcode_wrap.on").removeClass('on');
		$(this).parents('.card').find(".js_qrcode_wrap").addClass('on');
		$(this).parents('.content-info').find(".js_qrcode_wrap").addClass('on');
  	}
  }
});

Template.qrCode.onRendered(function(){
	//二维码生成
	var qrCode=$((this).find(".js_share_qrcode"));
	var www = "http://www.ribenyan.net"+$((this).find("input")).val();
	qrCode.each(function(){
			$(this).qrcode({
				render	: "canvas",//也可以替换为table
				width   : 130,
				height  : 130,
				text	: www
			});
		});

	//截取introduce长度
	$(".card .info p").each(function(){
		if(($(this).text().length)>40) {
			var tmp = $(this).text().substring(0, 40) + "...";
		}
		$(this).text(tmp);
	});
});

Template.typeContainerColumn21.helpers({
	"praiseNum" : function(){
		if(this.praise){
			return this.praise;
		}else{
			return 0;
		}
	},
	"discussNum" : function(){
		var plList = NewsEvaluationCol.find(
			{
				newsID:this._id,
				evaType:"1"
			},
			{
				sort:{creatDate:-1}
			}
		);
		if(plList){
			return plList.count();
		}else{
			return 0;
		}

	},
	"discussUrl" :function(){
		var url = "";
		if(isMobileDisplay()){
			url = "/mobile/news/discuss/" + this._id._str + "/1";
		}else{
			url = "/news/detail/" + this._id._str;
		}
		return url;
	},
	listNews : function(){
		/*
		* 结构　：　【｛
					isTitle : true//显示标题结构
					typeShowName : 标题;
					link : 类型ＩＤ；／／
					isBanner : true //单独新闻Ｃａｒｄ

					data :[]//数组
				｝】
		*/

		//解析默认数据
		var dataObj = this.dataObj;
		var listNews = [];
		var num = defaultNum - dataObj.length;
		// 首页以存在新闻ＩＤ
		var arrayID = [];
		for (var i = 0;i<dataObj.length;i++){
			arrayID[i] = dataObj[i]._id;
		}

		if (num > 0){
			//查询填充数据 （去除不存在新闻）
			fillData = NewsCol.find(
								{
									typeObj:{
											$elemMatch:{
												typeID: new Meteor.Collection.ObjectID(this.typeID._str)
											}
										},
									_id : {
										$nin:arrayID
									}

								},
								{
									sort:{
											publishTime: -1
										},
									limit:num
								}
								);
			//合并数据
			dataObj = dataObj.concat(fillData.fetch());
		}

		// 首页以存在新闻ＩＤ
		var arrayID = [];

		var objInfo = {};
		var newsInfo = [];
		for (var i = 0;i<dataObj.length;i++){

			var info = dataObj[i];

			// 修改图片
			info.imageID = modifyImage(info);

			//是否显示标题
			if(listNews.length == 0){
				objInfo.isTitle = true;
				objInfo.typeShowName = this.typeShowName;
				objInfo.link = this.typeID;
				if(this.isShowMore == "1"){
					objInfo.isShowMore = true;
				}else{
					objInfo.isShowMore = false;
				}
			}else{
				objInfo.isTitle = false;
			}

			if(info.showType == "0"){//banner-新闻ｃａｒｄ
				if(newsInfo.length　!=0){
					//存储数据
					objInfo.data = newsInfo;
					listNews[listNews.length] = objInfo;

					//重置
					objInfo = {};
					newsInfo = [];
				}
				newsInfo[newsInfo.length] = info;
				objInfo.data = newsInfo;
				objInfo.isBanner = true;
				listNews[listNews.length] = objInfo;

				//重置
				objInfo = {};
				newsInfo = [];
			}else{
				newsInfo[newsInfo.length] = info;
				if(newsInfo.length==2){
					//存储数据
					objInfo.data = newsInfo;
					listNews[listNews.length] = objInfo;
					//重置
					objInfo = {};
					newsInfo = [];
				}

				objInfo.isBanner = false;
			}


		}
		if(newsInfo.length>0){
			objInfo.data = newsInfo;
			// 添加最后一条数据
			listNews[listNews.length] = objInfo;
		}

		return listNews;
	}
});

// 筛选图片
function modifyImage(info){

	var imageID = "";

	if(info.imageObj){
		imageID = info.imageObj[0];
	}else{
		imageID = info.imageID;
	}
	return imageID;
}

