
Template.secondLeftList.helpers({
	newsList : function(){
		// 类型ＩＤ

		//　查询数据　－－　分页
		return getListDataNews();
	}
});

function getListDataNews(){

	var typeID = Template.currentData().typeID;

	return News.find({type_id:typeID});
}