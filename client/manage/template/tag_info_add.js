Template.tagInfoAdd.rendered = function() {   
   var tmp =   sessionStorage.getItem('login_user');//Session.get("login_user");
   console.log(tmp);
   if(tmp==null){
      Router.go("/managelogin");
   }
}

Template.tagInfoAdd.events({
    'submit #tag_info_add' : function(e,t){
        e.preventDefault();
        var type    = t.find('#type').value;
        var name    = t.find('#name').value;
        var isVaild = parseInt(t.find('#isVaild').value);
        var note    = t.find('#note').value;
        var tagIcon = t.find('#tagIcon').value;
        // console.log(type,name,isVaild,note,tagIcon);
        TagInfo.insert({
        				"type":type,
            			"name":name,
        				"isVaild":isVaild,
        				"note":note,
                        "tagIcon":tagIcon
        				},function(){
                                alert("已保存");
                        });
    },
});