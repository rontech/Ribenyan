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
	// "mouseenter div.praise-box":function(e){
	// 	$(e.target).css({'background-color': '#F63756'});
	// 	$(".icon-article-zan").css({'background-color': '#F63756'});
	// },
	// "mouseleave div.praise-box":function(e){
	// 	$(e.target).css({'background-color': 'white'});
	// 	$(".icon-article-zan").css({'background-color': 'white'});
	// }
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

			Meteor.call("newsPraise",praiseData,function(error,result){
				if(error){//点赞失败
					console.log("点赞失败");
					var nowNum = parseInt(praiseObj.text()) - 1;
					praiseObj.text(nowNum); 
				}else{
					if(result.result){//成功
						//模拟添加点赞后期，存储延迟处理
						// var praiseObj = $(e.currentTarget).children("span");
						// var nowNum = parseInt(praiseObj.text()) + 1;
						// praiseObj.text(nowNum); 

						//点赞动画
						var aniObj = $(e.currentTarget).children("div");
						aniObj.animate({"margin-top": "-40px","opacity":"1"}, "slow");
						aniObj.animate({"opacity":"0"}, "fast");
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

		//提交评论
	}
});

// 页面数据
Template.discuss.helpers({
	"praiseNum" : function(){//点在数量
		var id = new Meteor.Collection.ObjectID(Template.currentData().newsID);		 
		var newsObj = NewsCol.findOne({_id:id});
		if(newsObj.praise){
			return newsObj.praise;
		}else{
			return 0;
		}
	},

});