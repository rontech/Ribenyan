Meteor.publish("test",function(author){
	return Posts.find();
	
});
Meteor.publish("News",function(){
	//新闻列表
	return News.find();
});