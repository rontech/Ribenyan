Template.popupViewUploadImage.events({
	"hide.bs.modal #newsModal" : function(e){//弹出框关闭
		var boxID = Session.get("boxID");
		var selectImageID = Session.get("selectImageID");

		if(selectImageID){
			//获取图片ID
			var dFile = Files.findOne({_id:selectImageID});

			var imaObj = $("#"+boxID).find("img");
			// 设置图片信息
			imaObj.attr("src",dFile.url);
			imaObj.data("imageid",selectImageID);

			// 清空ｓｅｓｓｉｏｎ
			Session.set("selectImageID",null);
			Session.set("boxID",null);

		}else{
		}
	},
	'shown.bs.modal #newsModal': function(e){//关闭
    	/* ... */
		var boxID = Session.get("boxID");
		var boxObj = $("#"+boxID);
		
  	},
});