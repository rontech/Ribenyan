//发送密码重置邮件

Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);
    this.unblock();
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
  // wechatWebLogin:function(code){
  //   var result = WechatWebApi.wechatLogin(code);

  // }
});

Accounts.onCreateUser(function (options, user) {
    if (options.profile) {
        user.profile = options.profile;
    }

    
    if(user.services.hasOwnProperty("webwechat") || user.services.hasOwnProperty("webwechat")){
        if(user.services.hasOwnProperty("webwechat")){
          unionId = user.services.webwechat.unionId; 
        }else{
          unionId = user.services.wechat.unionId;
        }
        var wechatoldUser = Meteor.users.findOne({"services.wechat:" : unionId});
        var webwechatoldUser = Meteor.users.findOne({"services.webwechat:" : unionId});
        if (wechatoldUser ){ 
          return wechatoldUser;
        }else if(webwechatoldUser){
          return webwechatoldUser;
        }else{
          return user;
        }
    }

    return user;
});

