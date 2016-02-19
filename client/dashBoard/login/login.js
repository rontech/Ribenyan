Template.login.events({
    'submit #login-form' : function(e,t){
        e.preventDefault();
        var username = t.find('#login-username').value;
        var password = t.find('#login-password').value;
        console.log(username);
        console.log(password);
        
        var user = UserInfo.find({"id":username,"password":password});
        console.log(user.fetch());
        if(user.count()==0){
            console.log("xxxxxx");
        }else{
            console.log("yyyyy");
        }
        console.log(user.count());
    },
});