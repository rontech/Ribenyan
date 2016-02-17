
// 数据发布
Meteor.publish("severPublicName",function(authorParam){
	//前台传递参数检查
	check(authorParam,String);

	return Posts.find({author:authorParam});
});

//发布新闻列表
Meteor.publish("News",function(typeID,sort,limit){
	// check(typeID,String);
	// check(sort,Object);
	// check(limit,Number);
	
	//新闻列表
	return News.find(
					{
						isVaild:1,
						typeObj:{
							$elemMatch:{
								typeID: new Meteor.Collection.ObjectID(typeID)
							}
						}
					},
					{
						sort: sort, limit: limit
					}
					);
});

Meteor.publish("layout",function(){
	return layout.find();
});

//导航信息
Meteor.publish("header",function(){
	return HeaderInfo.find({isVaild:1});
});

// 发布首页排版信息表
Meteor.publish("indexLayout",function(){
	return IndexLayout.find({isVaild:1});
});