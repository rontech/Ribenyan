Template.header.onRendered(function(){
  myScroll=new IScroll("#wrapper",{ eventPassthrough: true, scrollX: true, scrollY: false,
                                    preventDefault: false});
  $(window).on('scroll',
    function() {
        if($("#wrapper").is(":visible")){
            if ( $(window).scrollTop() > 50 ) {
                $(".logo").hide();
              } else {
                $(".logo").show();
              };
        }
      
    });

    // $("#nav li:first").addClass("on");
    $("#scroller li:first").addClass("on");
});

Template.header.events({
    "click .logout" : function(e){
        // console.log("退出登录");
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
        if(index!=0){
            switch ((index ) % 4) {
                case 1:
                    return "one";
                    break;
                case 2:
                    return "two";
                    break;
                case 3:
                    return "three";
                    break;
                case 0:
                    return "four";
                    break;
            }
        }
    }
});

