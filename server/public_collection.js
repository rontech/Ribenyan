
// 数据发布
Meteor.publish("severPublicName",function(authorParam){
	//前台传递参数检查
	check(authorParam,String);

	return Posts.find({author:authorParam});
});

Meteor.publish("News",function(){
	//新闻列表
	return News.find();
});