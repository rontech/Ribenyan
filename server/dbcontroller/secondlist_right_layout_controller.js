// 二级页面右侧模块信息处理

Meteor.methods({
	/*
	* 更新或插入模块信息
	*/ 
	"upSetSecondRightModalData" : function(data){
		// 更新ＩＤ
		var moretypeID = "";

		// 验证数据
		if(data.id == "add"){//增加
			//名称
			if(isHaveObjSecondListRightLayout("typeShowName",data.typeshowname)){
				var result = {
					"result" : false,
					"reason" : MODAL_NAME_IS_HAVE
				};
				return result;
			}
			//获取最后一位排序
			var lastInfo = SecondRightLayout.findOne({"isVaild":1},{sort:{"showRule":-1}});
			var sortNum = 1;
			if(lastInfo){
				sortNum = lastInfo.showRule + 1;
			}
			var insertData = {
						"containerTemplate" : data.tempname,
						"isShowMore" : "1",
						"typeID" : "1",
						"typeShowName" : data.typeshowname,
						"dataObj" : new Array(),
						"showRule" : sortNum,
						"isVaild" : 1
			}

			SecondRightLayout.insert(insertData);

		}else{//更新

			var updateID = new Meteor.Collection.ObjectID(data.id);	

			//名称
			if(isHaveObjSecondListRightLayout("typeShowName",data.typeshowname,data.id)){
				var result = {
					"result" : false,
					"reason" : MODAL_NAME_IS_HAVE
				};
				return result;
			}

			//更新数据
			SecondRightLayout.update(
								{
									"_id":updateID	
								},{ 
									$set:{
											"containerTemplate" : data.tempname,
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
	"upDownSecondRightModalData" : function(updateid,sort,type){
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
		var sortInfo = SecondRightLayout.findOne(findRule,{sort:sortRule}); 
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
		SecondRightLayout.update({
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
		SecondRightLayout.update({
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
	* 删除模板
	*/ 
	"deleteSecondRightModalData" : function(deleteID){
		var id = new Meteor.Collection.ObjectID(deleteID);

		// 删除模块；
		SecondRightLayout.remove(id);

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
	"upSetSecondRightModalShowData" : function(data){

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

			SecondRightLayout.update(
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
		    		"type" : 3,
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
			SecondRightLayout.update(
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
			    		"type" : 3,
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
	"deleteSecondRightModalShowData" :function(data){
		//解析数据
		var updateById = new Meteor.Collection.ObjectID(data.updateID);
		var deleteID   = new Meteor.Collection.ObjectID(data.dataID);

		var dataObj = IndexLayoutCol.findOne({"_id":updateById}).dataObj;

		var num = SecondRightLayout.update( 
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
	var checkData =  SecondRightLayout.find(
											{
												"isVaild" : 1,
												"dataObj" :
															{
																$elemMatch:{
																	"_id":id,
																	"siteType" : "1"
																	}
															}
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