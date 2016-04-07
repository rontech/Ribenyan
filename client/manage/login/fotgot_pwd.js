Template.forgotPwd.events({
	'submit #fotgotpwd' : function(e,t){
		e.preventDefault();
		var updateTime = new Date().Format("yyyy/MM/dd/hh:mm:ss");
		
		var userName = t.find('#userName').value;
		var email    = t.find('#email').value;
		var user     = AdminInfo.find({"username":userName,"email":email}).fetch();
		var _id      = user[0]._id._str;
		if(user.length == 0){
			alert("登录名或邮箱有误 请重新输入！");
		}else{
			var tmpPwd = randomString(8);
			var pwd = $.md5(tmpPwd);

			AdminInfo.update(
				new Meteor.Collection.ObjectID(_id),{$set:{
					"pwd":pwd,
					"updateTime":updateTime,
				}},function(){
						Meteor.call('sendEmail',
							email,
							'bob@example.com',
							'密码重置邮件',
							'您的密码已经重置为:'+tmpPwd+',请在登录 http://fbbook.rontech.co.jp:3000/managelogin 后修改密码。'
						);
						Router.go("/managelogin");
						alert("密码更新成功,请查看邮箱。");
					}
			);
		}
	},
});



