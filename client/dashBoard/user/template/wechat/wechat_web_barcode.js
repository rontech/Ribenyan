// web wechat login 
Template.wechatWebBarCode.events({
	"click li.js-ga-login" : function(e){//wechat login div 
		// $("#wechat_login").toggle();
		Session.set("counter", Session.get("counter") + 1);
		// Meteor.loginWithWechat({
		// loginStyle: 'redirect'
		// //loginStyle: 'redirect'  you can use redirect for mobile web app
		// }, function (err, res) {
  //         if (err !== undefined)
  //           console.log('sucess ' + res)
  //         else
  //           console.log('login failed ' + err)
  //     });
  		Meteor.loginWithWeChat(function (err, res) {
          if (err) {
            console.log('success ' + res);
          }
          else {
            console.log('login failed ' + err);
          }
      });
    }
});