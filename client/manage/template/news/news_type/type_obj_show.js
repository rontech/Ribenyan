Template.typeShow.created = function() {   
	ckPerms('newsperms');
}

Template.typeShow.helpers({
	typelists: function() {
		return TypeInfo.find({isVaild:1}).fetch();
	},
});

Template.typeShow.helpers({
	checked: function() {
		var types = Session.get("news_info").typeObj
		for(var i = 0;i<types.length;i++){
			if(this._id._str === types[i].typeID._str) {
				return "checked";
			}
		}
		return "";
	}
});

Template.userTypeShow.helpers({
	typelists: function() {
		var user = sessionStorage.getItem('login_user');
		var result =  AdminInfo.find({_id:new Meteor.Collection.ObjectID(user)}).fetch();
		console.log(result[0].newsblockperms);
		var id = new Array();
		for(var i=0;i<result[0].newsblockperms.length;i++){
			id[i] = result[0].newsblockperms[i].typeID;
		}
		console.log(id);
		return TypeInfo.find({'_id':{$in:id},isVaild:1}).fetch(); 
	},
});

Template.userTypeShow.helpers({
		checked: function() {
		var types = Session.get("news_info").typeObj
		for(var i = 0;i<types.length;i++){
			if(this._id._str === types[i].typeID._str) {
				return "checked";
			}
		}
		return "";
	}
});
