Template.adInfoDel.rendered = function() {
	var msgck = window.confirm('该条信息将被删除！');
	if(msgck==true){
		var _id = $("#_id").val();
    	AdInfo.remove({_id:new Meteor.Collection.ObjectID(_id)},
			function(){Router.go("/manage/adlist");alert("删除成功");}
        );
    }else{
    	Router.go("/manage/adlist");
    }
}