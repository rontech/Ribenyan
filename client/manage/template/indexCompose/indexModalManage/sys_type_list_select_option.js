Template.sysTypeListSelectOption.helpers({
	"typeList" : function(){
		var listData = TypeInfo.find({"isVaild":1});
		console.log(Template.currentData().selectval);
		return listData;
	},
	"isSelectd" : function(id){
		if(id = Template.currentData().selectval){
			return "selected";
		}else{
			return "";
		}
	}
});