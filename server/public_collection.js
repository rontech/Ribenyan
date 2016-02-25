
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