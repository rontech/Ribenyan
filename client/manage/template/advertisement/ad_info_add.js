Template.adInfoAdd.rendered = function() {
    $('#content').ckeditor();
    $('#introduce').ckeditor();
    var tmp =   sessionStorage.getItem('login_user');
    if(tmp==null){
      Router.go("/managelogin");
     }
     $("#house").hide();$("#people").hide();
};

Template.adInfoAdd.events({
    'submit #ad_info_add' : function(e,t){
        var createtime = new Date().Format("yyyy/MM/dd/hh:mm:ss");
        e.preventDefault();
        var title            = t.find('#title').value;
        var resume           = t.find('#resume').value;
        var showRule         = t.find('#showRule').value;
        var hopeShowPosition = t.find('#hopeShowPosition').value;
        var introduce        = t.find('#introduce').value;
        var content          = t.find('#content').value;
        var cstId            = t.find('#cstId').value;
        var advEmail         = t.find('#advEmail').value;
        var advTelephone     = t.find('#advTelephone').value;
        var imageObj  = getFileIds();

        if(showRule=="1" || showRule=="2"){
          //房屋信息
          var address          = t.find('#address').value;
          var nearestStation   = t.find('#nearestStation').value;
          var houseArea        = t.find('#houseArea').value;
          var houseType        = t.find('#houseType').value;
          var price            = t.find('#price').value;
          var nearestMetroLine = t.find('#nearestMetroLine').value;
        }else{
            if (showRule=="3") {
              //招聘信息
              var companyName      = t.find('#companyName').value;
              var workAdress       = t.find('#workAdress').value;
              var position         = t.find('#position').value;
              var salary           = t.find('#salary').value;
              var companyHomePage  = t.find('#companyHomePage').value;
              var companyTelephone = t.find('#companyTelephone').value;
              var companyEmail     = t.find('#companyEmail').value;
            }else{
                alert("请选择广告类型");
            }
        }

        if(showRule=="1" || showRule=="2"){
          AdInfo.insert({
                "title":title,
                "resume":resume,
                "showRule":showRule,
                "hopeShowPosition":hopeShowPosition,
                "address":address,
                "nearestStation":nearestStation,
                "houseArea":houseArea,
                "houseType":houseType,
                "price":price,
                "nearestMetroLine":nearestMetroLine,
                "introduce":introduce,
                "content":content,
                "cstId":cstId,
                "advEmail":advEmail,
                "advTelephone":advTelephone,
                "createTime":createtime,
                "updateTime":createtime,
                "imageObj":imageObj
                },function(){
                  alert("已保存");
                  Router.go("/manage/adlist");
                });
        }else{
            if (showRule=="3") {
              AdInfo.insert({
                "title":title,
                "resume":resume,
                "showRule":showRule,
                "hopeShowPosition":hopeShowPosition,
                "companyName":companyName,
                "workAdress":workAdress,
                "position":position,
                "salary":salary,
                "companyHomePage":companyHomePage,
                "companyTelephone":companyTelephone,
                "companyEmail":companyEmail,
                "introduce":introduce,
                "content":content,
                "cstId":cstId,
                "advEmail":advEmail,
                "advTelephone":advTelephone,
                "createTime":createtime,
                "updateTime":createtime,
                "imageObj":imageObj
                },function(){
                  alert("已保存");
                  Router.go("/manage/adlist");
                });
            }else{
                alert("请选择广告类型");
            }
        }
    },
    'change #showRule' : function(e,t){
      var showRule   = t.find('#showRule').value;
      if(showRule=="1" || showRule=="2"){
        $("#people").hide(); $("#house").show();
      }else{
        if (showRule=="3") {
          $("#house").hide(); $("#people").show();
        }else{
          $("#house").hide();$("#people").hide();
        }
      }
    },
});