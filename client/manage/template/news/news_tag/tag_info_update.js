Template.tagUpdate.created = function() {   
   ckPerms('newsperms');
}
Template.tagUpdate.rendered = function() {   

}
Template.tagUpdate.events({
	'submit #tag_info_update' : function(e,t){
		e.preventDefault();
		var _id      = t.find('#_id').value;
		var type     = t.find('#type').value;
		var name     = t.find('#name').value;
		var isVaild  = parseInt(t.find('#isVaild').value);
		var note     = t.find('#note').value;
		TagInfo.update(
			new Meteor.Collection.ObjectID(_id),{$set:{
				"type":type,
				"name":name,
				"isVaild":isVaild,
				"note":note
			}},
			function(){
				alert("已更新");Router.go("/manage/taglist");
			}
		);
	},
	'click #delete' : function(e,t){
		e.preventDefault();
		var _id = t.find('#_id').value;
		var del = window.confirm('该条信息删除！')
		if(del==true){
			TagInfo.remove({
					_id:new Meteor.Collection.ObjectID(_id
			)},
			function(){
				alert("已删除");Router.go("/manage/taglist");
			}
			);
		}
	},
});