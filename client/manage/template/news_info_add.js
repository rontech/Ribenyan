
 Template.newsInfoAdd.rendered = function() {
   $('#content').ckeditor();
 };

function saveData(e,t,type,msg) {
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


        e.preventDefault();
        var sourceID    = t.find('#sourceID').value;
        var title       = t.find('#title').value;
        var secondTitle = t.find('#secondTitle').value;
        var introduce   = t.find('#introduce').value;
        var content     = t.find('#content').value;
        var tagObj      = t.find('#tagObj').value;
        var keyWord     = t.find('#keyWord').value;
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
                        "typeObj":Obj,
                        "keyWord":keyWord,
                        "isVaild":type,
                        "showRule":showRule,
                        "language":language,
                        "originURL":originURL,
                        "copyright":copyright,
                        "author":author,
                        "newsID":newsID,
                        "imageObj":imageObj
                        },function(){
                            alert(msg);
                            Router.go("/manage/newslist");
                        });
}

 Template.newsInfoAdd.events({
    'submit #news_info_add' : function(e,t){
        saveData(e,t,1,"已发布");
    },
    'click #save' : function(e,t){
       saveData(e,t,2,"已保存，未发布！");
    },
});


