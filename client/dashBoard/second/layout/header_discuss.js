Template.headerDiscuss.events({
	"click div.js-go-back" : function(e){//点击＠返回＠
		console.log(this.id);
		window.location.href = getBackHref(this.type,this.id);
		history.go(-1);
		// var eventObj = $(e.currentTarget);
		// eventObj.children("a").click(function(event) {
  //               event.stopPropagation();
  //           });
	},
});
Template.headerDiscuss.helpers({
	"goBackUrl" :function(){
		var url = getBackHref(this.type,this.id);
		return url;
	}
});

/*
* 返回按钮的url
* type: 1:index;2:news_detail;default:/;
*/
function getBackHref(type,id){
	var url = "/";
	if(type == "1"){//index
		url = "/index";
	}else if(type == "2"){//detail
		url = "/news/detail/" + id;
	}
	return url;
}