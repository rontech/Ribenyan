Template.login.events({
    'submit #login-form' : function(e,t){
        e.preventDefault();
        var username = t.find('#login-username').value;
        var password = t.find('#login-password').value;
        console.log(username);
        
        var users2 = new Meteor.Collection("users");
        var user = users2.find({"_id":username,"password":password});
        if(user.count()==0){
            console.log("xxxxxx");
        }else{
            console.log("yyyyy");
        }
        console.log(user.count());
    },
});