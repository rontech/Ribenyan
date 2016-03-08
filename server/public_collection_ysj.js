//新闻整合评论表
Meteor.publish("bus_news_evaluation_info",function(newsid){
	var newsID = new Mongo.Collection.ObjectID(newsid);
	return NewsEvaluationCol.find({isVaild:1,newsID:newsID});
});

//评论作者
Meteor.publish("userData",function(userID){
	return Meteor.users.find({_id:{$in:userID}}, {fields: {'username': 1}});
});