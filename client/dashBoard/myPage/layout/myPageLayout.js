Template.myPageLayout.events({
    "click .logout" : function(e){
        console.log("退出登录");
        Meteor.logout(function(error){
            if(error){
                console.log("退出失败");
            }else{
                Router.go("index");
            }
        });
    }
});