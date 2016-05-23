Template.contentBoxNewsUpdate.rendered = function() {
	CKEDITOR.replace("content");

	var imageObj = Session.get("news_info").imageObj;
	for(var i=0;i<imageObj.length;i++){
		addRow(imageObj[i]);
	}
}


Template.registerHelper('selected', function(key, value){
	return key == value ? {selected:'selected'}: '';
});

function updateData(e,t,type,msg) {
		var date;
		date = new Date().Format("yyyy/MM/dd");
		var updatetime = new Date().Format("yyyy/MM/dd/hh:mm:ss");

		var Obj = new Array();
		var index = 0;
		$("input[name='checkbox']:checkbox:checked").each(function(){
			var data = $(this).val().split(",");
			var typeObj =  new  Object();
			typeObj["typeID"] = new Meteor.Collection.ObjectID(data[0]);
			typeObj["typeName"] = data[1];
			Obj[index] = typeObj;
			index++;
		});

		var Tag = new Array();
		var tagIndex = 0;
		$("input[name='tag']:checkbox:checked").each(function(){
			var tagData = $(this).val().split(",");
			var tagObj =  new  Object();
			tagObj["tagID"] = new Meteor.Collection.ObjectID(tagData[0]);
			tagObj["tagName"] = tagData[1];
			Tag[tagIndex] = tagObj;
			tagIndex++;
		});

		e.preventDefault();
		var _id         = t.find('#_id').value;
		var title       = t.find('#title').value;
		var secondTitle = t.find('#secondTitle').value;
		var introduce   = t.find('#introduce').value;
		var content     = t.find('#content').value;
		var keyWord     = t.find('#keyWord').value;
		var showRule    = t.find('#showRule').value;
		var language    = t.find('#language').value;
		var originURL   = t.find('#originURL').value;
		var copyright   = t.find('#copyright').value;
		var author      = t.find('#author').value;
		// var newsID      = t.find('#newsID').value;
		var imageObj    = getFileIds();
		var isVaild     =  parseInt(t.find('#isVaild').value);

		if(type==1){
			NewsInfo.update(
				new Meteor.Collection.ObjectID(_id),{$set:{
					"title":title,
					"secondTitle":secondTitle,
					"introduce":introduce,
					"content":content,
					"tagObj":Tag,
					"typeObj":Obj,
					"keyWord":keyWord,
					"isVaild":isVaild,
					"showRule":showRule,
					"language":language,
					"originURL":originURL,
					"copyright":copyright,
					"author":author,
					"updateTime":updatetime,
					// "newsID":newsID,
					"imageObj":imageObj
				}},function(){alert(msg);Router.go("/user/mypage/newslist");}
			);
		}else{
			if(type==2){
				var msgck = window.confirm('该条信息状将变更为发布状态！')
				 if(msgck==true){
					 NewsInfo.update(new Meteor.Collection.ObjectID(_id),{$set:{
						"title":title,
						"secondTitle":secondTitle,
						"introduce":introduce,
						"content":content,
						"tagObj":Tag,
						"typeObj":Obj,
						"keyWord":keyWord,
						"isVaild":1,
						"showRule":showRule,
						"language":language,
						"originURL":originURL,
						"copyright":copyright,
						"author":author,
						"publishTime":date,
						"updateTime":updatetime,
						// "newsID":newsID,
						"imageObj":imageObj
					}},function(){alert(msg);Router.go("/user/mypage/newslist");}
					);
				}
			}
		}
}


Template.contentBoxNewsUpdate.events({
	'submit #news_info_add_F' : function(e,t){
		updateData(e,t,1,"已更新");
	},
	'click #save' : function(e,t){
		updateData(e,t,2,"已发布");
	},
	'click #delete' : function(e,t){
		e.preventDefault();
		var _id = t.find('#_id').value;
		var del = window.confirm('该条信息删除！')
		if(del==true){
			NewsInfo.remove({_id:new Meteor.Collection.ObjectID(_id)},
			function(){Router.go("/user/mypage/newslist");}
			);
		}
	},
});