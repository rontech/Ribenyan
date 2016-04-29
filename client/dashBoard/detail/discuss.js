/*
*评论区域
*author ysj
*/

//
Template.discuss.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("bus_news_evaluation_info",Template.currentData().newsID);
	});
});
// 页面事件
Template.discuss.events({
	"click div.js-like-article" : function(e){//新闻点赞

		if(!Meteor.user()){
			alert(SYS_OPERATION_NEED_LOGIN);
			return false;
		}
		// 是否已点过赞
		var isPraise = $(e.currentTarget).data().click;
		if(isPraise){//点赞
			$(e.currentTarget).data("click",false);

			//提交点赞
			var praiseData = {
				"newsID" : Template.currentData().newsID,
				"userID" : Meteor.userId()
			};
			//点赞动画
			var aniObj = $(e.currentTarget).children("div");
			aniObj.animate({"margin-top": "-40px","opacity":"1"}, "slow");
			aniObj.animate({"opacity":"0"}, "fast");

			Meteor.call("newsPraise",praiseData,function(error,result){
				if(error){//点赞失败
					console.log("点赞失败");
					var nowNum = parseInt(praiseObj.text()) - 1;
					praiseObj.text(nowNum); 
					alert(PRAISE_SUBMIT_ERROR);
				}else{
					if(result.result){//成功
						
					}else{
						alert(result.reason);
					}
				}
			});
		}else{
			alert(PRAISE_HAS_SUBMIT);
		}
	},
	"click a.moder-lgn-box" : function(e){//登录按钮　弹出登陆框
		Modal.show("popupUserLoginRegister");
	},
	"click button.js-pl-submit" : function(e){//评论"发表按钮"
		console.log("点击评论　发表　按钮");
		//验证评论内容
		var evntObj = $(e.currentTarget);
		var plText = $("#saytext").val();
		if( isEmpty(plText) ){
			alert(PL_CONTENT_IS_NULL);
			return false;
		}else if ( plText.length < 8 ){
			alert(TEXTERA_PLACEHOLDER);
		}else{
			var plData = {
				"newsID": Template.currentData().newsID,
				"userID" : Meteor.userId(),
				"content" : plText
			};
			//提交评论
			Meteor.call("submitNewsEvaluation",plData,function(error,result){
				if(error){//评论失败
					alert(PL_SUBMIT_ERROR);
				}else{
					if(result.result){//成功
						console.log("评论成功");
						//　清空评论框内容
						$("#saytext").val("");
					}else{
						alert(result.reason);
					}
				}
			});
		}
		
	}
});

// 页面数据
Template.discuss.helpers({
	"praiseNum" : function(){//点在数量
		var id = new Meteor.Collection.ObjectID(Template.currentData().newsID);
		var newsObj = NewsCol.findOne({_id:id});
		if(newsObj){
			if(newsObj.praise){
				return newsObj.praise;
			}else{
				return 0;
			}
		}
	},
});