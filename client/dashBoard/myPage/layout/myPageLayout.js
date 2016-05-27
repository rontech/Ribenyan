Template.myPageLayout.rendered = function() {
    var self = this;
    self.autorun(function(){
        if(!Meteor.user()){
            Router.go("/user/login")
        }
    });

}

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
    },
    "click #menuswitch" :function (e) {
        var a = $(".list-menu:first");
        var b = $(".card-list:first");
        var c = $(".title-box:first");
        var d = $(".left-menu:first");
        var e = $(".tab:first");
        if(a.css("display")!="block"){
            a.css("display","block");
            c.css("marginTop","0px");
        }
        else{
            a.css("display","none");
            c.css("marginTop","126px");
        }

        if(b.css("display")!="block"){
            b.css("display","block");
        }
        else{
            b.css("display","none");
            alert("1");

        }

        // if(c.css("display")!="block")c.css("marginTop","0px");
        // else{c.css("marginTop","126px");}

        if(d.css("display")!="block"){
            d.css("display","block");
            e.css("marginTop","0px");
        }
         else{d.css("display","none");e.css("marginTop","0px");}

    }
});

