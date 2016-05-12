Template.header.onRendered(function(){
    // $("#nav li:first").addClass("on");
    $("#scroller li:first").addClass("on");
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

Template.header.events({
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
    "click li.js-show-search-box" : function(e){//搜索按钮
        $("#search-box").addClass("active");
        $("body").css("overflow","hidden");
    }
});

Template.header.helpers({
    firstNode:function(){
        return HeaderInfoCol.find({showType:"0"});
    },
    MoreNode:function(){
        return HeaderInfoCol.find({showType:"1"});
    },
    isShowMore:function(){
        var moreNodeList = HeaderInfoCol.find({showType:"1"});
        if ( moreNodeList.fetch().length > 0) {
            return "block";
        }else{
            return "none";
        }
    },
    getClass:function(index){
        index = (index + 1) % 4 ;
        switch (index) {
            case 1:
                return "one";
                break;
            case 2:
                return "two";
                break;
            case 3:
                return "three";
                break;
            case 4:
                return "four";
                break;
        }
    }
});

