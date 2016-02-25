(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/bus_news_info.js                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
NewsCol = new Mongo.Collection("bus_news_info", { idGeneration: "MONGO" });
                                                                       //
//权限判断                                                                 //
NewsCol.allow({                                                        // 4
	update: function (userId, doc, fields, modifier) {                    // 5
		return editNewsPermisson(doc);                                       // 6
	},                                                                    //
	insert: function (userId, news, fields, modifier) {                   // 8
		return editNewsPermisson(doc);                                       // 9
	},                                                                    //
	remove: function (userId, news, fields, modifier) {                   // 11
		return editNewsPermisson(doc);                                       // 12
	}                                                                     //
});                                                                    //
                                                                       //
//ｄｅｎｙ　禁止操作的条件                                                         //
NewsCol.deny({                                                         // 17
	update: function (userId, doc, fields, modifier) {                    // 18
		//此方法　参数名称　固定                                                        //
		var data = NewsCol.find({ title: doc.title, _id: { $ne: doc._id } }).fetch();
                                                                       //
		console.log(data.length);                                            // 21
                                                                       //
		if (data.length > 0) {                                               // 23
			return true;                                                        // 24
		} else {                                                             //
			return false;                                                       // 26
		}                                                                    //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=bus_news_info.js.map
