Template.managelogin.events({
	'submit #login-form' : function(e,t){
		e.preventDefault();
		var username = t.find('#login-username').value;
		var password = t.find('#login-password').value;
		password = $.md5(password); 
		var user = AdminInfo.find({"username":username,"pwd":password}).fetch();

		if(user.length == 0){
			alert("登录名或密码有误 请重新输入！");
		}else{
			newsperms = user[0].newsperms;
			adperms   = user[0].adperms;
			ctrlperms = user[0].ctrlperms;
			sessionStorage.setItem('login_user',user[0]._id._str);
			sessionStorage.setItem('username',user[0].username);
			sessionStorage.setItem('role',user[0].role);
			sessionStorage.setItem('newsperms',newsperms);
			sessionStorage.setItem('adperms',adperms);
			sessionStorage.setItem('ctrlperms',ctrlperms);
			if(adperms == "1")
				Router.go("/manage/adlist");
			if(ctrlperms == "1")
				Router.go("/manage/index/banner");
			if(newsperms == "1")
				Router.go("/manage/newslist");
		}
	},
});