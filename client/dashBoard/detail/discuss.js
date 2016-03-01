Template.discuss.events({
	// "mouseenter div.praise-box":function(e){
	// 	$(e.target).css({'background-color': '#F63756'});
	// 	$(".icon-article-zan").css({'background-color': '#F63756'});
	// },
	// "mouseleave div.praise-box":function(e){
	// 	$(e.target).css({'background-color': 'white'});
	// 	$(".icon-article-zan").css({'background-color': 'white'});
	// }
	"click a.moder-lgn-box" : function(e){//登录按钮　弹出登陆框
		Modal.show("popupUserLoginRegister");
	}
});