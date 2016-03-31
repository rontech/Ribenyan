Template.sysTypeListSelectOption.created = function() {
    ckPerms('ctrlperms');
}
Template.sysTypeListSelectOption.helpers({
	"typeList" : function(){
		var listData = TypeInfo.find({"isVaild":1});
		return listData;
	},
	"isSelectd" : function(id){
		var selectID = Template.parentData(1).selectval;
		if(!selectID){
			return "";
		}
		if(id == selectID){
			return "selected";
		}else{
			return "";
		}
	}
	
});