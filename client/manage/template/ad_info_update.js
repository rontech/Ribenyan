 Template.adInfoUpdate.rendered = function() {
   $('#content').ckeditor();
   $('#introduce').ckeditor();
   var tmp =   sessionStorage.getItem('login_user');//Session.get("login_user");
   console.log(tmp);
   if(tmp==null){
      Router.go("/managelogin");
   }
 };

function updateData(e,t,type,msg) {
        var date;
        date = new Date().Format("yyyy/MM/dd");

        e.preventDefault();
        var _id         = t.find('#_id').value;
        var title       = t.find('#title').value;
        var introduce   = t.find('#introduce').value;
        var content     = t.find('#content').value;
        var cstId       = t.find('#cstId').value;

        AdInfo.update(
            new Meteor.Collection.ObjectID(_id),{$set:{
                "title":title,
                "introduce":introduce,
                "content":content,
                "cstId":cstId,

            }},function(){alert(msg);Router.go("/manage/adlist");}
        );
}

 Template.adInfoUpdate.events({
    'submit #ad_info_update' : function(e,t){
        updateData(e,t,1,"已更新");
    },
    'click #delete' : function(e,t){
        e.preventDefault();
        var _id    = t.find('#_id').value;
        var del = window.confirm('该条信息删除！')
	    if(del==true){
            NewsInfo.remove({_id:new Meteor.Collection.ObjectID(_id)},
			function(){Router.go("/manage/adlist");}
            );
        }
    },
});