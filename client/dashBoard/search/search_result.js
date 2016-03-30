
Template.searchResult.events({
	"click button.js-search" : function(e){//点击查询
		var inputObj = $("#search-input");
		var searchText = inputObj.val();
		if(isEmpty(searchText)){
			alert(SEARCH_TEXT_NOT_NULL);
			return false;
		}else{
			// 打开新窗口
			$("#searchForm").submit();
		}
	}
});

Template.searchResult.helpers({
	"datalist" : function(){
		console.log(Template.currentData().searchText);
		if(Template.currentData().searchText){
			return compositeData();
		}else{
			return new Array();
		}
	}
});

// 组合数据
function compositeData(){

	var searchText = new RegExp(Template.currentData().searchText);
	var newsInfo = searchNewsData(searchText).fetch();
	var advInfo = searchAdverInfo(searchText).fetch();

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

	return SetingAdvInfo.find({
								"isVaild" : 1,
								"title" : searchText
							});
}