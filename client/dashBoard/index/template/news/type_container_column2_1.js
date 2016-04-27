// 新闻类型模块　平分　魔板

defaultNum = 2

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
			//是否显示标题
			if(i==0 || objInfo.isTitle){
				objInfo.isTitle = true;
				objInfo.typeShowName = this.typeShowName;
				objInfo.link = this.typeID;
			}else{
				objInfo.isTitle = false;
			}

			if(dataObj[i].showType == 0){//banner-新闻ｃａｒｄ
				if(newsInfo.length　!=0){
					//存储数据
					objInfo.data = newsInfo;
					listNews[listNews.length] = objInfo;

					//重置
					objInfo = {};
					newsInfo = [];	
				}
				newsInfo[0] = dataObj[i];
				objInfo.isBanner = true;
				listNews[listNews.length] = objInfo;
				
				//重置
				objInfo = {};
				newsInfo = [];
			}else{

				if(newsInfo.length==2){
					//存储数据
					objInfo.data = newsInfo;
					listNews[listNews.length] = objInfo;

					//重置
					objInfo = {};
					newsInfo = [];	
					
				}else{
					newsInfo[newsInfo.length] = dataObj[i];
				}

				objInfo.isBanner = false;
			}

			
		}
		if(newsInfo.length>0){
			objInfo.data = newsInfo;
			// 添加最后一条数据
			listNews[listNews.length] = objInfo;
		}
	
		console.log(listNews);

		return listNews;
	}
});


