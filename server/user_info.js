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

// 区分用户登录类型
Accounts.onCreateUser(function (options, user) {
    if (options.profile) {
        user.profile = options.profile;
    }

    if(user.services.hasOwnProperty("wechat")){
      user.services.webwechat = user.services.wechat;
      return user;
    }else if (user.services.hasOwnProperty("webwechat")){
      user.services.wechat = user.services.webwechat;
      return user;
    }else {
      return user;
    }
});

