Template.frontAdInfoAdd.rendered = function() {
    $("#house").hide();
    $("#people").hide();

    CKEDITOR.replace("content");
    CKEDITOR.replace("introduce");
}

Template.frontAdInfoAdd.events({
    'submit #ad_info_add_F' : function(e,t) {
        var createtime = new Date().Format("yyyy/MM/dd/hh:mm:ss");

        var price            = '';
        var apartment        = '';
        var roomType         = '';
        var deposit          = '';
        var giftMoney        = '';
        var kanrihi          = '';
        var address          = '';
        var traffic          = '';
        var contactPhone     = '';
        var buildYear        = '';
        var buildingHigh     = '';
        var houseArea        = '';
        var orientation      = '';
        var buildingMaterial = '';
        var environment      = '';
        var condition        = '';

        var companyName      = '';
        var workAdress       = '';
        var position         = '';
        var salary           = '';
        var companyHomePage  = '';
        var companyTelephone = '';
        var companyEmail     = '';
        var duty             = '';
        var requirement      = '';
        var weal             = '';
        var companyIntroduce = '';

        e.preventDefault();
        var title            = t.find('#title').value;
        // var resume           = t.find('#resume').value;
        var showRule         = t.find('#showRule').value;
        var hopeShowPosition = t.find('#hopeShowPosition').value;
        var introduce        = t.find('#introduce').value;
        var content          = t.find('#content').value;
        var cstId            = t.find('#cstId').value;
        var advEmail         = t.find('#advEmail').value;
        var advTelephone     = t.find('#advTelephone').value;
        var imageObj         = getFileIds();

        if(showRule == "1" || showRule == "2") {
            //房屋信息
            price            = t.find('#price').value;
            apartment        = t.find('#apartment').value;
            roomType         = t.find('#roomType').value;
            deposit          = t.find('#deposit').value;
            giftMoney        = t.find('#giftMoney').value;
            kanrihi          = t.find('#kanrihi').value;
            address          = t.find('#address').value;
            traffic          = t.find('#traffic').value;
            contactPhone     = t.find('#contactPhone').value;
            buildYear        = t.find('#buildYear').value;
            buildingHigh     = t.find('#buildingHigh').value;
            houseArea        = t.find('#houseArea').value;
            orientation      = t.find('#orientation').value;
            buildingMaterial = t.find('#buildingMaterial').value;
            environment      = t.find('#environment').value;
            condition        = t.find('#condition').value;
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
                duty             = t.find('#duty').value;
                requirement      = t.find('#requirement').value;
                weal             = t.find('#weal').value;
                companyIntroduce = t.find('#companyIntroduce').value;

            }else{
                //alert("请选择广告类型");
            }
        }

        AdInfo.insert({
                "title":title,
                // "resume":resume,
                "showRule":showRule,
                "hopeShowPosition":hopeShowPosition,
                "introduce":introduce,
                "content":content,
                "cstId":cstId,
                "advEmail":advEmail,
                "advTelephone":advTelephone,
                "price":price,
                "apartment":apartment,
                "roomType":roomType,
                "deposit":deposit,
                "giftMoney":giftMoney,
                "kanrihi":kanrihi,
                "address":address,
                "traffic":traffic,
                "contactPhone":contactPhone,
                "buildYear":buildYear,
                "buildingHigh":buildingHigh,
                "houseArea":houseArea,
                "orientation":orientation,
                "buildingMaterial":buildingMaterial,
                "environment":environment,
                "condition":condition,
                "companyName":companyName,
                "workAdress":workAdress,
                "position":position,
                "salary":salary,
                "companyHomePage":companyHomePage,
                "companyTelephone":companyTelephone,
                "companyEmail":companyEmail,
                "duty":duty,
                "requirement":requirement,
                "weal":weal,
                "companyIntroduce":companyIntroduce,
                "createTime":createtime,
                "updateTime":createtime,
                "imageObj":imageObj
            },function(){
                alert("已保存");
                Router.go("/user/mypage/ad_list");
            }
        );
    },
    'change #showRule' : function(e,t){
        var showRule   = t.find('#showRule').value;
        if(showRule=="1" || showRule=="2") {
            $("#people").hide(); $("#house").show();
        }else{
            if (showRule=="3") {
                $("#house").hide(); $("#people").show();
            }else{
                $("#house").hide(); $("#people").hide();
            }
        }
    }
})


