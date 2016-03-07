Template.managelogin.events({
    'submit #login-form' : function(e,t){
        e.preventDefault();
        var username = t.find('#login-username').value;
        var password = t.find('#login-password').value;
        console.log(username);
        console.log(password);
        var user = AdminInfo.find({"name":username,"password":password}).fetch();
        console.log(user);
        if(user.length==0){
            alert("登录名或密码有误 请重新输入！");
        }else{
           // Session.set("login_user",user[0]);
            sessionStorage.setItem('login_user',user[0]);
            Router.go("/manage/newslist");
        }
        console.log(user.length);
    },
});