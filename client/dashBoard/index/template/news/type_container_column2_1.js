// 新闻类型模块　平分　魔板

defaultNum = 2

Template.typeContainerColumn21.onCreated(function(){
	$("#nav li:first").addClass("on");

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
});

Template.typeContainerColumn21.helpers({
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

