Template.discussList.events({
	"click div.js-add-dp-box" : function(e){//点击＠我要点评＠
		var dbbox = $(e.target).next();
		if(!$(dbbox).is(':visible')){
			$("div.hu-pl-box").toggle(false,"slow");
			$("div.dp-article-box").toggle(false,"slow");
		}
		$(dbbox).toggle("slow");
	},
	"click div.js-hf-article-pl span":function(e){//点击评论＠回复＠
		var hfbox = $(e.target).parent().next();

		if(!$(hfbox).is(':visible')){
			//关闭所有＠回复框＠
			$("div.hu-pl-box").toggle(false,"slow");
			$("div.dp-article-box").toggle(false,"slow");
		}

		$(hfbox).toggle("slow");
	},
	"click span.db-show" : function(e){//点评　＠展开＠
		// 点评用户
		var listUser = $(e.target).next();
		//　点评
		var listContent = $(e.target).next().next();

		var  isShow = $(e.target).data().show;
		if(isShow){//展开
			$(listUser).toggle("slow");
			$(listContent).toggle("slow");
			$(e.target).data().show　= false;
			$(e.target).text("展开");
		}else{//收起
			$(listUser).toggle("slow");
			$(listContent).toggle("slow");
			$(e.target).data().show　= true;
			$(e.target).text("收起");
		}
	},
	"click div.js-show-hide-dp-box" :function(e){

		// 点评用户
		var listUser = $(e.target).parent().prev();

		//　点评
		var listContent = $(e.target).parent();

		// 展开　按钮
		var btnZK = $(listUser).prev();

		$(listUser).toggle("slow");
		$(listContent).toggle("slow");

		$(btnZK).data().show　= true;
		$(btnZK).text("展开");
	},
	"click span.author-content q" :function(e){//　＠点评＠内容展开

		if($(e.target).hasClass("js-open")){//关闭　－inline-block
			$(e.target).css({"display": "inline-block","color": "#FFFFFF","background":  "#0479C4"});
			$(e.target).removeClass("js-open");
		}else{//展开 -inline
			$(e.target).css({"display": "inline","color": "#555555","background":"transparent"});
			$(e.target).addClass("js-open");
		}
	}	
});

//评论列表
Template.discussList.events({

});