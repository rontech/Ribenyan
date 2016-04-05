i18n.setLanguage('zh');
Template.manageUserList.created = function() {
	ckPerms('ctrlperms');
}

//通用显示
varCommon = function (value) {
	var html;
	// first, normalize the value to a canonical interpretation
	if (typeof value === 'boolean')
		value = {
			support: value
		};
	if (value === null || value === undefined || value ==="") {
		html = '<span style="color: orange; font-weight: bold">待输入</span>';
	} else {
		html = '<span>' + value + '</span>';
	}
	return new Spacebars.SafeString(html);
};

Template.manageListTable.helpers({
	tables : function () {
		return AdminInfo.find();
	},

	tableSettings : function () {
		return {
			rowsPerPage: 10,
			showNavigation: 'auto',
			showColumnToggles: false,
			fields: 
			[
				{
					key: 'username',
					label: '账号',
					headerClass: '',
					cellClass:'',
					fn: function (name,object) {var html = '<a href="/manage/managelist/' + object._id + '">' + name + '</a>';return new Spacebars.SafeString(html);}
				},
				{ key: 'email', label: '邮箱', fn: Common},
				{ key: 'tel', label: '电话', fn: Common},
				{ key: 'updateTime', fn: Common, sortOrder: 0, sortDirection: 'descending',hidden: true},
				{
					key: '',
					label: '',
					sortable: false,
					headerClass: 'span1',
					fn: function (name,object) {var html = '<div class="text-right"><a class="btn btn-info" href="/manage/managelist/' + object._id + '">编辑</a><button name="delete" class="btn btn-danger" value="' + object._id  + '">删除</button></div>';return new Spacebars.SafeString(html);
					}
				}
			]
		};
	}
});

Template.manageListTable.events({
	'click [name=delete]': function (ev) {
		ev.preventDefault();
		var del = window.confirm('该条信息删除！')
		if(del==true){
			var id = ev.currentTarget.value;
			AdminInfo.remove({_id:new Meteor.Collection.ObjectID(id)});
		}
	}
});