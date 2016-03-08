/*
* 评论处理
* author ysj
*/

Meteor.methods({
	/*
	*文章评论　evatype:1;
	* plData:{newsID:新闻ＩＤ，userID:评论用户ＩＤ，content:评论内容}
	*/
	"submitNewsEvaluation" : function(plData){
		//验证数据
		if(this.userId == plData.userID){
			var newsInfo = isHaveNewsInfo(plData.newsID);
			
			if(newsInfo){
				var insertObj = {
					"newsID":newsInfo._id,
		    		"isVaild":1,
		    		"userID":plData.userID,
		    		"content":plData.content,
		    		"fromType":"1",
		    		"evaType":"1",
		    		"creatDate": new Date(),
		    		"creater" : plData.userID
				};

				//存库	
				var evaID =	NewsEvaluationCol.insert(insertObj);

				if(evaID){
					var result = {
						"result":true
					}
				}else{
					var result = {
						"result":false,
						"reason" :PL_SUBMIT_ERROR
					}
				}
			}else{
				var result = {
					"result":false,
					"reason" :NEWS_NOT_EXIST
				}
			}
		}else{
			var result = {
				"result":false,
				"reason" :USER_INFO_ERROR
			};
		}
		//返回数据
		return result;
	},
	/*
	*评论的点评　evatype:２;　点评的回复　evatype:３;
	* data:{newsID:新闻ＩＤ，evaID:评论ＩＤ,userID:评论用户ＩＤ，content:内容，evatype:２/3，replyID:回复点评ｉｄ}
	*/
	"submitNewsDpOrReply" : function(data){
		// 数据校验

		if(this.userId == data.userID){//验证用户
			var evaInfo = isHaveEvaInfo(data.evaID); 
			
			if(evaInfo){//验证评论
				var newsInfo = isHaveNewsInfo(data.newsID);
				if(newsInfo){//验证文章
					// 数据整理

					var insertObj = {
						"newsID":newsInfo._id,
			    		"isVaild":1,
			    		"userID":data.userID,
			    		"evaluationID":evaInfo._id,
			    		"content":data.content,
			    		"fromType":"1",
			    		"creatDate": new Date(),
			    		"creater" : data.userID
					};

					if(data.evaType == "2"){//点评
						insertObj.evaType = "2";
					}else if(data.evaType == "3"){//回复
						var replyInfo = isHaveEvaInfo(data.replyID);
						insertObj.evaType = "3";
						insertObj.replyToContent = replyInfo.content;
						insertObj.replyToUserID = replyInfo.userID;
					}
					//存库	
					var evaID =	NewsEvaluationCol.insert(insertObj);

					if(evaID){
						var result = {
							"result":true
						};
					}else{
						var reason = "";
						if(data.evaType == "2"){//点评
							reason =　DP_SUBMIT_ERROR;
						}else if(data.evaType == "3"){
							reason = REP_SUBMIT_ERROR;
						}

						var result = {
							"result":false,
							"reason" : reason
						};
					}
				}else{
					var result = {
						"result":false,
						"reason" :NEWS_NOT_EXIST
					};
				}
			}else{
				var result = {
					"result":false,
					"reason" :DP_PL_NOT_EXIST
				};	
			}
			//存库
		}else{
			var result = {
				"result":false,
				"reason" :USER_INFO_ERROR
			};
		}

		return result;
	},
	/*
	* 评论　赞／踩
	* data:{evaID:评论ＩＤ，userID:用户ＩＤ，evaType:类型}
	*/
	"submitEvaParise" : function(data){
		var evaID = new Meteor.Collection.ObjectID(data.evaID);
		if(!isHaveUserInfo(data.userID)){//无此用户
			var result ={	
				result:false,
				reason:SYS_OPERATION_NEED_LOGIN
			};
			return result;
		}

		var evaInfo = isHaveEvaInfo(data.evaID);
		if(!evaInfo){//　评论不存在
			var result ={	
				result:false,
				reason:PRSISE_EVA_NOT_EXIST
			};
			return result; 
		}

		//检查用户是否点赞过
		var pariseList = NewsEvaluationCol.find({
												isVaild:1,
												evaluationID:evaInfo._id,
												userID:data.userID,
												evaType:{$in:["5","6"]}
											});
		if(pariseList.count() > 0 ){
			var result = {
				result:false,
				reason:OPERATION_HAS_SUBMIT,
			};
			return result;
		}else{
			//修改点赞数量	
			if(data.evaType == "5"){//　点赞
				NewsEvaluationCol.upsert({_id:evaInfo._id},
	    							　{$inc:{praise:1}},
	    							function(error,result){
		    		if(error){
		    			console.log("失败");
		    		}
	    		});

		    	var evalutionObj = {
		    		"newsID":evaInfo.newsID,
		    		"evaluationID":evaInfo._id,
		    		"isVaild":1,
		    		"userID":data.userID,
		    		"fromType":"1",
		    		"evaType":"5",//文章的点赞
		    		"creatDate": new Date(),
		    		"creater" : data.userID
		    	};
			}else if(data.evaType == "6"){　// 踩
				NewsEvaluationCol.upsert({_id:evaInfo._id},
	    							　{$inc:{noPraise:1}},
	    							function(error,result){
		    		if(error){
		    			console.log("失败");
		    		}
	    		});

		    	var evalutionObj = {
		    		"newsID":evaInfo.newsID,
		    		"evaluationID" :evaInfo._id,
		    		"isVaild":1,
		    		"userID":data.userID,
		    		"fromType":"1",
		    		"evaType":"6",//文章的点赞
		    		"creatDate": new Date(),
		    		"creater" : data.userID
		    	};
			}
	    	
	    	//添加评论表数据
	    	NewsEvaluationCol.insert(evalutionObj);
	    	var result = {
	    		"result" : true
	    	};
		}
		return result;
	}
});