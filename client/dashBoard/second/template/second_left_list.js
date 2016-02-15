
Template.secondLeftList.helpers({
	newsList : function(){
		// 类型ＩＤ
		//　查询数据　－－　分页
		return getListDataNews();
	},
	nextPath:function(){
		var newsLimit = Template.currentData.newsLimit;
    	var hasMore = getListDataNews().count() === newsLimit;
    	var limit = newsLimit + 3;
    	var nextPath = "./" + Template.currentData().typeID + "/" + limit;
    	return hasMore ? nextPath : null;
	}

});

//查询数据
function getListDataNews(){
	var typeID = Template.currentData().typeID;
	var limit  =　Template.currentData.newsLimit;
	return News.find(
						{
							typeObj:{
								$elemMatch:{
									typeID: new Meteor.Collection.ObjectID(typeID)
								}
							}
						},
						{
							sort: {submitted: -1}, 
							limit: limit
						}
					);
}