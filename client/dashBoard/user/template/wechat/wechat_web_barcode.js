// web wechat login 
Template.wechatWebBarCode.events({
	"click li.js-ga-login" : function(e){//wechat login div 
		// $("#wechat_login").toggle();
		Session.set("counter", Session.get("counter") + 1);
		Meteor.loginWithWechat({
		loginStyle: 'popup'
		//loginStyle: 'redirect'  you can use redirect for mobile web app
		}, function () {
		console.log('in call back', arguments);
		});
    }
});