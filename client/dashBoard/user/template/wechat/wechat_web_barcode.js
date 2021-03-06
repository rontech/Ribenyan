// web wechat login 
Template.wechatWebBarCode.events({
	"click li.js-ga-login" : function(e){//wechat login div 
		// 网页版使用 loginWithWebWeChat
    // App打包时使用 loginWithWeChat
    if(Meteor.isCordova){
      Meteor.loginWithWeChat(function (err, res) {
          if (err) {
            console.log('success ' + res);
          }
          else {
            console.log('login failed ' + err);
          }
      });
    }else{
      Meteor.loginWithWebWeChat(function (err, res) {
          if (err) {
            console.log('success ' + res);
          }
          else {
            console.log('login failed ' + err);
          }
      });
    }
  }
});