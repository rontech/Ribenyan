// 页面事件
Template.footerDiscussFooter.events({
	"click button.js-pl-submit" : function(e){//评论"发表按钮"
		// console.log("点击评论　发表　按钮");
		//验证评论内容
		var evntObj = $(e.currentTarget);
		var plText = $("#discuss-input").val();
		if( isEmpty(plText) ){
			Modal.show('CommonModal', {style: '', elementId: 'pl-wrap-article',  
							title: '警告', message: PL_CONTENT_IS_NULL });
			return false;
		}else if ( plText.length < 8 ){
			Modal.show('CommonModal', {style: '', elementId: 'pl-wrap-article',  
							title: '警告', message: TEXTERA_PLACEHOLDER });
		}else{
			var plData = {
				"newsID": this.id,
				"userID" : Meteor.userId(),
				"content" : plText
			};
			//提交评论
			Meteor.call("submitNewsEvaluation",plData,function(error,result){
				if(error){//评论失败
					Modal.show('CommonModal', {style: '', elementId: 'pl-wrap-article',  
							title: '警告', message: PL_SUBMIT_ERROR });
				}else{
					if(result.result){//成功
						console.log("评论成功");
						//　清空评论框内容
						$("#discuss-input").val("");
					}else{
						Modal.show('CommonModal', {style: '', elementId: 'pl-wrap-article',  
							title: '警告', message: result.reason });
					}
				}
			});
		}
		
	}
})