Template.manageUserUpdate.created = function() {
    ckPerms('ctrlperms');
}
Template.manageUserUpdate.rendered = function() {   

}

Template.manageUserUpdate.events({
    'submit #manageuserupdate-form' : function(e,t){
        var updatetime = new Date().Format("yyyy/MM/dd/hh:mm:ss");
        e.preventDefault();
        var _id       = t.find('#_id').value;
        var username  = t.find('#username').value;
        var email     = t.find('#email').value;
        var tel       = t.find('#tel').value;
        var role      = t.find('#role').value;
        var newsperms = t.find('#newsperms').value;
        var adperms   = t.find('#adperms').value;
        var ctrlperms = t.find('#ctrlperms').value;

        AdminInfo.update(new Meteor.Collection.ObjectID(_id),{$set:{
                        "username":username,
                        "email":email,
                        "tel":tel,
                        "role":role,
                        "newsperms":newsperms,
                        "adperms":adperms,
                        "ctrlperms":ctrlperms,
                        "updateTime":updatetime
                    }},function(){alert("已更新");Router.go("/manage/managelist/");}
                    );
    },
    'click #delete' : function(e,t){
        e.preventDefault();
        var _id    = t.find('#_id').value;
        var del = window.confirm('该条信息删除！')
	    if(del==true){
            AdminInfo.remove({_id:new Meteor.Collection.ObjectID(_id)},
			function(){Router.go("/manage/managelist/");}
            );
        }
    },
});