Template.managePwdChange.events({
	'submit #pwd_change' : function(e,t){
		var updatetime = new Date().Format("yyyy/MM/dd/hh:mm:ss");
		e.preventDefault();
		var userId = sessionStorage.getItem('login_user');

		var oldpwd  = t.find('#oldpwd').value;
		var pwd       = t.find('#pwd').value;
		var pwdq      = t.find('#pwdq').value;
		console.log("userId"+userId);
		console.log("oldpwd"+oldpwd);
		console.log("pwd"+pwd);
		console.log("pwdq"+pwdq);
		if(pwd == pwdq){
			oldpwd = $.md5(oldpwd); 
			console.log("oldpwd"+oldpwd);
			var user = AdminInfo.find({"_id":new Meteor.Collection.ObjectID(userId),"pwd":oldpwd}).fetch();
			if(user.length == 0){
				alert("旧密码有误 请重新输入！");
			}else{
				pwd = $.md5(pwdq);
				AdminInfo.update(
					new Meteor.Collection.ObjectID(userId),{$set:{
						"pwd":pwd,
						"updateTime":updatetime,
					}},function(){alert("密码更新成功。");}
				);
			}
		}else{
			alert("两次输入的密码不一致，请重新输入！");
		}

	},
});