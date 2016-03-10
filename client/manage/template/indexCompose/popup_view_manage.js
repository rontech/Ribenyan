Template.popupViewManage.events({
	"hide.bs.modal #newsModal" : function(e){//弹出框关闭
		console.log("弹出矿关闭");
		var boxID = Session.get("boxID");
		var boxObj = $("#"+boxID);
		
	},
	'shown.bs.modal #newsModal': function(e){//关闭
    	/* ... */
		console.log("弹出矿打开");
		var boxID = Session.get("boxID");
		var boxObj = $("#"+boxID);
		
  	}
});