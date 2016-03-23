Template.managelogout.rendered = function() {
   var tmp =   sessionStorage.getItem('login_user');//Session.get("login_user");
   console.log(tmp);
   if(tmp==null){
      Router.go("/managelogin");
   }
   else{
   	  sessionStorage.clear();
   	  Router.go("/managelogin");
   }
}