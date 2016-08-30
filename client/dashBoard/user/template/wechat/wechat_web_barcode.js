// web wechat login 
Template.wechatWebBarCode.events({
	"click li.js-ga-login" : function(e){//wechat login div 
		Session.set("counter", Session.get("counter") + 1);
    // 网页版使用 loginWithWebWechat
    // App打包时使用 loginWithWechat
    // 
  		Meteor.loginWithWebWechat(function (err, res) {
          if (err) {
            console.log('success ' + res);
          }
          else {
            console.log('login failed ' + err);
          }
      });
   }
});