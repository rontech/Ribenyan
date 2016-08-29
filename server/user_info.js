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

    const wechatUnionId = _.get(user, 'services.wechat.unionId') || _.get(user, 'services.webwechat.unionId');
    if (wechatUnionId) {
        _.set(user, 'services.wechat.id', wechatUnionId);
        _.set(user, 'services.webwechat.id', wechatUnionId);
    }

    return user;
});

