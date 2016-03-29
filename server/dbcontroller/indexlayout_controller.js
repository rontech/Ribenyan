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
		var imageID = data.imageID;

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
			if(data.siteType == "2" && data.type =="1"){
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

		    //判断是否是广告插入信息
		    if(data.type == "2"){
		    	var advInfo = {
		    		"type" : 1,
		    		"advID" : id,
		    		"modalID" : updateById,
		    		"dataObjID" : id,
		    		"isVaild" : 1,
		    	};
		    	//投放信息表插入
		    	SetingAdvInfo.insert(advInfo);

		    }

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
			//判断广告是否更新
			if(data.type == "2"){
				if(!oldID.equals(id)){// 更新
					//1.删除
					SetingAdvInfo.remove({"advID":oldID,"modalID":updateById,"dataObjID":oldID});

					//2.添加
					var advInfo = {
			    		"type" : 1,
			    		"advID" : id,
			    		"modalID" : updateById,
			    		"dataObjID" : id,
			    		"isVaild" : 1,
		    		}; 

					SetingAdvInfo.insert(advInfo);
				}
			}
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
		// 删除对象信息
		var deleteInfo = "";
		for(var i=0;i<slideData.length;i++){
			if(deleteID.equals(slideData[i]._id)){
				deleteInfo = slideData[i];
				break;
			}
		}
		
		// 判断是否是广告
		if(deleteInfo.type == "2"){//广告
			SetingAdvInfo.remove({"advID":deleteID,"modalID":updateById,"dataObjID":deleteID});
		}

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
		var imageID =data.imageID;

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
			//判断广告是否更新
			if(data.type == "2"){
				if(!oldID.equals(id)){// 更新
					//1.删除
					SetingAdvInfo.remove({"advID":oldID,"modalID":updateById,"dataObjID":oldID});

					//2.添加
					var advInfo = {
			    		"type" : 1,
			    		"advID" : id,
			    		"modalID" : updateById,
			    		"dataObjID" : id,
			    		"isVaild" : 1,
		    		}; 

					SetingAdvInfo.insert(advInfo);
				}
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
	* 更新或插入模块排版基本信息
	*/
	"upSetIndexModalDate" : function(data){
		// 更新ＩＤ
		
		var moretypeID = "";
		// 验证数据

		if(data.id == "add"){//增加
			//名称
			if(isHaveObjIndexLayout("typeShowName",data.typeshowname)){
				var result = {
					"result" : false,
					"reason" : MODAL_NAME_IS_HAVE
				};
				return result;
			}

			//更多类型
			if(data.isshowmore == "1"){
				
				moretypeID = new Meteor.Collection.ObjectID(data.moretype);

				if(isHaveObjIndexLayout("typeID",data.moretype)){
					var result = {
						"result" : false,
						"reason" : MODAL_TYPE_IS_HAVE
					};
					return result;
				}
			}

			//获取最后一位排序
			var lastInfo = IndexLayoutCol.findOne({"isVaild":1},{sort:{"showRule":-1}});
			var sortNum = 1;
			if(lastInfo){
				sortNum = lastInfo.showRule + 1;
			}

			var insertData = {
						"containerTemplate" : data.tempname,
						"isShowMore" : data.isshowmore,
						"typeID" : moretypeID,
						"typeShowName" : data.typeshowname,
						"dataObj" : new Array(),
						"showRule" : sortNum,
						"showType" : 2,
						"isVaild" : 1
			}
			IndexLayoutCol.insert(insertData);

		}else{//更新

			var updateID = new Meteor.Collection.ObjectID(data.id);	

			//名称
			if(isHaveObjIndexLayout("typeShowName",data.typeshowname,data.id)){
				var result = {
					"result" : false,
					"reason" : MODAL_NAME_IS_HAVE
				};
				return result;
			}

			//更多类型
			if(data.isshowmore == "1"){
				
				moretypeID = new Meteor.Collection.ObjectID(data.moretype);

				if(isHaveObjIndexLayout("typeID",data.moretype,data.id)){
					var result = {
						"result" : false,
						"reason" : MODAL_TYPE_IS_HAVE
					};
					return result;
				}
			}

			//更新数据
			IndexLayoutCol.update(
								{
									"_id":updateID	
								},{ 
									$set:{
											"containerTemplate" : data.tempname,
											"isShowMore" : data.isshowmore,
											"typeID" : moretypeID,
											"typeShowName" : data.typeshowname
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
	},
	/*
	* 排序
	* updateid : 更新对象
	* sort : 当前排位
	* type : 1:上升；0：下降
	*/ 
	"upDownIndexModalData" : function(updateid,sort,type){
		sort = parseInt(sort);
		var sortRule = "";
		var findRule = "";
		var reason = "";
		if(type == 1){
			findRule = {
						"isVaild" : 1,
						"showRule"  : {
							$lt : sort
							}
					};
			sortRule = {
				"showRule" : -1
			};
			reason = SORT_IS_FIRST;
		}else if(type == 0){
			findRule = {
						"isVaild" : 1,
						"showRule" : {
							$gt : sort
						}
					};
			sortRule = {
				"showRule" : 1
			};
			reason = SORT_IS_LAST;
		}

		var sortInfo = IndexLayoutCol.findOne(findRule,{sort:sortRule}); 
		// 验证数据
		if(!sortInfo){
			var result = {
				"result" : false,
				"reason" : reason
			};
			return result;
		}
	
		var updateID = new Meteor.Collection.ObjectID(updateid);
		//更新
		IndexLayoutCol.update({
									"_id":updateID
								},{
									$set :{
										"showRule" : sortInfo.showRule
									}
								},function(error,result){
									if(error){
										console.log("更新失败");
									}else{
										
									}
								}
		);

		//更新附近ID
		IndexLayoutCol.update({
									"_id":sortInfo._id
								 },{
								 	$set :{
								 		"showRule" : sort
								 	}
								 }
		);
		
		var result = {
			"result" : true
		};

		return result;
	},
	/*
	* 删除模块排版基本信息
	*/
	"deleteIndexModalDate" : function(deleteID){

		var id = new Meteor.Collection.ObjectID(deleteID);
		// 模板信息
		// var modalInfo = IndexLayoutCol.findOne({"_id":id});
		
		// 删除模板信息
		IndexLayoutCol.remove(id);

		// 删除广告投放信息
		SetingAdvInfo.remove({"type":1,"modalID":id});

		var result = {
			"result" : true
		};
 		return result;  
	},
	/*
	* 更新模块排版显示信息
	*/
	"upSetIndexModalShowData" : function(data){

		// 更新ID
		var updateID = new Meteor.Collection.ObjectID(data.updateID); 
		// 内嵌表ID
		var id = "";
		if(data.type == "1"){
			id = new Meteor.Collection.ObjectID(data.newsID);
		}else if(data.type == "2"){
			id = new Meteor.Collection.ObjectID(data.evaID);
		}

		if(data.siteType == "2"){//站外
			id = new Meteor.Collection.ObjectID();
		}

		// 检查在首页此新闻是否存在
		if(data.dataID != id._str && data.siteType == "1" ){
			if(checkNewISSetting(id,1)){
				var result = {
					"result" : false,
					"reason" : NEWS_IN_INDEX_HASE_SETING
				}
				return result;
			}
		}
		
		if(data.dataID == "add"){//增加
			var newdata = {
				_id:id,
				type:data.type,
				siteType:data.siteType,
				title:data.title,
				introduce:data.introduce,
				link:data.link,
				imageID: data.imageID,
				sort:0
			};

			IndexLayoutCol.update(
								{
									"_id":updateID
								},
							    {
							    	$addToSet:{
							    			"dataObj":newdata
							    		}
							    }
			);

			//判断广告是否更新
			if(data.type == "2"){

				//.添加
				var advInfo = {
		    		"type" : 1,
		    		"advID" : id,
		    		"modalID" : updateID,
		    		"dataObjID" : id,
		    		"isVaild" : 1,
	    		}; 

				SetingAdvInfo.insert(advInfo);
			}

		}else{//更新
			var dataID = new Meteor.Collection.ObjectID(data.dataID);
			//更新数据
			IndexLayoutCol.update(
								{
									"_id" : updateID,
									"dataObj" : {
										$elemMatch :{
											"_id" : dataID
										}
									}
								},
								{
									$set : {
										"dataObj.$._id" : id,
										"dataObj.$.type":data.type,
										"dataObj.$.siteType":data.siteType,
										"dataObj.$.title":data.title,
										"dataObj.$.introduce":data.introduce,
										"dataObj.$.link":data.link,
										"dataObj.$.imageID": data.imageID,
										"dataObj.$.sort":0
									}
								}
			);

			//判断广告是否更新
			if(data.type == "2"){
				if(!dataID.equals(id)){// 更新
					//1.删除
					SetingAdvInfo.remove({"advID":dataID,"modalID":updateID,"dataObjID":dataID});

					//2.添加
					var advInfo = {
			    		"type" : 1,
			    		"advID" : id,
			    		"modalID" : updateID,
			    		"dataObjID" : id,
			    		"isVaild" : 1,
		    		}; 

					SetingAdvInfo.insert(advInfo);
				}
			}

		}

		var result = {
			"result" : true
		};
		return result;
	},
	/*
	* 删除模块排版显示信息
	*/
	"deleteIndexModalShowData" :function(data){

		//解析数据
		var updateById = new Meteor.Collection.ObjectID(data.updateID);
		var deleteID   = new Meteor.Collection.ObjectID(data.dataID);

		var dataObj = IndexLayoutCol.findOne({"_id":updateById}).dataObj;

		var num = IndexLayoutCol.update( 
								{
									"_id":updateById
							   	},
							   	{
							   		$pull :{"dataObj":{"_id":deleteID}}
							   	},function(error,result){

							   	}
							);

		// 删除对象信息
		var deleteInfo = "";
		for(var i=0;i<dataObj.length;i++){
			if(deleteID.equals(dataObj[i]._id)){
				deleteInfo = dataObj[i];
				break;
			}
		}
		
		// 判断是否是广告
		if(deleteInfo.type == "2"){//广告
			SetingAdvInfo.remove({"advID":deleteID,"modalID":updateById,"dataObjID":deleteID});
		}

		// 技术遗留
		var result = {
			"result" : true
		};
 		return result;
	},
});


/*
* 检测新闻或广告是否被设置
* id : 唯一标示
* type : 1 : insert ; 2 : update
*/
function checkNewISSetting(id,type){

	var checkData =  IndexLayoutCol.find(
											{
												"isVaild" : 1,
												$or:
													[
														{
															"dataObj" :
																		{
																			$elemMatch:{
																				"_id":id,
																				"siteType" : "1"
																				}
																		}
														},
														{
															"dataObj.slideData" :
																		{
																			$elemMatch:{
																				"_id":id,
																				"siteType" : "1"
																				}
																		}
														},
														{
															"dataObj.rightData" :
																		{
																			$elemMatch:{
																				"_id":id,
																				"siteType" : "1"
																				}
																		}
														},
													]
												
											}
										);
	if(type == 1){
		if(checkData.count() > 0){
			return true;
		}else{
			return false;
		}
	}else{
		if(checkData.coutn() > 1){
			return true;
		}else{
			return false;
		}
	}	
}