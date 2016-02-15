
Template.secondLeftList.helpers({
	newsList : function(){
		// 类型ＩＤ
		//　查询数据　－－　分页
		return getListDataNews();
	},
	hasMore:function(){

    	var hasMore = getListDataNews().count() === Template.currentData().limit;
    	return hasMore;
	},
	newLimit:function(){
		return Template.currentData().limit + INCREMENT;
	}
});

//查询数据
function getListDataNews(){
	return News.find(
						{
							typeObj:{
								$elemMatch:{
									typeID: new Meteor.Collection.ObjectID(Template.currentData().typeID)
								}
							}
						},
						{
							sort: {
									submitted: -1
								}, 
							limit: Template.currentData().limit
						}
					);
}
