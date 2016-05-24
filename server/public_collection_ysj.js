//新闻整合评论表
Meteor.publish("bus_news_evaluation_info",function(newsid){
	var newsID = new Mongo.Collection.ObjectID(newsid);
	return NewsEvaluationCol.find({isVaild:1,newsID:newsID});
});
Meteor.publish("bus_news_evaluation_info1",function(){
	return NewsEvaluationCol.find({isVaild:1});
});

//评论作者
Meteor.publish("userData",function(userID){
	return Meteor.users.find({_id:{$in:userID}}, {fields: {'username': 1}});
});

//广告投放信息
Meteor.publish("SetingAdvInfo",function(){
	return SetingAdvInfo.find();
});

//文章作者名
Meteor.publish("articleUserName",function(){
	return Meteor.users.find();
});
