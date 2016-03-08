
/*
* 获取用户信息
* param userID  "STRING"类型
* author ysj 
*/
getClientUserInfo = function(userID){
 	var userInfo = Meteor.users.findOne({_id:userID});
 	return userInfo;
}

//　验证是否存在用户
isHaveUserInfo = function(userID){
	var userList = Meteor.users.find({_id:userID});
	if (userList.count() > 0){
		return true;
	}else{
		return false;
	}
}

// 文章是否存在 false:不存在;存在:新闻信息obj
isHaveNewsInfo = function(id){
	var newsID = new Meteor.Collection.ObjectID(id);
	var NewsInfo = NewsCol.findOne({_id:newsID,isVaild:1});
	if(NewsInfo){
		return NewsInfo;
	}else{
		return false;
	}
}

//　文章评论是否存在　false:不存在;存在:评论信息obj
	isHaveEvaInfo = function(id){
	var evaID = new Meteor.Collection.ObjectID(id);
	var eavInfo = NewsEvaluationCol.findOne({_id:evaID,isVaild:1});
	if(eavInfo){
		return eavInfo;
	}else{
		return false;
	}
}