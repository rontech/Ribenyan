Template.contentBox.created = function() {
    if(!Meteor.user()){
        Router.go("/user/login")
    }
}

Template.contentBox.rendered = function() {
    CKEDITOR.replace("content");

    $('input').iCheck({
        labelHover : false,
        cursor : true,
        checkboxClass : 'icheckbox_square-grey',
        radioClass : 'iradio_square-blue',
        increaseArea : '20%'
    })
}


function saveData1(e,t,type,msg) {
    //console.log(e);
    var date;
    var createtime = new Date().Format("yyyy/MM/dd/hh:mm:ss");
    if(type==1) {
        date = new Date().Format("yyyy/MM/dd");
    }else{
        date = "";
    }
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
    var attribute   = $('#attribute').val();
    // var newsID   = t.find('#newsID').value;
    var imageObj = getFileIds();


    NewsInfo.insert({
        "sourceID":[],
        "title":title,
        "secondTitle":secondTitle,
        "introduce":introduce,
        "content":content,
        "tagObj":Tag,
        "typeObj":Obj,
        "keyWord":keyWord,
        "isVaild":type,
        "showRule":showRule,
        "language":language,
        "originURL":originURL,
        "copyright":copyright,
        "author":author,
        "publishTime":date,
        "createTime":createtime,
        "updateTime":createtime,
        // "newsID":newsID,
        "imageObj":imageObj,
        "from"  : 1,     //1:mypage   0:manage
        "attribute":attribute
    },function(){
        alert(msg);
        Router.go("/index");
    });
}

Template.contentBox.events({
    'submit #news_info_add_F' : function(e,t){
        saveData1(e,t,1,"已发布");
    },
    'click #save' : function(e,t){
        saveData1(e,t,2,"已保存，未发布！");
    },
});


