// 后台管理工具方法

/*
* 首页　模板　字段排它
*/ 
isHaveObjIndexLayout　= function(type,value,id){
	var checkid = "";
	if(id){
		checkid = new Meteor.Collection.ObjectID(id);
	}
	var listinfo = IndexLayoutCol.find({"isVaild":1,type:value,"_id":checkid});
	if(listinfo.count() > 0){
		return true;
	}else{
		return false;
	}
}