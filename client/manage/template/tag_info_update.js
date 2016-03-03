Template.tagUpdate.events({
    'submit #tag_info_update' : function(e,t){
        e.preventDefault();
        var _id      = t.find('#_id').value;
        var type     = t.find('#type').value;
        var name     = t.find('#name').value;
        var isVaild  = parseInt(t.find('#isVaild').value);
        var note     = t.find('#note').value;
        TagInfo.update(
                new Meteor.Collection.ObjectID(_id),{
                    "type":type,
                    "name":name,
                    "isVaild":isVaild,
                    "note":note
                },function(){alert("已更新");Router.go("/manage/taglist");}
            );
    },
});