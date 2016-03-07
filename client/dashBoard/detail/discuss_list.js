/*
* 新闻评论　模板
* author ysj
*/

// 模板加载
Template.discussList.onCreated(function(){
	var self = this;

	 self.autorun(function() {
		var list = getNewsPL(Template.currentData().newsID);
		var userIDs = list.map(function(doc) { return doc.userID; });
		console.log(userIDs);
		self.subscribe("userData",userIDs);
	 });
	
});

// 点评模板加载
Template.plDplist.onCreated(function(){

});

//点击事件
Template.discussList.events({
	"click div.js-add-dp-box" : function(e){//点击＠我要点评＠
		var dbbox = $(e.currentTarget).next();
		if(!$(dbbox).is(':visible')){
			$("div.hu-pl-box").toggle(false,"slow");
			$("div.dp-article-box").toggle(false,"slow");
		}
		$(dbbox).toggle("slow");
	},
	"click div.js-hf-article-pl span":function(e){//点击评论＠回复＠
		var hfbox = $(e.currentTarget).parent().next();

		if(!$(hfbox).is(':visible')){
			//关闭所有＠回复框＠
			$("div.hu-pl-box").toggle(false,"slow");
			$("div.dp-article-box").toggle(false,"slow");
		}

		$(hfbox).toggle("slow");
	},
	"click span.db-show" : function(e){//点评　＠展开＠
		// 点评用户
		var listUser = $(e.currentTarget).next();
		//　点评
		var listContent = $(e.currentTarget).next().next();

		var  isShow = $(e.currentTarget).data().show;
		if(isShow){//展开
			$(listUser).toggle("slow");
			$(listContent).toggle("slow");
			$(e.currentTarget).data().show　= false;
			$(e.currentTarget).text("展开");
		}else{//收起
			$(listUser).toggle("slow");
			$(listContent).toggle("slow");
			$(e.currentTarget).data().show　= true;
			$(e.currentTarget).text("收起");
		}
	},
	"click div.close-dp-list-box" :function(e){//　＠收起＠　

		// 点评用户
		var listUser = $(e.currentTarget).parent().prev();

		//　点评
		var listContent = $(e.currentTarget).parent();

		// 展开　按钮
		var btnZK = $(listUser).prev();

		$(listUser).toggle("slow");
		$(listContent).toggle("slow");

		$(btnZK).data().show　= true;
		$(btnZK).text("展开");
	},
	"click span.author-content q" :function(e){//　＠点评＠ 内容展开

		if($(e.currentTarget).hasClass("js-open")){//关闭　－inline-block
			$(e.currentTarget).css({"display": "inline-block","color": "#FFFFFF","background":  "#0479C4"});
			$(e.currentTarget).removeClass("js-open");
		}else{//展开 -inline
			$(e.currentTarget).css({"display": "inline","color": "#555555","background":"transparent"});
			$(e.currentTarget).addClass("js-open");
		}
	}	
});



//评论列表
Template.discussList.helpers({
	"isHavePl" : function(){//是否有评论
		var list = getNewsPL(Template.currentData().newsID);
		if(list.count() > 0){
			return true;
		}else{
			return false;
		}
	},
	"plList" : function(){//评论　ｌｉｓｔ
		return getNewsPL(Template.currentData().newsID);
	}
});


// 点评列表
Template.plDplist.helpers({
	"isHaveDp" : function(){//是否有点评
		var list = gePlDp(Template.currentData().plID);
		if(list.count() > 0){
			return true;
		}else{
			return false;
		}
	},
	"dpList" : function(){//点评列表
		return gePlDp(Template.currentData().plID);
	}
});

//评论点评 form
Template.plDpForm.helpers({
	"pariseNum" : function(){
		if(this.parise){
			return this.parise;
		}else{
			return 0;
		}
	},
	"noPariseNum" : function(){
		if(this.noParise){
			return this.noParise;
		}else{
			return 0;
		}
	}
});


// 共同方法 - 获取文章评论
getNewsPL = function(id){
	var newsID = new Mongo.Collection.ObjectID(id);

	var plList = NewsEvaluationCol.find(
											{
												newsID:newsID,
												evaType:"1"
											},
											{
												sort:{creatDate:-1}
											}
										);
	return plList;
}

// 获取评论的点评列表
gePlDp = function(id){
	var plID = new Mongo.Collection.ObjectID(id);
	var dpList = NewsEvaluationCol.find(
											{
												evaluationID :plID,
												evaType:"2"
											},
											{
												sort:{creatDate:-1}
											}

									);
	return dpList;
}