Template.adInfoUpdate.created = function() {
	ckPerms('adperms');
}
Template.adInfoUpdate.rendered = function() {
	CKEDITOR.replace("content");
	CKEDITOR.replace("introduce");
	var imageObj = Session.get("ad_info").imageObj;
	console.log(Session.get("ad_info"));
	for(var i=0;i<imageObj.length;i++){
		addRow(imageObj[i]);
	}
};

function updateData(e,t,type,msg) {
	e.preventDefault();
	var date       = new Date().Format("yyyy/MM/dd");
	var updatetime = new Date().Format("yyyy/MM/dd/hh:mm:ss");
	var _id        = t.find('#_id').value;
	var title      = t.find('#title').value;
	var introduce  = t.find('#introduce').value;
	var content    = t.find('#content').value;
	var showRule   = t.find('#showRule').value;
	var cstId      = t.find('#cstId').value;
	var imageObj   = getFileIds();

	AdInfo.update(
		new Meteor.Collection.ObjectID(_id),{$set:{
			"title":title,
			"introduce":introduce,
			"content":content,
			"showRule":showRule,
			"cstId":cstId,
			"updateTime":updatetime,
			"imageObj":imageObj
		}},function(){alert(msg);Router.go("/manage/adlist");}
	);
}

Template.adInfoUpdate.events({
	'submit #ad_info_update' : function(e,t) {
		updateData(e,t,1,"已更新");
	},
	'click #delete' : function(e,t) {
		e.preventDefault();
		var _id    = t.find('#_id').value;
		var del = window.confirm('该条信息删除！')
		if(del == true){
			AdInfo.remove({
				_id:new Meteor.Collection.ObjectID(_id)},
				function(){Router.go("/manage/adlist");
			});
		}
	},
});