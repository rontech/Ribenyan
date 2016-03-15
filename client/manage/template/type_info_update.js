Template.typeUpdate.rendered = function() {   
   var tmp =   sessionStorage.getItem('login_user');//Session.get("login_user");
   console.log(tmp);
   if(tmp==null){
      Router.go("/managelogin");
   }
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
                new Meteor.Collection.ObjectID(_id),{
                    "parentID":parentID,
                    "name":name,
                    "isVaild":isVaild,
                    "remark":remark
                },function(){alert("已更新");Router.go("/manage/typelist");}
            );
    },
});