News = new Mongo.Collection("news");

//权限判断
News.allow({
	update: function(userId, doc, fields, modifier){
		return editNewsPermisson(doc);
	},
	insert: function(userId, news, fields, modifier){
		return editNewsPermisson(doc);
	},
	remove: function(userId, news, fields, modifier){
		return editNewsPermisson(doc);
	}
});

//ｄｅｎｙ　禁止操作的条件
News.deny({
	update: function(userId, doc, fields, modifier){//此方法　参数名称　固定
		var data = News.find({title:doc.title,_id:{$ne:doc._id}}).fetch();

		console.log(data.length);

		if (data.length > 0) {
			return true;
		}else {
			return false;	
		}
	}
});

