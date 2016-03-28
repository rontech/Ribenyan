Template.adInfoAdd.rendered = function() {
    ckAdPerms();
    $('#content').ckeditor();
    $('#introduce').ckeditor();
    $("#house").hide();
    $("#people").hide();
};

Template.adInfoAdd.events({
    'submit #ad_info_add' : function(e,t){
        var createtime = new Date().Format("yyyy/MM/dd/hh:mm:ss");
        
        var address          = "";
        var nearestStation   = "";
        var houseArea        = "";
        var houseType        = "";
        var price            = "";
        var nearestMetroLine = "";
        var companyName      = "";
        var workAdress       = "";
        var position         = "";
        var salary           = "";
        var companyHomePage  = "";
        var companyTelephone = "";
        var companyEmail     = "";

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
          address          = t.find('#address').value;
          nearestStation   = t.find('#nearestStation').value;
          houseArea        = t.find('#houseArea').value;
          houseType        = t.find('#houseType').value;
          price            = t.find('#price').value;
          nearestMetroLine = t.find('#nearestMetroLine').value;
        }else{
            if (showRule=="3") {
              //招聘信息
              companyName      = t.find('#companyName').value;
              workAdress       = t.find('#workAdress').value;
              position         = t.find('#position').value;
              salary           = t.find('#salary').value;
              companyHomePage  = t.find('#companyHomePage').value;
              companyTelephone = t.find('#companyTelephone').value;
              companyEmail     = t.find('#companyEmail').value;
            }else{
                alert("请选择广告类型");
            }
        }

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
    },
    'change #showRule' : function(e,t){
      var showRule   = t.find('#showRule').value;
      if(showRule=="1" || showRule=="2"){
        $("#people").hide(); $("#house").show();
      }else{
        if (showRule=="3") {
          $("#house").hide(); $("#people").show();
        }else{
          $("#house").hide(); $("#people").hide();
        }
      }
    },
});