(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/helper.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
* 定义模板中调用的共同方法                                                         //
*/                                                                     //
                                                                       //
// 注册共通方法                                                              //
UI.registerHelper("heplerRetParam", function (param) {                 // 6
	return param + "数据处理，返回变量";                                           // 7
});                                                                    //
                                                                       //
UI.registerHelper("heplerRetObj", function (param1, param2) {          // 10
                                                                       //
	var a = {                                                             // 12
		checkValue: "处理数据，返回对象" + param1,                                    // 13
		"class": "myClass anotherClass" + param2,                            // 14
		value: 123                                                           // 15
	};                                                                    //
                                                                       //
	return a;                                                             // 18
});                                                                    //
                                                                       //
//返回图片                                                                 //
UI.registerHelper("getImagePathByID", function (imageID) {             // 22
	var imageObj = ImageInfoCol.findOne({ _id: new Meteor.Collection.ObjectID(imageID) });
	if (imageObj) {                                                       // 24
		return imageObj.imagePath;                                           // 25
	} else {                                                              //
		return IMAGE_DEFAULT;                                                // 27
	}                                                                     //
});                                                                    //
                                                                       //
//解析排版信息，返回图片                                                          //
UI.registerHelper("getImaegByLayoutInfo", function (data) {            // 34
                                                                       //
	var imageID = "";                                                     // 36
	if (data.type == 2) {                                                 // 37
		//广告                                                                 //
		imageID = data.imageID._str;                                         // 38
	} else {                                                              //
		//广告                                                                 //
                                                                       //
		var aryImageObj = data.imageObj;                                     // 41
		for (var i = 0; i < aryImageObj.length; i++) {                       // 42
			if (aryImageObj[i].rule == 1) {                                     // 43
				imageID = aryImageObj[i].imageID._str;                             // 44
			}                                                                   //
		}                                                                    //
	}                                                                     //
                                                                       //
	var imageObj = ImageInfoCol.findOne({ _id: new Meteor.Collection.ObjectID(imageID) });
	if (imageObj) {                                                       // 50
		return imageObj.imagePath;                                           // 51
	} else {                                                              //
		return IMAGE_DEFAULT;                                                // 53
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=helper.js.map
