Template.manageUserUpdate.created = function() {
    ckPerms('ctrlperms');
}
Template.manageUserUpdate.rendered = function() {   
    $("#newsCtrl").hide();
    if($("#newsperms").val()=="1"){
        $("#newsCtrl").show();
    }
}

Template.manageUserUpdate.events({
    'submit #manageuserupdate-form' : function(e,t){
        var updatetime = new Date().Format("yyyy/MM/dd/hh:mm:ss");
        e.preventDefault();

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
                        "newsblockperms":Obj,
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
    'change #newsperms' : function(e,t){
      e.preventDefault();
      var newsperms   = t.find('#newsperms').value;
      if(newsperms=="1"){
        $("#newsCtrl").show();
      }else{
        $("#newsCtrl").hide();
      }
    },
});