// 后台管理工具方法

/*
* 首页　模板　字段排它
*/ 
isHaveObjIndexLayout = function(paramname,value,id){
	var checkid = "";
	var listinfo = "";
	if(id){
		checkid = new Meteor.Collection.ObjectID(id);
		listinfo = IndexLayoutCol.find({"isVaild":1,paramname:value,"_id":{$ne:id}});
	}else{
		listinfo = IndexLayoutCol.find({"isVaild":1,paramname:value});
	}
	if(listinfo.count() > 0){
		return true;
	}else{
		return false;
	}
}