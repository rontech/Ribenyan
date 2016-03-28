// 广告投放信息
SetingAdvInfo = new Mongo.Collection("bus_setting_advertisement_info",{ idGeneration: "MONGO" });

//权限判断
SetingAdvInfo.allow({
	update: function(userId, doc, fields, modifier){
		return false;
	},
	insert: function(userId, doc, fields, modifier){
		return false;
	},
	remove: function(userId, doc, fields, modifier){
		return false;
	}
});

//ｄｅｎｙ　禁止操作的条件
SetingAdvInfo.deny({
	update: function(userId, doc, fields, modifier){//此方法　参数名称　固定
		return false;
	}
});
