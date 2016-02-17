//模板固定显示新闻数据
var defaultNum = 6;

//页面创建之前
Template.newsGridTemplate3.onCreated(function(){
	Meteor.subscribe("News",Template.currentData().typeID._str,{_id:-1},defaultNum);
});

Template.newsGridTemplate3.helpers({
	listNews :function(){//新闻列表
		//解析默认数据
		var data = this.dataObj.data;
		var num = defaultNum - data.length;
		if (num > 0){
			console.log(this.typeID._str);
			//查询填充数据 
			fillData = News.find(
								{
									typeID:Meteor.Collection.ObjectID(this.typeID._str)
								},
								{
									sort:{},
									limit:num
								}
								);
			//合并数据
			console.log(fillData.fetch());
			data = data.concat(fillData.fetch());
		}
		return data;
	}
});