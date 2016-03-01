Template.popupUserLoginRegister.onCreated(function () {
	// $("body").css({'background-color': '#eff2f8'});
});

Template.popupUserLoginRegister.events({

	'click .tab-box li' : function(e){
		$(".tab-box li.active").removeClass("active");
		var selectType = e.target.dataset.type;
		$(e.target).addClass("active");

		if(selectType == "register"){
			$("div.login").addClass("hide");
			$("div.register").removeClass("hide");
		}else{
			$("div.register").addClass("hide");
			$("div.login").removeClass("hide");
		}
	},
	'click button.js-ga-login' :function(e){//登录
		var username = $("#lgn_username").val();
		var paw = $("#lgn_pwd").val();

		if(isEmpty(username) || isEmpty(paw)){//失败
			$(".error-msg").removeClass("hide");
		}else{//提交登录
			$(".error-msg").addClass("hide");

			Meteor.loginWithPassword(username,paw,
				function(error){
					if(error){
						var rea = error.reason;
						if(rea == LOGIGN_USER_NOT_FOUND_ACCOUNT){
							$(".error-msg").text(LOGIGN_USER_NOT_FOUND);
							$(".error-msg").removeClass("hide");
						}else if(rea == LOGIGN_INCORRECT_PASSWORD_ACCOUNT){
							$(".error-msg").text(LOGIGN_INCORRECT_PASSWORD);
							$(".error-msg").removeClass("hide");
						}
						console.log("登录失败");
					}else{
						// Router.go("index");
						Modal.hide();
					}
				}
			);
		}
	},
	'click button.js-register-submit' :function(e){//注册
		console.log("点击注册");

		var email = $("#reg_email").val();
		var username = $("#reg_username").val();
		var paw = $("#reg_paw").val();
		var conpaw = $("#reg_conpaw").val();

		if(isEmpty(email)){
			$("#reg_error").text(REG_EMAIL_NULL);
			$("#reg_error").removeClass("hide");
			return;
		}

		if(!isEmail(email)){
			$("#reg_error").text(REG_EMAIL_NOT_FORMAT);
			$("#reg_error").removeClass("hide");	
			return;
		}

		if(isEmpty(username)){
			$("#reg_error").text(REG_USERNAME_NULL);
			$("#reg_error").removeClass("hide");
			return;
		}

		if(isEmpty(paw)){
			$("#reg_error").text(REG_PAW_NULL);
			$("#reg_error").removeClass("hide");
			return;
		}

		if(isEmpty(conpaw)){
			$("#reg_error").text(REG_CONPAW_NULL);
			$("#reg_error").removeClass("hide");	
			return;
		}

		if(paw !== conpaw){
			$("#reg_error").text(REG_PAW_NOT_EUA);
			$("#reg_error").removeClass("hide");	
			return;
		}

		$("#reg_error").addClass("hide");

		var profile = {
			"username" : username
		}
			
		//提交注册
		console.log("提交注册");

		Accounts.createUser({
								email:email,
								password:paw,
								username:username,
								profile: profile
							},
							function(error){
								if(error){
									console.log(error);

									if(error.reason == "Email already exists."){
										$("#reg_error").text(REG_EMAIL_EXIST);
										$("#reg_error").removeClass("hide");
									}

									if(error.reason == "Username already exists."){
										$("#reg_error").text(REG_USERNAME_EXIST);
										$("#reg_error").removeClass("hide");
									}
								}else{
									console.log("注册成功");
									// Router.go("index");
									Modal.hide();
								}
							}
		);
		
	}
});
