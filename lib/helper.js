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

//日期显示格式化
Date.prototype.Format = function(fmt)
{
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

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

UI.registerHelper("currentUser",function(){

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
});

UI.registerHelper("isLogin",function(){
	if(Meteor.user()){
		return true;
	}else{
		return false;
	}
});

unhtml = function(id){
   var inter = $("#"+id);
   var str = inter.html();
   var s = "";
   
   s = str.replace(/&lt;/g, "<");
   s = s.replace(/&gt;/g, ">");
   // s = s.replace(/&#39;/g, "\'");
   // s = s.replace(/&quot;/g, "\"");
   // s = s.replace(/<br>/g, "\n");
    s = s.replace(/&amp;/g, "&");
   console.log(str);
   $("#"+id).html(s);
}


