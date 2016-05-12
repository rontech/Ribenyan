
// Do not forget to add the email package: $ meteor add email
// and to configure the SMTP: https://gist.github.com/LeCoupa/9879221

Template.forgotPassword.onCreated(function () {
	$("body").css({'background-color': '#eff2f8'});
	//mobile 导航颜色
	var tmp=-1;
	$("#scroller li").each(function(){
		switch(tmp%4+1){
			case 1:
				$(this).addClass("one");
				break;
			case 2:
				$(this).addClass("two");
				break;
			case 3:
				$(this).addClass("three");
				break;
			case 4:
				$(this).addClass("four");
				break;
		}
		tmp++;
	});
});

Template.forgotPassword.events({

  'submit #forgotPasswordForm': function(e, t) {
    e.preventDefault();

    var forgotPasswordForm = $(e.currentTarget),
        email = forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase();

        if(isEmpty(email)){
			$("#forgot_error").text(RSET_PAW_EMAIL_NOT_EMPTY);
    		$("#forgot_error").removeClass("hide");
    		return false;
        }

        if(!isEmail(email)){
        	$("#forgot_error").text(REG_EMAIL_NOT_FORMAT);
    		$("#forgot_error").removeClass("hide");
    		return false;	
        }
        
        $("#forgot_error").addClass("hide");
		Accounts.forgotPassword({email: email}, function(err) {
		    if (err) {
		      if (err.message === 'User not found [403]') {
		        alert(RSET_PAW_NOT_USER);
		      } else {
		        alert(SYS_ERROR);
		      }
		    } else {
		      console.log('Email Sent. Check your mailbox.');
		      alert("邮件已发送，请到邮箱确认");
		      return false;
		    }
	  	});
    	return false;
  }
});


/**************************重置密码*********************************/ 

Template.resetPassword.helpers({
 resetPassword: function(){
 	if(this.token){
 		Session.set("resetPassword",this.token);
 	}
  return Session.get('resetPassword');
 }
});

Template.resetPassword.events({
  'submit #resetPasswordForm': function(e, t) {//
    e.preventDefault();
    
    var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('#resetPasswordPassword').val(),
        passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

        if(isEmpty(password)){
			$("#rset_error").text(REG_PAW_NULL);
			$("#rset_error").removeClass("hide");
			return false;
		}

		if(isEmpty(passwordConfirm)){
			$("#rset_error").text(REG_CONPAW_NULL);
			$("#rset_error").removeClass("hide");	
			return false;
		}

		if(password !== passwordConfirm){
			$("#rset_error").text(REG_PAW_NOT_EUA);
			$("#rset_error").removeClass("hide");	
			return false;
		}

    	$("#rset_error").addClass("hide");

      	Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
	        if (err) {
	            console.log('We are sorry but something went wrong.');
	            if(err.reason == "Token expired"){//ｔｏｋｅｎ　失效
	            	alert(RSET_PAW_TOKEN_EXIT);
	            	Router.go("forgotpassword")
		   			return false;	
	            }
	        	$("#rset_error").text(RSET_PAW_FAILE);
		   		$("#rset_error").removeClass("hide");	
				return false;
	        }else {
	            console.log('Your password has been changed. Welcome back!');
	            Session.set('resetPassword', null);
	            // 跳转首页
	            Router.go("index");
	        }
      });
    
    return false;
  }
});