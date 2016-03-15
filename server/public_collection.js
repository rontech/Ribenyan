
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
	return NewsCol.find(
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

//新闻详情
Meteor.publish("detailNews",function(newsID){
	return NewsCol.find({_id:new Meteor.Collection.ObjectID(newsID)});
});

Meteor.publish("layout",function(){
	return layout.find();
});

//导航信息
Meteor.publish("header",function(){
	return HeaderInfoCol.find({isVaild:1});
});

// 发布首页排版信息表
Meteor.publish("indexLayout",function(){
	return IndexLayoutCol.find({isVaild:1});
});

//发布图片信息表
Meteor.publish("ImageInfoCol",function(){
	return ImageInfoCol.find({});
});

//发布二级列表页面排版信息
Meteor.publish("SecondRightLayout",function(){
	return SecondRightLayout.find({isVaild:1},{sort:{showRule:1}});
});

//用户信息
Meteor.publish("user_info",function(){
	return UserInfo.find();
});

//新闻信息
Meteor.publish("bus_news_info",function(){
	return NewsInfo.find({isVaild:1});
});

//二级列表排版
Meteor.publish("bus_second_layout_data_info",function(){
	return SecondLayoutDataInfo.find();
});

//新闻整合评论表
// Meteor.publish("bus_news_evaluation_info",function(){
// 	return NewsEvaluationCol.find();
// });

//广告信息
Meteor.publish("bus_advertisement_info",function(){
	return AdInfo.find();
});

//类型信息
Meteor.publish("bus_type_info",function(){
	return TypeInfo.find();
});

//标签信息
Meteor.publish("bus_tag_info",function(){
	return TagInfo.find();
});

