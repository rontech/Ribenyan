Template.manageUserAdd.rendered = function() {
    ckCtrlPerms();
}

Template.manageUserAdd.events({
    'submit #manageuseradd-form' : function(e,t){
        var createtime = new Date().Format("yyyy/MM/dd/hh:mm:ss");
        e.preventDefault();
        var username = t.find('#username').value;
        var pwd = t.find('#pwd').value;
        var pwdq = t.find('#pwdq').value;
        var email = t.find('#email').value;
        var tel = t.find('#tel').value;
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
            "newsperms":newsperms,
            "adperms":adperms,
            "ctrlperms":ctrlperms,
            "updateTime":createtime,
            "createTime":createtime
            },function(){
                alert("录入成功");
                Router.go("/manage/newslist");
             });
        }else{
            alert("密码输入不一致，请重新输入！");
        }
    },
});