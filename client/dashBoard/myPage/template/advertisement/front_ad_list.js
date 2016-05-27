Template.userAd.created = function() {
	//ckPerms('newsperms');
};

i18n.setLanguage('zh');

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
	} else {
		html = '<span>' + value + '</span>';
	}
	return new Spacebars.SafeString(html);
};

//显示状态
var delField = function (value) {
	var html;
	if (value === null || value === undefined) {
		html = '<span Class:"text-nowrap" style="color: orange; font-weight: bold"></span>';
	} else {
			switch (value){
				case 1:
						value = "正常";
						break;
				case 2:
						value = "未发表";
						break;
				case 0:
						value = "已删除";
						break;
			}
			html = '<span Class:"text-nowrap">' + value + '</span>';
	}
	return new Spacebars.SafeString(html);
};

Template.userAd.helpers({
	tables : function () {
		var userObj = Meteor.user();
		return AdInfo.find({
			cstId:userObj._id,
		});
	},
	tableSettings : function () {
		return {
			rowsPerPage: 10,
			showNavigation: 'auto',
			showColumnToggles: false,
			fields: [
				{
					key: 'title',
					label: '标题',
					headerClass: '',
					cellClass:'',
					fn: function (name,object) {
					 var html = '<a href="/adv/details/' + object._id + '">' + name + '</a>';
						return new Spacebars.SafeString(html);
					}
				},
				{ key: 'updateTime', fn: Common, sortOrder: 0, sortDirection: 'descending',hidden: true},
				{
					key: '',
					label: '',
					sortable: false,
					headerClass: 'span1',
					fn: function (name,object) {
						var html = '<div class="text-right"><a class="btn btn-info" href="/user/adupdate/' + object._id + '">编辑</a><button name="delete" class="btn btn-danger" value="' + object._id  + '">删除</button></div>';
						return new Spacebars.SafeString(html);
					}
				}

			]
		};
	}
});

Template.userAd.events({
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

