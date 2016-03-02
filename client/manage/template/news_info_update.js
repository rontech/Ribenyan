 Template.newsView.rendered = function() {
   $('#content').ckeditor();
  }

 Template.registerHelper('selected', function(key, value){
 	return key == value ? {selected:'selected'}: '';
});


    //publish_time设置
    var date;
    date = new Date().Format("yyyy/MM/dd");

    //存储类型对象
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
    //存储标签对象
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


 Template.newsView.events({
    'submit #news_info_update' : function(e,t){
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
        var newsID      = t.find('#newsID').value;
        var imageObj    = t.find('#imageObj').value;
        alert("*************");
        NewsInfo.save({_id:new Meteor.Collection.ObjectID(_id)},{//{$set:{
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
        				"newsID":newsID,
        				"imageObj":imageObj
        				},function(){
        						alert("已更新");
        						Router.go("/manage/newslist");
        					}
        				);
    },
    'click #save' : function(e,t){
        e.preventDefault();

        var _id    = t.find('#_id').value;
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
        var newsID      = t.find('#newsID').value;
        var imageObj    = t.find('#imageObj').value;
        alert("**1111***********");
        var msg = window.confirm('该条信息状将变更为发布状态！')
	    if(msg==true){
            NewsInfo.update({_id:new Meteor.Collection.ObjectID(_id)},{
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
                    "newsID":newsID,
                    "imageObj":imageObj
            },function(){
        					Router.go("/manage/newslist");
        				}
            );
        }
    },

    'click #delete' : function(e,t){
        e.preventDefault();

        var _id    = t.find('#_id').value;
        var msg = window.confirm('该条信息删除！')
	    if(msg==true){
            NewsInfo.remove({_id:new Meteor.Collection.ObjectID(_id)},
            			function(){
        					Router.go("/manage/newslist");
        				}
            );
        }
    },
});