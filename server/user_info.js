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

    if(user.services.wechat || user.services.webwechat){
        var unionId = user.services.wechat || user.services.webwechat;
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

