//模板固定显示新闻数据
var defaultNum = 6;

//页面创建之前
Template.newsGridTemplate3.onCreated(function(){
	Meteor.subscribe("News",Template.currentData().typeID._str,{_id:-1},defaultNum);
});

Template.newsGridTemplate3.helpers({
	listNews :function(){//新闻列表
		//解析默认数据
		var dataObj = this.dataObj;
		var listNews = [];
		var num = defaultNum - dataObj.length;
		// 首页以存在新闻ＩＤ
		var arrayID = [];
		for (var i = 0;i<dataObj.length;i++){
			arrayID[i] = dataObj[i]._id;
			listNews[i] =  dataObj[i];
		}

		if (num > 0){
			//查询填充数据 （去除不存在新闻）
			fillData = NewsCol.find(
								{
									typeObj:{
											$elemMatch:{
												typeID: new Meteor.Collection.ObjectID(this.typeID._str)
											}
										},
									_id : {
										$nin:arrayID
									}

								},
								{
									sort:{},
									limit:num
								}
								);
			//合并数据
			listNews = listNews.concat(fillData.fetch());
		}
		return listNews;
	}
});

