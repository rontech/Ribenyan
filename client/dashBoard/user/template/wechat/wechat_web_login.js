// web wechat login 
Template.wechatWeblogin.events({
	"click li.js-ga-login" : function(e){//wechat login div 
		$("#wechat_login").toggle();
	},
});