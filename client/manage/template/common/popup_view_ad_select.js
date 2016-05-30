Template.popupViewAdvSelect.created = function() {
    ckPerms('ctrlperms');
}
// 广告弹出选择
Template.popupViewAdvSelect.helpers({
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
	          	key: 'showRule', 
	          	label: '类型',
	          	fn:function(value,object,key){
	          		var name = "";
		          	switch (value) {
		          		case "1" :
		          			name = "卖房";
		          			break;
		          		case "2" :
		          			name = "房屋出租";
		          			break;
		          		case "3" :
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

Template.popupViewAdvSelect.events({
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
  			Modal.hide("popupViewAdvSelect");

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

	//设置信息
	var boxObj = $("#"+boxID);
	if(advInfo){
		
		if(boxObj.find("input[name='advID']").length >0){//二级列表
			// 标题
			boxObj.find("input[name='advinfo']").val(advInfo.title);
			// id
			boxObj.find("input[name='advID']").val(advInfo._id._str);
		}else{//模块信息

			// 标题
			var titleInput = boxObj.find("input[name=title]");
			titleInput.val(advInfo.title);

			//二级标题
			var introduceInput = boxObj.find("input[name=introduce]");
			introduceInput.val(advInfo.resume);
			// 图片

			// 默认为第一个
			var imageid = advInfo.imageObj[0];
			var imageUrl = getImagePathByID(imageid);

			//图片显示
			var imageObj = boxObj.find("img.js-selectImage");
			imageObj.data("imageid",imageid);
			imageObj.attr("src",imageUrl);

			//按钮
			var imageButObj = boxObj.find("button.js-select-old-image");
			imageButObj.data("imageid",imageid);
			imageButObj.css("display","inline");

			// 广告ＩＤ
			var advIdInput = boxObj.find("input[name=evaid]");
			advIdInput.val(advInfo._id._str);

			//link - 需要修改
			var newsLink = Meteor.absoluteUrl('adv/details/' + advInfo._id._str);
			var newslinkInput = boxObj.find("input[name=siteinlink]");
			newslinkInput.val(newsLink);

		}
		
	}else{
		alert(DATA_ERROR);
	}
}