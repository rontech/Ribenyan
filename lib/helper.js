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

//返回图片
UI.registerHelper("getImagePathByID",function(imageID){
	var imageObj = ImageInfoCol.findOne({_id:new Meteor.Collection.ObjectID(imageID)});
	if(imageObj){
		return imageObj.imagePath;	
	}else{
		return IMAGE_DEFAULT;
	}
	
});


//解析排版信息，返回图片
UI.registerHelper("getImaegByLayoutInfo",function(data){

	var imageID = "";
	if(data.type == 2){//广告
		imageID = data.imageID._str;
	}else{//广告
		
		var aryImageObj = data.imageObj;
		for(var i = 0;i<aryImageObj.length;i++){
			if(aryImageObj[i].rule == 1){
				imageID = aryImageObj[i].imageID._str;
			}
		}
	}

	var imageObj = ImageInfoCol.findOne({_id:new Meteor.Collection.ObjectID(imageID)});
	if(imageObj){
		return imageObj.imagePath;	
	}else{
		return IMAGE_DEFAULT;
	}

});

UI.registerHelper("currentUser",function(data){

	if(Meteor.user()){
		var userObj = Meteor.user();
		var currentUser = {
			"_id" : userObj._id,
			"name" : userObj.username
		};
		return currentUser;
	}else{
		return false;
	}
})