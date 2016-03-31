Template.popupSearchInput.events({
	"click i.js-close-search-box" : function(e) {//关闭按钮
		$("#search-box").removeClass("active");
		$("body").css("overflow","");
	},
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
