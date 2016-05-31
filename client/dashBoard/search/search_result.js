var advNum = 2;

Template.searchResult.events({
	"click button.js-search" : function(e){//点击查询
		var inputObj = $("#search-input1");
		var searchText = inputObj.val();
		if(isEmpty(searchText)){
			alert(SEARCH_TEXT_NOT_NULL);
			return false;
		}else{
			// 打开新窗口
			$("#searchForm1").submit();
		}
	}
});

Template.searchResult.helpers({
	"searchText" : function(){
		return Template.currentData().searchText;
	},
	"isHavaResult":function(){
		if(compositeData().length>0){
			return true;
		}else{
			return false;
		}
		// return true;
	},
	"datalist" : function(){
		// console.log(Template.currentData().searchText);
		if(Template.currentData().searchText){
			return compositeData();
		}
	},
	
});

// 组合数据
function compositeData(){

	var searchText = new RegExp(Template.currentData().searchText);

	var newsInfo = searchNewsData(searchText).fetch();

	var advInfo = searchAdverInfo(searchText);


	if(newsInfo.length == 0){
		var listInfo = new Array();
		var j = 0;

		//混合数据
		for(var i = 0;i < advInfo.length;i++){
			advInfo[i].isAdv = true; 
			listInfo.push(advInfo[i]);
			j++;	
		}
		return listInfo;
	}
	if(advInfo.length == 0){
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
	return listInfo;
}

// 检索 新闻数据
function searchNewsData(searchText){

	return NewsCol.find(
			{
				$or :[
						{"title" : searchText},
						{"secondTitle":searchText},
						{"introduce" : searchText},
						{"content" : searchText}
				]
				
			},
			{
				sort: {
						publishTime: -1
					}
			}
	);
}

//广告数据
function searchAdverInfo(searchText){

	// 查询广告
	var advList = AdInfo.find({
								$or :[
										{"title" : searchText},
										{"address" : searchText},
										{"introduce" : searchText},
										{"content" : searchText}
									]
								}
							).fetch();
	// console.log(advList);

	if(advList.length > 0 ){
		var list = new Array();

		for(var i = 0;i<advList.length;i++){

			var advInfo = SetingAdvInfo.findOne({"advID":advList[i]._id});
			if(advInfo){
				list.push(advInfo);
			}
		}
		return list;
	}else{
		return new Array();
	}
}