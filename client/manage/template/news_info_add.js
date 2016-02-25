
 Template.newsInfoAdd.rendered = function() {
   $('#content').ckeditor();
 };

 Template.newsInfoAdd.events({
    'submit #news_info_add' : function(e,t){
        e.preventDefault();
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

        NewsInfo.insert({
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
        				});

    },
    'click #save' : function(e,t){
        e.preventDefault();
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

        var msg = window.confirm('该条信息状态将变更为“3.未发布”，并保存。')
	    if(msg==true){
                NewsInfo.insert({
                        "sourceID":sourceID,
                        "title":title,
                        "secondTitle":secondTitle,
                        "introduce":introduce,
                        "content":content,
                        "tagObj":tagObj,
                        "typeObj":typeObj,
                        "keyWord":keyWord,
                        "isVaild":3,
                        "showRule":showRule,
                        "language":language,
                        "originURL":originURL,
                        "copyright":copyright,
                        "author":author,
                        "newsID":newsID,
                        "imageObj":imageObj
                });
        }
    },
});


