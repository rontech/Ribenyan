
/*
* 获取用户信息
* param userID  "STRING"类型
* author ysj 
*/
getClientUserInfo = function(userID){
	console.log(userID);
 	var userInfo = Meteor.users.findOne({_id:userID});
 	console.log(userInfo);
 	return userInfo;
}