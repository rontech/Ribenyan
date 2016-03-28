// 广告二级列表投放添加

Template.adSettingManageAdd.helpers({
	"id": function(){
		return new Meteor.Collection.ObjectID()._str;
	},
});

Template.adSettingManageAdd.events({
	// 投放按钮
	"click button.js-add-adv" : function(e){
		var addAdvDic = $("div.js-add-adv");
		// 清空数据

		// 显示隐藏 画面
		addAdvDic.toggle();

		return false;
	},
	"click button.js-select-adv" : function(e){//弹出广告选择
		var eveObj = $(e.currentTarget);
		var boxObj = eveObj.parent().parent().parent();
		var boxID = boxObj.attr("id");
		Session.set("boxID",boxID);

		//弹出画面
		Modal.show("adPopupSelectAdv");

		return false;
	},
	"click button.js-save-bt" : function(e){//保存
		var eveObj = $(e.currentTarget);
		var boxObj = eveObj.parent().parent().parent();
		// 广告ID
		var advID = boxObj.find("input[name='advID']").val();
		// 类型 
		var Obj = new Array();
        var index = 0;

        $("input[name='checkbox']:checkbox:checked").each(function(){
            var data = $(this).val().split(",");
            var typeObj =  new  Object();
            typeObj["typeID"] = new Meteor.Collection.ObjectID(data[0]);
            typeObj["typeName"] = data[1];
            Obj[index] = typeObj;
            index++;
        });

        //数据检验
        if(isEmpty(advID)){
        	alert(ADVINFO_NOT_SELECT);
        	return false;
        }else{
        	advID = new Meteor.Collection.ObjectID(advID);
        }
        if(Obj.length == 0 ){
        	alert(ADVINFO_SET_TYPE_NOT_SELECT);
        	return false;
        }
        console.log(Obj);

        var dataAry = new Array();
        //整理数据
        for(var i = 0; i <Obj.length;i++){
        	var data = {
        		"type" : 2,
        		"advID" : advID,
        		"modalID" : Obj[i].typeID
        	};
        	dataAry.push(data);
        }

		//提交请求
		Meteor.call("addSetAdvInfo",dataAry,function(error,result){
				if(error){
					alert(BANNER_ADD_ERROR);
				}else{
					//关闭添加窗口
					$("div.js-add-adv").toggle();

					if(result.result){
						alert("保存成功");
					}else{
						alert(result.reason);
					}
				}
			}
		);

		return false;
	}
});