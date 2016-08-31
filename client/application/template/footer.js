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
    },

    "discussNum" : function(){
      if(this._id) {
        var plList = NewsEvaluationCol.find(
                          {
                            newsID:this._id,
                            evaType:"1"
                          },
                          {
                            sort:{creatDate:-1}
                          }
                        );

        if(plList){
          return plList.count();
        }else{
          return false;
        }
      }
    },
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
      if(Meteor.isCordova){
        var url = Meteor.absoluteUrl() + this._id._str;
        Wechat.share({
         message: {
            title: this.title,
            media: {
                type: Wechat.Type.WEBPAGE,
                webpageUrl: url
            }  // share to Timeline,
          },
          scene: Wechat.Scene.TIMELINE, 
        }, function () {
         //alert("Success");
         alert("分享成功");
        }, function (reason) {
         alert("分享失败");
        });
      }else{//web端分享
          //微信分享按钮event
          console.log("click web");
          $(".js_qrcode_wrap.on").removeClass('on');
          $(this).parents('.card').find(".js_qrcode_wrap").addClass('on');
          $(this).parents('.content-info').find(".js_qrcode_wrap").addClass('on');
      }     
    },

    "click #footer-like-icon" : function(e){
      if(!Meteor.user()){
        Modal.show('CommonModal', {title: '警告', message: SYS_OPERATION_NEED_LOGIN });
        return false;
      }

      // 是否已点过赞
      var isPraise = $(e.currentTarget).data().click;
      if(isPraise){//点赞
        $(e.currentTarget).data("click",false);

        //提交点赞
        var praiseData = {
         "newsID" : Template.currentData().newsID,
         "userID" : Meteor.userId()
        };

       //点赞动画
        var aniObj = $(e.currentTarget).children("div");
        aniObj.animate({"margin-top": "-40px","opacity":"1"}, "slow");
        aniObj.animate({"opacity":"0"}, "fast");

        Meteor.call("newsPraise",praiseData,function(error,result){
	  if(error){//点赞失败
	    console.log("点赞失败");
	    var nowNum = parseInt(praiseObj.text()) - 1;
	    praiseObj.text(nowNum);
	    Modal.show('CommonModal', { title: '警告', message: PRAISE_SUBMIT_ERROR });
	  }else{
	    if(!result.result){//成功
	      Modal.show('CommonModal', { title: '警告', message: result.reason });
	    }
	  }
       });
     }else{
       Modal.show('CommonModal', { title: '警告', message: PRAISE_HAS_SUBMIT });
     }
   },
});

Template.footer.onRendered(function(){

  //微信分享按钮event
  // $("#share-timeline").on('click', function() {
  //   $(".js_qrcode_wrap.on").removeClass('on');
  //   $(this).parents('.card').find(".js_qrcode_wrap").addClass('on');
  //   $(this).parents('.content-info').find(".js_qrcode_wrap").addClass('on');
  // });
  $(".share-close").on('click', function() {
    $(this).parents(".js_qrcode_wrap.on").removeClass('on');
  });

});


