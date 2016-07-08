Template.footer.helpers({
    firstNode: function(){
        return HeaderInfoCol.find({showType:"0"});
    },

    MoreNode: function(){
        return HeaderInfoCol.find({showType:"1"});
    },

    isShowMore: function(){
        var moreNodeList = HeaderInfoCol.find({showType:"1"});
        if ( moreNodeList.fetch().length > 0) {
            return "block";
        }else{
            return "none";
        }
    },

    "isDetailPage": function(e) {
       if(this._id) {
         return true;
       } else {
         return false;
       }
    },
    
    "noLoginColor": function(e) {
      if(Meteor.user()) {
        return "";
      } else {
        return "no-login-color";
      }
    }
});

Template.footer.events({
    "click #search-icon" : function(e){
      $('.m-search-form').animate({'width': 'show'}, 300);
      $('.m-footer-menu li a').css('color', '#15274d');
      $('.m-search-form').css('display', 'block');
      e.preventDefault();
      return false; 
    },

    "click button.search-remove" : function(e){
      $('.m-search-form').css('display', 'none');
      $('.m-footer-menu li a').css('color', '#a6a6a6');
      e.preventDefault();
      return false; 
    },

    "click .logout" : function(e){
        Meteor.logout(function(error){
            if(error){
                console.log("退出失败");
            }else{
                Router.go("index");
            }
        });
    },
    
    "click #share-timeline" : function(e){
       console.log("click #share-timeline");
       WeixinJSBridge.invoke('shareTimeline',{
                            "img_url": "http://ribenyan.net/ufs/files/sPuFBkZ5wFQrSaY68/img_news.jpeg",
                            "img_width": "640",
                            "img_height": "640",
                            "link": "http://www.ribenyan.com",
                            "desc": "京都汉字博物馆29日开幕",
                            "title": "test"
                            }, function(res) {
                            _report('timeline', res.err_msg);
                            });
    }

});


