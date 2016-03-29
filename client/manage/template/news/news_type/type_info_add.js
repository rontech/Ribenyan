Template.typeInfoAdd.created = function() {   
   ckPerms('newsperms');
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