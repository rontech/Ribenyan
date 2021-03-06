i18n.setLanguage('zh');
Template.typeListTable.created = function() {   
	ckPerms('newsperms');
}
Template.typeList.created = function() {   
	ckPerms('newsperms');
}

//显示备注
var noteField = function (value) {
	var html;
	if (value === null || value === undefined) {
		html = '<span style="color: orange; font-weight: bold"></span>';
	} else {
		html = '<span style="color: lightblue">' + value + '</span>';
	}
	return new Spacebars.SafeString(html);
};

//显示类型
var parentIDField = function (value) {
	var html;
	if (value === null || value === undefined) {
		html = '<span style="color: orange; font-weight: bold"></span>';
	} else {
		html = '<span style="color: ">' + value + '</span>';
	}
	return new Spacebars.SafeString(html);
};

//显示状态
var delField = function (value) {
	var html;
	if (value === null || value === undefined) {
		html = '<span style="color: orange; font-weight: bold"></span>';
	} else {
		switch (value){
			case 1:
				value = "正常";
				break;
			case 0:
				value = "已删除";
				break;
		}
		html = '<span style="color: ">' + value + '</span>';
	}
	return new Spacebars.SafeString(html);
};


Template.typeListTable.helpers({
	typeTables : function () {
		return TypeInfo.find();
	},

	tableSettings : function () {
		return {
			rowsPerPage: 5,
			showNavigation: 'auto',
			showColumnToggles: false,
			fields: [
				{
					key: 'name',
					label: '名称',
					fn: function (name,object) {
						var html = '<a href="/manage/typelist/' + object._id + '">' + name + '</a>';
						return new Spacebars.SafeString(html);
					}
				},
				{ key: 'parentID', label: '父ID', fn: parentIDField},
				{ key: 'isVaild', label: '状态', fn: delField},
				{ key: 'remark', label: '备注', fn: noteField}
			]
		};
	}
});

