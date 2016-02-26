 Template.newsView.rendered = function() {
   $('#content').ckeditor();
  }

 Template.registerHelper('selected', function(key, value){
 	return key == value ? {selected:'selected'}: '';
});

 Template.newsView.events({
    'submit #news_info_update' : function(e,t){
        e.preventDefault();
        
        var _id    = t.find('#_id').value;
        var sourceID    = t.find('#sourceID').value;
        var title       = t.find('#title').value;
        var secondTitle = t.find('#secondTitle').value;
        var introduce   = t.find('#introduce').value;
        var content     = t.find('#content').value;
        var tagObj      = t.find('#tagObj').value;
        var typeObj     = t.find('#typeObj').value;
        var keyWord     = t.find('#keyWord').value;
        var isVaild     = t.find('#isVaild').value;
        var showRule    = t.find('#showRule').value;
        var language    = t.find('#language').value;
        var originURL   = t.find('#originURL').value;
        var copyright   = t.find('#copyright').value;
        var author      = t.find('#author').value;
        var newsID      = t.find('#newsID').value;
        var imageObj    = t.find('#imageObj').value;

        NewsInfo.update({_id:new Meteor.Collection.ObjectID(_id)},{
        				"sourceID":sourceID,
        				"title":title,
        				"secondTitle":secondTitle,
            			"introduce":introduce,
        				"content":content,
        				"tagObj":tagObj,
        				"typeObj":typeObj,
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
        var sourceID    = t.find('#sourceID').value;
        var title       = t.find('#title').value;
        var secondTitle = t.find('#secondTitle').value;
        var introduce   = t.find('#introduce').value;
        var content     = t.find('#content').value;
        var tagObj      = t.find('#tagObj').value;
        var typeObj     = t.find('#typeObj').value;
        var keyWord     = t.find('#keyWord').value;
        var showRule    = t.find('#showRule').value;
        var language    = t.find('#language').value;
        var originURL   = t.find('#originURL').value;
        var copyright   = t.find('#copyright').value;
        var author      = t.find('#author').value;
        var newsID      = t.find('#newsID').value;
        var imageObj    = t.find('#imageObj').value;

        var msg = window.confirm('该条信息状将变更为发布状态！')
	    if(msg==true){
            NewsInfo.update({_id:new Meteor.Collection.ObjectID(_id)},{
                    "sourceID":sourceID,
                    "title":title,
                    "secondTitle":secondTitle,
                    "introduce":introduce,
                    "content":content,
                    "tagObj":tagObj,
                    "typeObj":typeObj,
                    "keyWord":keyWord,
                    "isVaild":1,
                    "showRule":showRule,
                    "language":language,
                    "originURL":originURL,
                    "copyright":copyright,
                    "author":author,
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