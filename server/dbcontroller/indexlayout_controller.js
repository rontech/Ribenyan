/*
* 首页排板
*/

Meteor.methods({
	/*
	*更新或插入首页banner轮播图排版信息
	*/
	"upSetIndextBannerSlideDate" : function(data){
		var num = 0;
		var bannerInfo = IndexLayoutCol.findOne({"showType":1,"isVaild":1});
		var updateById = bannerInfo._id;
		/******解析数据******/
		var id = "";

		if(data.type == "1"){
			id = new Meteor.Collection.ObjectID(data.newsID);
		}else if(data.type == "2"){
			id = new Meteor.Collection.ObjectID(data.evaID);
		}
		//图片ID
		var imageID = new Meteor.Collection.ObjectID(data.imageID);

		if(data.updateID != data.newsID && data.siteType == "1"){
			//检查内容是否存在
			var checkObj = IndexLayoutCol.find(
										{
											"_id":updateById,
											"dataObj.slideData":{
												$elemMatch:{
													"_id":id,
													"type":data.type
												}
											}	
										}
									);

			if(checkObj.count()> 0){
				var result = {
					"result" : false,
					"reason" : BANNER_INFO_ISSETTING
				};
				return result;
			} 
		}

		// 判断更新或者插入
		if(data.updateID == "add"){//插入
			//如果是站外的链接，重新生成ID
			if(data.siteType == "2"){
				id = new Meteor.Collection.ObjectID();
			}
			//验证数据
			var newdata = {
				_id:id,
				type:data.type,
				siteType:data.siteType,
				title:data.title,
				introduce:data.introduce,
				link:data.link,
				imageID: imageID,
				sort:0
			}; 
			//更新数据库
		    num = IndexLayoutCol.update(
								{"_id":updateById},
							    {$addToSet:{"dataObj.slideData":newdata}},
							    function(error,result){
							    	if(error){
										var result ={
											"result" : false,
											"reason" : BANNER_INFO_ISSETTING
										};
										return result;
									}else{
										var result ={
											"result" : true
										};
										return result;
									}
								}
							);
		}else{//更新
			var oldID = new Meteor.Collection.ObjectID(data.updateID);
			num = IndexLayoutCol.update(
							{
								"_id":updateById,
								"dataObj.slideData":{
									$elemMatch:{
										"_id":oldID
									}
								}	
							},{ 
								$set:{
										"dataObj.slideData.$._id":id,
										"dataObj.slideData.$.type":data.type,
										"dataObj.slideData.$.siteType":data.siteType,
										"dataObj.slideData.$.title":data.title,
										"dataObj.slideData.$.introduce":data.introduce,
										"dataObj.slideData.$.link":data.link,
										"dataObj.slideData.$.imageID": imageID,
										"dataObj.slideData.$.sort":0
									}
							},function(error,result){
								if(error){
									var result ={
										"result" : false,
										"reason" : BANNER_INFO_ISSETTING
									};
									return result;
								}else{
									var result ={
										"result" : true
									};
									return result;
								}
							}
						);

		}
		if(num > 0){
			var result ={
				"result" : true
			};
			return result;
		}else{
			var result ={
				"result" : true,
				"reason" : BANNER_INFO_ISSETTING
			};
			return result;
		}
	},
	/*
	* 删除轮播图信息
	*/
	"deleteIndexBannerSlideDate" : function(data){
		var bannerInfo = IndexLayoutCol.findOne({"showType":1,"isVaild":1});
		var updateById = bannerInfo._id;
		var slideData = bannerInfo.dataObj.slideData;
		//检索是否能够继续删除
		if(slideData.length == 1){
			var result = {
				"result" : false,
				"reason" : BANNER_DELETE_LAST_ONE
			};
			return result;
		}
		//解析数据
		var deleteID = new Meteor.Collection.ObjectID(data);

		var num = IndexLayoutCol.update( 
								{
									"_id":updateById
							   	},
							   	{
							   		$pull :{"dataObj.slideData":{"_id":deleteID}}
							   	},function(error,result){

							   	}
							);
		// 技术遗留
		var result = {
			"result" : true
		};
 		return result;
	},
	/*
	*更新banner右侧排版信息
	*/
	"updateIndextBannerRightDate" : function(data){
		var num = 0;
		var bannerInfo = IndexLayoutCol.findOne({"showType":1,"isVaild":1});
		var updateById = bannerInfo._id;
		/******解析数据******/
		var id = "";

		if(data.type == "1"){
			id = new Meteor.Collection.ObjectID(data.newsID);
		}else if(data.type == "2"){
			id = new Meteor.Collection.ObjectID(data.evaID);
		}
		//图片ID
		var imageID = new Meteor.Collection.ObjectID(data.imageID);

		if(data.updateID != data.newsID && data.siteType == "1"){
			//检查内容是否存在
			var checkObj = IndexLayoutCol.find(
										{
											"_id":updateById,
											"dataObj.rightData":{
												$elemMatch:{
													"_id":id,
													"type":data.type
												}
											}	
										}
									);

			if(checkObj.count()> 0){
				var result = {
					"result" : false,
					"reason" : BANNER_INFO_ISSETTING
				};
				return result;
			} 
		}
		
		//更新
			var oldID = new Meteor.Collection.ObjectID(data.updateID);
			num = IndexLayoutCol.update(
							{
								"_id":updateById,
								"dataObj.rightData":{
									$elemMatch:{
										"_id":oldID
									}
								}	
							},{ 
								$set:{
										"dataObj.rightData.$._id":id,
										"dataObj.rightData.$.type":data.type,
										"dataObj.rightData.$.siteType":data.siteType,
										"dataObj.rightData.$.title":data.title,
										"dataObj.rightData.$.introduce":data.introduce,
										"dataObj.rightData.$.link":data.link,
										"dataObj.rightData.$.imageID": imageID,
										"dataObj.rightData.$.sort":0
									}
							},function(error,result){
								if(error){
									var result ={
										"result" : false,
										"reason" : BANNER_INFO_ISSETTING
									};
									return result;
								}else{
									var result ={
										"result" : true
									};
									return result;
								}
							}
						);

		
		if(num > 0){
			var result ={
				"result" : true
			};
			return result;
		}else{
			var result ={
				"result" : true,
				"reason" : BANNER_INFO_ISSETTING
			};
			return result;
		}
	},

});