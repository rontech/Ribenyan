i18n.setLanguage('zh');

Template.adListTable.created = function() {
	ckPerms('adperms');
}

Template.adList.created = function() {
	ckPerms('adperms');
}

Template.adListTable.rendered = function() {
}

Template.adListTable.role = function (q) {
	return sessionStorage.getItem('role') === q;
};

//通用显示
var Common = function (value) {
	var html;
	// first, normalize the value to a canonical interpretation
	if (typeof value === 'boolean')
		value = {
			support: value
		};
	if (value === null || value === undefined) {
		html = '<span style="color: orange; font-weight: bold">?</span>';
	}else {
		html = '<span>' + value + '</span>';
	}
	return new Spacebars.SafeString(html);
};

Template.adListTable.helpers({
	adTables : function () {
		return AdInfo.find();
	},
	advTables : function () {
		var login_user = sessionStorage.getItem('login_user');
		return AdInfo.find({"cstId":login_user});
	},
	tableSettings : function () {
		return {
			rowsPerPage: 10,
			showNavigation: 'auto',
			showColumnToggles: false,
			fields: [
				{
					key: 'title',
					label: '名称',
					headerClass: '',
					cellClass:'',
					fn: function (name,object) {
						var html = '<a href="/manage/adview/' + object._id + '">' + name + '</a>';
						return new Spacebars.SafeString(html);
					}
				},
				{
					key: 'cstId',
					label: '客户账号',
					headerClass: '',
					cellClass:'',
					fn: function (name,object) {
						var tmp = AdminInfo.find({_id:new Meteor.Collection.ObjectID(name)}).fetch();
						var html = '<span>' + tmp[0].username + '</span>';
						return new Spacebars.SafeString(html);
					}
				},
				{
					key: '',
					label: '',
					sortable: false,
					headerClass: 'span1',
					fn: function (name,object) {
						var html = '<div class="text-right"><a class="btn btn-info" href="/manage/adlist/' + object._id + '">编辑</a><button name="delete" class="btn btn-danger" value="' + object._id  + '">删除</button></div>';
						return new Spacebars.SafeString(html);
					}
				},
				{ key: 'updateTime', fn: Common, sortOrder: 0, sortDirection: 'descending',hidden: true}
			]
		};
	}
});

Template.adList.events({
	'click [name=delete]': function (ev) {
		ev.preventDefault();
		var del = window.confirm('该条信息删除！')
		if(del==true){
			var id = ev.currentTarget.value;
			var addata = AdInfo.findOne({_id:new Meteor.Collection.ObjectID(id)});
			var imageObj = addata.imageObj;
			for(var i=0;i<imageObj.length;i++){
				Files.remove(imageObj[i]);
			}
			AdInfo.remove({_id:new Meteor.Collection.ObjectID(id)});
		}
	}
});
