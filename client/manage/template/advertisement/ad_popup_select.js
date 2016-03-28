// 广告弹出选择
Template.adPopupSelectAdv.helpers({
	tables : function () {
      return AdInfo.find({});
    },
    tableSettings : function () {
      return {
        rowsPerPage: 10,
        showNavigation: 'auto',
        showColumnToggles: false,
        fields: [
        	{
        		key:'_id',
        		label:'',
        		fn:function(value,object,key){
        			var html = "<button class='btn btn-success js-select-adv' data-id='" + value._str +"' >选择</button>";
        			return new Spacebars.SafeString(html);
        		}
        	},{
		    	key: 'title',
		        label: '标题'
		    },{ 
	          	key: 'type', 
	          	label: '类型',
	          	fn:function(value,object,key){
	          		var name = "";
		          	switch (value) {
		          		case 1 :
		          			name = "卖房";
		          			break;
		          		case 2 :
		          			name = "房屋出租";
		          			break;
		          		case 3 :
		          			name = "招聘";
		          			break;
		          	}
		            return name;
          		}
      	  }
        ]
      };
    }
});

Template.adPopupSelectAdv.events({
	"hide.bs.modal #advModal" : function(e){//弹出框关闭
		var boxID = Session.get("boxID");
		var selectAdvID = Session.get("selectAdvID");

		if(selectAdvID){
			//　设置值
			setBoxValue(boxID,selectAdvID);

			// 清空ｓｅｓｓｉｏｎ
			Session.set("selectAdvID",null);

		}else{

		}
	},
	'shown.bs.modal #advModal': function(e){//关闭
    	/* ... */
		var boxID = Session.get("boxID");
		var boxObj = $("#"+boxID);
		
  	},
  	"click button.js-select-adv" : function(e){//点击广告的选择框
  		var eveObj = $(e.currentTarget);
  		var selectAdvID = eveObj.data().id;
  		if(selectAdvID){
  			//　存储session 
  			Session.set("selectAdvID",selectAdvID);
  			
  			//关闭
  			Modal.hide("adPopupSelectAdv");
  		}else{
  			alert(DATA_ERROR);
  		}
  	}
});

// 设置广告内容
function setBoxValue(boxID,selectAdvID){
	var ID = new Meteor.Collection.ObjectID(selectAdvID);
	// 广告信息
	var advInfo = AdInfo.findOne({"_id":ID});
	if(advInfo){
		//设置信息
		var boxObj = $("#"+boxID);
		// 标题
		boxObj.find("input[name='advinfo']").val(advInfo.title);
		// id
		boxObj.find("input[name='advID']").val(advInfo._id._str);
	}else{
		alert(DATA_ERROR);
	}
}