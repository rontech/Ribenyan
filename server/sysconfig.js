//程序启动配置
Meteor.startup( function() {
  process.env.MAIL_URL = 
  "smtp://sj-yang@%40rontech.co.jp:Passw0rd02:@smtp.gmail.com:465";
});

//邮件配置

 Accounts.emailTemplates.siteName = "日本眼";
 Accounts.emailTemplates.from = "　日本眼 <accounts@example.com>";
Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to Awesome Town, " + user.profile.name;
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
   return "You have been selected to participate in building a better future!"
     + " To activate your account, simply click the link below:\n\n"
     + url;
};


//重置密码邮件
// 主题
Accounts.emailTemplates.resetPassword.subject = function(user) {
	return "《日本眼》密码重置";
};
Accounts.emailTemplates.resetPassword.text = function(user, url) {
	return "　您好　：　点击下方的链接重置密码：\n\n"　+ url ;
};

Accounts.urls.resetPassword = function(token){
	 return Meteor.absoluteUrl('user/resetpassword/' + token);
}
