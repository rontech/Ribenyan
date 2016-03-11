/*
* 首页排板
*/

Meteor.methods({
	/*
	*更新或插入首页banner排版信息
	*/
	"upSetIndextBanner" : function(data){
		console.log(data);
		/******解析数据******/
		var id = "";
		if(data.type == "1"){
			id = new Meteor.Collection.ObjectID(data.newsID);
		}else if(data.type == "2"){
			id = new Meteor.Collection.ObjectID(data.evaID);
		}
		var imageID = new Meteor.Collection.ObjectID(data.imageID);

		if(data.updateID != data.newsID && data.siteType == "2"){
			//检查内容是否存在
			var checkObj = IndexLayoutCol.find(
										{
											"showType":1,
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
			IndexLayoutCol.update(
								{showType:1},
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
			var oldID = new Meter.Collection.ObjectID(data.updateID);
			IndexLayoutCol.update(
							{
								"showType":1,
								"dataObj.slideData":{
									$elemMatch:{
										"_id":oldID,
										"type":data.type
									}
								}	
							},{ 
								$set:{
										"dataObj.slideData.$._id":id,
										"dataObj.slideData.$.type":data.type,
										"dataObj.slideData.$.siteType":data.siteType,
										"dataObj.slideData.$.title":data.title,
										"dataObj.slideData.$.introduce":data.introduce,
										"dataObj.slideData.$.link:data".link,
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
			var result ={
					"result" : true
				};
			return result;
	}
});