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
	return getImagePathByID(imageID);
});


/*
* 解析新闻图片，默认返回第一张，返回图片
* data:["imageid1","imageid2"]
* index: 获取序号
*/
UI.registerHelper("getImaegPathByObj",function(data){
	return getImaegPathByObj(data);
});

//当前登录用户
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

//是否登录
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
   $("#"+id).html(s);
}


/*
*获取用户名称
*param id 用户ID
*author ysj
*/
UI.registerHelper("getUserName",function(userID){
	var userInfo = Meteor.users.findOne({_id:userID});
	return userInfo.username;
});

/*
* 转换日期
*　param date type:ISODate("2016-03-07T00:56:14.370Z"),
* return XXXX-XX-XX
*/
UI.registerHelper("formartDate",function(date){
	return date.Format('yyyy-MM-dd');
});

/*
* 时间解析
*　比对当前时间－返回　*小时前　，１天前，２天前，日期
*param date 
*/
UI.registerHelper("analysisTime",function(date){
	return analysisTime(date);
});

/*
* 序列加1
*/
UI.registerHelper("indexAddOne",function(index){
	return index + 1;
});