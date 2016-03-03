/*
* 新闻数据处理
*/

Meteor.methods({
  newsPraise: function(praiseObj) {//点赞　处理
  	console.log("执行点赞，数据库更新");
  	// 新闻ＩＤ
  	var newsID = new Meteor.Collection.ObjectID(praiseObj.newsID);


    //检查用户是否点赞过
    var newsEvaObj = NewsEvaluationCol.find({"newsID":newsID,"userID":praiseObj.userID,evaType:"3"});
    if(newsEvaObj.fetch().length>0){
    	var result = {
    		"result":false,
    		"reason": PRAISE_HAS_SUBMIT
    	};
    	return result;
    }else{
    	//修改点赞数量	
    	NewsCol.update({_id:newsID},{$inc:{praise:1}},function(error,result){
    		if(error){
    			console.log("失败");
    		}
    	});

    	var evalutionObj = {
    		"newsID":newsID,
    		"isVaild":1,
    		"userID":praiseObj.userID,
    		"fromType":"1",
    		"evaType":"3",
    		"creatDate": new Date(),
    		"creater" : praiseObj.userID
    	}

    	//添加评论表数据
    	NewsEvaluationCol.insert(evalutionObj);

    	var result = {
    		"result" : true
    	};

    	return result;
    }
  }
});