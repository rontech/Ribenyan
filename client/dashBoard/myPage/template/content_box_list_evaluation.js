Template.userEval.created = function() {
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

Template.userEval.helpers({
	tables : function () {
		var userObj = Meteor.user();
		return NewsEvaluationCol.find({
			isVaild:1,
			userID:userObj._id,
			evaType:{$in:["1","3"]}
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
				// { key: 'secondTitle', label: '副标题', fn: Common},
				// { key: 'introduce', label: '简介', fn: Common},
				{ key: 'updateTime', fn: Common, sortOrder: 0, sortDirection: 'descending',hidden: true},
				{ key: 'content', label: '评论',cellClass: 'text-nowrap',headerClass:'text-nowrap', fn: delField},
				{
					key: '',
					label: '',
					sortable: false,
					headerClass: 'span1',
					fn: function (name,object) {
					 var html = '<div class="text-right"><button name="delete" class="btn btn-danger" value="' + object._id  + '">删除</button></div>';
						return new Spacebars.SafeString(html);
					}
				}
			]
		};
	}
});

Template.userEval.events({
	'click [name=delete]': function (ev) {
		ev.preventDefault();
		var del = window.confirm('该条信息删除！')
		if(del==true){
			var id = ev.currentTarget.value;
			// var newsdata = NewsEvaluationCol.findOne({_id:new Meteor.Collection.ObjectID(id)});
			// console.log(newsdata);
			// var imageObj = newsdata.imageObj;
			// for(var i=0;i<imageObj.length;i++){
			// 	Files.remove(imageObj[i]);
			// }
			NewsEvaluationCol.remove({_id:new Meteor.Collection.ObjectID(id)});
		}
	}
});