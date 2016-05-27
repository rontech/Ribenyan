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

        if(a.css("display")!="block")a.css("display","block");
        else{a.css("display","none");}
        if(b.css("display")!="block")b.css("display","block");
        else{b.css("display","none");}
        if(c.css("display")!="block")c.css("display","block");
        else{c.css("display","none");}
        if(d.css("display")!="block"){
            d.css("display","block");
            e.css("marginTop","43px");
        }
        else{d.css("display","none");e.css("marginTop","43px");}

    }
});

