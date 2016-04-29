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
		// console.log(userIDs);
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
	"click div.js-hf-article-pl":function(e){//点击评论＠回复＠
		var hfbox = $(e.currentTarget).next();

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
	},
});

//点评ｆｏｒｍ
Template.plDpForm.events({
	"click button.js-article-dp" : function(e){// ＠我要点评＠　发表按钮
		var　eventObj = $(e.currentTarget);
		var textObj = eventObj.prev();
		var text = textObj.val();

		if(!Meteor.user()){
			alert(SYS_OPERATION_NEED_LOGIN);
			return false;
		}
		if(isEmpty(text)){
			alert(PL_CONTENT_IS_NULL);
			return false;
		}else if(text.length < 8){
			alert(TEXTERA_PLACEHOLDER);
			return false;
		}else{
			//提交
			var data = {
				"newsID":this.newsID._str,
				"evaID" : this._id._str,
				"userID":Meteor.userId(),
				"content":text,
				"evaType":"2"
			};

			Meteor.call("submitNewsDpOrReply",data,function(error,result){
				if(error){//评论失败
					alert(DP_SUBMIT_ERROR);
				}else{
					if(result.result){//成功
						console.log("点评成功");
						//　清空评论框内容
						textObj.val("");
					}else{
						alert(result.reason);
					}
				}
			});
		}
	},
	"click li.js-icon-like" : function(e){// 评论点赞
		//　动画
		var aniObj = $(e.currentTarget).parent().prev().prev();
		aniObj.animate({"margin-top": "-13px","opacity":"1"}, "slow");
		aniObj.animate({"opacity":"0"}, "fast");
		if(!Meteor.user()){
			alert(SYS_OPERATION_NEED_LOGIN);
			return false;
		}
		// 是否已点过赞
		var isPraise = $(e.currentTarget).data().click;
		if(isPraise){//点赞
			
			
			//提交点赞
			var praiseData = {
				"evaID" : this._id._str,
				"userID" : Meteor.userId(),
				"evaType" :"5",
			};

			Meteor.call("submitEvaParise",praiseData,function(error,result){
				if(error){//评论失败
					alert(PRAISE_SUBMIT_ERROR);
				}else{
					if(result.result){//成功
						console.log("点赞成功");
						//　动画
					}else{
						alert(result.reason);
					}
				}
			});
		}else{
			alert(PRAISE_HAS_SUBMIT);
		}
	},
	"click li.js-no-icon-like" : function(e){　// 评论踩
		//　动画
		var aniObj = $(e.currentTarget).parent().prev();
		aniObj.animate({"margin-top": "-13px","opacity":"1"}, "slow");
		aniObj.animate({"opacity":"0"}, "fast");

		if(!Meteor.user()){
			alert(SYS_OPERATION_NEED_LOGIN);
			return false;
		}
		// 是否已点过赞
		var isPraise = $(e.currentTarget).data().click;
		if(isPraise){//点赞
			//　提交点赞
			//提交点赞
			var praiseData = {
				"evaID" : this._id._str,
				"userID" : Meteor.userId(),
				"evaType" :"6",
			};

			Meteor.call("submitEvaParise",praiseData,function(error,result){
				if(error){//评论失败
					alert(NO_PRAISE_SUBMIT_ERROR);
				}else{
					if(result.result){//成功
						console.log("踩成功");
						//　动画
					}else{
						alert(result.reason);
					}
				}
			});

		}else{
			alert(PRAISE_HAS_SUBMIT);
		}
	}
});

//点评列表　点击事件
Template.plDplist.events({
	"click button.js-article-hf" : function(e){// ＠回复＠　发表按钮
		var　eventObj = $(e.currentTarget);
		var textObj = eventObj.prev();
		var text = textObj.val();

		if(!Meteor.user()){
			alert(SYS_OPERATION_NEED_LOGIN);
			return false;
		}
		
		if(isEmpty(text)){
			alert(PL_CONTENT_IS_NULL);
			return false;
		}else if(text.length < 8){
			alert(TEXTERA_PLACEHOLDER);
			return false;
		}else{
			//提交
			var data = {
				"newsID":this.newsID._str,
				"evaID" : Template.currentData().plID,
				"replyID":this._id._str,//点评ＩＤ
				"userID":Meteor.userId(),
				"content":text,
				"evaType":"3"
			};

			Meteor.call("submitNewsDpOrReply",data,function(error,result){
				if(error){//评论失败
					alert(REP_SUBMIT_ERROR);
				}else{
					if(result.result){//成功
						console.log("回复成功");
						//　清空评论框内容
						textObj.val("");
					}else{
						alert(result.reason);
					}
				}
			});
		}
	},
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
	},
	"isDp" : function(type){
		if(type == "2"){
			return true;
		}else if(type=="3"){
			return false;
		}
	}
});

//评论点评 form
Template.plDpForm.helpers({
	"pariseNum" : function(){
		if(this.praise){
			return this.praise;
		}else{
			return 0;
		}
	},
	"noPariseNum" : function(){
		if(this.noPraise){
			return this.noPraise;
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
												evaType:{$in:["2","3"]}
											},
											{
												sort:{creatDate:-1}
											}

									);
	return dpList;
}