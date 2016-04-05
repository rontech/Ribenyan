i18n.setLanguage('zh');
Template.tagListTable.created = function() {
	ckPerms('newsperms');
}
Template.tagList.created = function() {
	ckPerms('newsperms');
}
Template.tagListTable.rendered = function() {

}

var noteField = function (value) {
	var html;
	if (value === null || value === undefined) {
		html = '<span style="color: orange; font-weight: bold"></span>';
	} else {
		html = '<span style="color: lightblue">' + value + '</span>';
	}
	return new Spacebars.SafeString(html);
};

var typeField = function (value) {
	var html;
	if (value === null || value === undefined) {
		html = '<span style="color: orange; font-weight: bold"></span>';
	} else {
		switch (value){
			case "1":
				value = "新闻";
				break;
			case "2":
				value = "用户";
				break;
			case "3":
				value = "评论";
				break;
		}
		html = '<span style="color: ">' + value + '</span>';
	}
	return new Spacebars.SafeString(html);
};

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

Template.tagListTable.helpers({
	tagTables : function () {
		return TagInfo.find();
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
						var html = '<a href="/manage/taglist/' + object._id + '">' + name + '</a>';
						return new Spacebars.SafeString(html);
					}
				},
				{ key: 'type', label: '类型', fn: typeField},
				{ key: 'isVaild', label: '状态', fn: delField},
				{ key: 'note', label: '备注', fn: noteField}
			]
		};
	}
});

