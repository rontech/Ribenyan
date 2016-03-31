//广告嵌套新闻
var advNum = 2;

Template.secondLeftList.helpers({
	newsList : function(){
		// 类型ＩＤ
		//　查询数据　－－　分页
		return compositeData();
	},
	hasMore:function(){

    	var hasMore = getListDataNews().count() === Template.currentData().limit;
    	return hasMore;
	},
	newLimit:function(){
		return Template.currentData().limit + INCREMENT;
	}
});

//查询新闻数据
function getListDataNews(){
	return NewsCol.find(
						{
							typeObj:{
								$elemMatch:{
									typeID: new Meteor.Collection.ObjectID(Template.currentData().typeID)
								}
							}
						},
						{
							sort: {
									publishTime: -1
								}, 
							limit: Template.currentData().limit
						}
					);
}

//广告数据
function getListAdverInfo(){
	var typeID = new Meteor.Collection.ObjectID(Template.currentData().typeID)
	return SetingAdvInfo.find({
								"isVaild" : 1,
								"modalID" : typeID
							});
}

// 组合数据
function compositeData(){
	var newsInfo = getListDataNews().fetch();
	var advInfo = getListAdverInfo().fetch();

	if(!newsInfo){
		return advInfo;
	}
	if(!advInfo){
		return newsInfo;
	}

	var listInfo = new Array();
	var j = 0;
	//混合数据
	for(var i = 0;i < newsInfo.length;i++){
		listInfo.push(newsInfo[i]);
		
		if(((i+1)%advNum == 0 ) && (j<advInfo.length)){
			advInfo[j].isAdv = true; 
			listInfo.push(advInfo[j]);
			j++;
		}
	}
	console.log(listInfo);
	return listInfo;
}
