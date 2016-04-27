//广告嵌套新闻
var advNum = 2;

Template.secondLeftList.onRendered(function(){
	console.log(Template.currentData());
	var id = new Meteor.Collection.ObjectID(Template.currentData().typeID);

	var typeName = TypeInfo.findOne({"_id":id}).name;
	var title = typeName　+ "-" + SYS_APP_NAME;

	// 网页标题　类型＋网站名称
	document.title = title  ;

	// var url = location.href;
	// if(url.indexOf("second/") > 0 ) {
	// 	url = url.split("second/");
	// 	//console.log(url[1]);
	// 	var tmp = HeaderInfoCol.find({typeID:new Meteor.Collection.ObjectID(url[1])}).fetch();
	// 	//console.log(tmp[0].showName);
	// 	//console.log($(".header .content .respBox #nav li ").text());
	// 	$(".header .content .respBox #nav li ").each(function(){
	// 		// console.log($(this).text());
	// 		if($(this).text().toString() == tmp[0].showName.){
	// 			console.log($(this).text());
	// 			$(this).addClass("on");
	// 			return;
	// 		}
	// 	});
	// }else if(url.indexOf("news/detail/") > 0){
	// 	url = url.split("news/detail/");
	// 	console.log(url[1]);
	// }
});

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
