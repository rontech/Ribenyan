//广告嵌套新闻
var advNum = 2;

Template.secondLeftList.onRendered(function(){
	console.log(Template.currentData());
	var id = new Meteor.Collection.ObjectID(Template.currentData().typeID);

	var typeName = TypeInfo.findOne({"_id":id}).name;
	var title = typeName　+ "-" + SYS_APP_NAME;

	// 网页标题　类型＋网站名称
	document.title = title  ;

});

Template.secondLeftList.onCreated(function(){
	//导航高亮显示
	var url = location.href;
	if(url.indexOf("/index") > 0 ){
		$(".header .content .respBox .menu li").removeClass("on");
		$(".header .content .respBox #nav li:first").addClass("on");
	}else  if(url.indexOf("second/") > 0 ) {
		url = url.split("/");
		var tmp = HeaderInfoCol.find({typeID:new Meteor.Collection.ObjectID(url[4])}).fetch();
		$(".header .content .respBox #nav li ").each(function(){
			if($(this).text().trim() == tmp[0].showName.trim()){
				$(this).addClass("on");
			}else {
				$(this).removeClass("on");
			}
		});
	}else if(url.indexOf("news/detail/") > 0){
		url = url.split("/");
		console.log(url);
	}
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
