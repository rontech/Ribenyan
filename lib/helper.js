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
