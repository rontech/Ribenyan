Template.newsDetail.onRendered(function(){
	console.log(Template.currentData());
	var newsTitle = Template.currentData().title;
	var title = newsTitle + "-" + SYS_APP_NAME;

	// 网页标题　类型＋网站名称
	document.title = title  ;
});

Template.newsDetail.onCreated(function(){

});


Template.newsDetail.helpers({
	"praiseNum" : function(){
		if(this.praise){
			return this.praise;
		}else{
			return 0;
		}
	},
	"discussNum" : function(){
		var plList = NewsEvaluationCol.find(
											{
												newsID:this._id,
												evaType:"1"
											},
											{
												sort:{creatDate:-1}
											}
										);
		if(plList){
			return plList.count();
		}else{
			return 0;
		}

	},
	"isHaveImage" : function(){
		if(this.imageObj){
			if(this.imageObj.length > 0){
				return true;
			}else{
				return false;
			}
		}
	}
});