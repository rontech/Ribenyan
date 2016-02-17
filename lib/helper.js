/*
* 定义模板中调用的共同方法
*/

// 注册共通方法
UI.registerHelper("heplerRetParam",function(param){
 	return param + "数据处理，返回变量";
});

UI.registerHelper("heplerRetObj",function(param1,param2){

	var a = {
		checkValue: "处理数据，返回对象" + param1,
  		class: "myClass anotherClass" + param2,
  		value: 123
  	}

  	return a;
});

//返回图片对象
UI.registerHelper("getImagObjByID",function(imageID){
	return ImageInfoCol.find({_id:Meteor.Collection.ObjectID(imageID)});
});
