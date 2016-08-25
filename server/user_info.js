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
  },
  wechatWebLogin:function(code){
    var result = WechatWebApi.wechatLogin(code);

  }
});

