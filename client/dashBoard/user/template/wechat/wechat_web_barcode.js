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

     //  Wechat.share({
     //    message: {
     //      title: "Hi, there",
     //      media: {
     //         type: Wechat.Type.IMAGE,
     //         image:"http://www.ribenyan.net/ufs/files/wGLosFcv4PS5ucjv3/pokenmen%20go%20.jpg"
     //      }
     //    },
     //    	scene: Wechat.Scene.TIMELINE   // share to Timeline
	    // }, function () {
	    //     alert("Success");
	    // }, function (reason) {
	    //     console.log(reason);
	    //     alert("Failed: " + reason);
	    // });
   }
});