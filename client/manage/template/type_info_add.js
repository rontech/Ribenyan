Template.typeInfoAdd.rendered = function() {   
   var tmp =   sessionStorage.getItem('login_user');//Session.get("login_user");
   console.log(tmp);
   if(tmp==null){
      Router.go("/managelogin");
   }
}

Template.typeInfoAdd.events({
    'submit #type_info_add' : function(e,t){
        e.preventDefault();
        var parentID = t.find('#parentID').value;
        var name     = t.find('#name').value;
        var isVaild  = parseInt(t.find('#isVaild').value);
        var remark   = t.find('#remark').value;

        TypeInfo.insert({
        				"parentID":parentID,
            			"name":name,
        				"isVaild":isVaild,
        				"remark":remark,
        				},function(){
                                alert("已保存");
                        });
    },
});