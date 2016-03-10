// 查询数据并展示
Template.showData.helpers({
	dbData : function(){
		return Posts.find();
	}
});