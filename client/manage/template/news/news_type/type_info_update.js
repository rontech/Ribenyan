Template.typeUpdate.created = function() {   
   ckPerms('newsperms');
}

Template.typeUpdate.events({
    'submit #type_info_update' : function(e,t){
        e.preventDefault();
        var _id       = t.find('#_id').value;
        var parentID  = t.find('#parentID').value;
        var name      = t.find('#name').value;
        var isVaild   = parseInt(t.find('#isVaild').value);
        var remark    = t.find('#remark').value;
        TypeInfo.update(
                new Meteor.Collection.ObjectID(_id),{$set:{
                    "parentID":parentID,
                    "name":name,
                    "isVaild":isVaild,
                    "remark":remark
                }},function(){alert("已更新");Router.go("/manage/typelist");}
            );
    },
    'click #delete' : function(e,t){
        e.preventDefault();
        var _id    = t.find('#_id').value;
        var del = window.confirm('该条信息删除！')
      if(del==true){
            TypeInfo.remove({_id:new Meteor.Collection.ObjectID(_id)},
      function(){alert("已删除");Router.go("/manage/typelist");}
            );
        }
    },
});