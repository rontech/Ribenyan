Template.userParise.created = function() {
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

Template.userParise.helpers({
	tables : function () {
		var userObj = Meteor.user();
		return NewsEvaluationCol.find({
			isVaild:1,
			userID:userObj._id,
			evaType:{$in:["4","5"]}
		});
	},
	tableSettings : function () {
		return {
			rowsPerPage: 10,
			showNavigation: 'auto',
			showColumnToggles: false,
			fields: [
				{
					key: 'newsTitle',
					label: '标题',
					headerClass: '',
					cellClass:'',
					fn: function (name,object) {
					 var html = '<a href="/news/detail/' + object.newsID + '">' + name + '</a>';
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
						var html = '<div class="text-right"><a href="/news/detail/' + object.newsID + '"><button name="delete" class="btn btn-info" value="' + object._id  + '">查看</button></a></div>';
						return new Spacebars.SafeString(html);
					}
				}

			]
		};
	}
});

