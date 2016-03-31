Template.manageUserAdd.created = function() {
    ckPerms('ctrlperms');
}
Template.manageUserAdd.rendered = function() {
	$("#newsCtrl").hide();
}

Template.manageUserAdd.events({
    'submit #manageuseradd-form' : function(e,t){
        var createtime = new Date().Format("yyyy/MM/dd/hh:mm:ss");
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
		
        var username = t.find('#username').value;
        var pwd = t.find('#pwd').value;
        var pwdq = t.find('#pwdq').value;
        var email = t.find('#email').value;
        var tel = t.find('#tel').value;
        var role = t.find('#role').value;
        var newsperms = t.find('#newsperms').value;
        var adperms = t.find('#adperms').value;
        var ctrlperms = t.find('#ctrlperms').value;
		


        if(pwd==pwdq){
            pwd = $.md5(pwd); 
            AdminInfo.insert({
            "username":username,
            "pwd":pwd,
            "email":email,
            "tel":tel,
            "role":role,
            "newsperms":newsperms,
            "newsblockperms":Obj,
            "adperms":adperms,
            "ctrlperms":ctrlperms,
            "updateTime":createtime,
            "createTime":createtime
            },function(){
                alert("录入成功");
                Router.go("/manage/managelist");
             });
        }else{
            alert("密码输入不一致，请重新输入！");
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