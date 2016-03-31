Template.admin_header.helpers({
	ShowUserName:function(){
		var username = sessionStorage.getItem('username');
		return username;
	}
});