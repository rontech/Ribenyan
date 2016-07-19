Template.headerDiscuss.events({
	"click div.js-go-back" : function(e){//点击＠返回＠
		console.log(this.id);
		window.location.href = "/news/detail/" + this.id;
		history.go(-1);
	},
});