(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/public_collection.js                                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
// 数据发布                                                                //
Meteor.publish("severPublicName", function (authorParam) {             // 3
	//前台传递参数检查                                                            //
	check(authorParam, String);                                           // 5
                                                                       //
	return Posts.find({ author: authorParam });                           // 7
});                                                                    //
                                                                       //
//发布新闻列表                                                               //
Meteor.publish("News", function (typeID, sort, limit) {                // 11
	// check(typeID,String);                                              //
	// check(sort,Object);                                                //
	// check(limit,Number);                                               //
                                                                       //
	//新闻列表                                                                //
	return NewsCol.find({                                                 // 17
		isVaild: 1,                                                          // 19
		typeObj: {                                                           // 20
			$elemMatch: {                                                       // 21
				typeID: new Meteor.Collection.ObjectID(typeID)                     // 22
			}                                                                   //
		}                                                                    //
	}, {                                                                  //
		sort: sort, limit: limit                                             // 27
	});                                                                   //
});                                                                    //
                                                                       //
Meteor.publish("layout", function () {                                 // 32
	return layout.find();                                                 // 33
});                                                                    //
                                                                       //
//导航信息                                                                 //
Meteor.publish("header", function () {                                 // 37
	return HeaderInfoCol.find({ isVaild: 1 });                            // 38
});                                                                    //
                                                                       //
// 发布首页排版信息表                                                           //
Meteor.publish("indexLayout", function () {                            // 42
	return IndexLayoutCol.find({ isVaild: 1 });                           // 43
});                                                                    //
                                                                       //
//发布图片信息表                                                              //
Meteor.publish("ImageInfoCol", function () {                           // 47
	return ImageInfoCol.find({});                                         // 48
});                                                                    //
                                                                       //
//发布二级列表页面排版信息                                                         //
Meteor.publish("SecondRightLayout", function () {                      // 52
	return SecondRightLayout.find({ isVaild: 1 }, { sort: { showRule: 1 } });
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=public_collection.js.map
