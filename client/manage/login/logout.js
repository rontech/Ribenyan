Template.managelogout.rendered = function() {
	var tmp = sessionStorage.getItem('login_user');
	if(tmp == null){
		Router.go("/managelogin");
	}
	else{
		sessionStorage.clear();
		Router.go("/managelogin");
	}
}