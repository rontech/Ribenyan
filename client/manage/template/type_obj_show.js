Template.typeShow.rendered = function() {   
   var tmp =   sessionStorage.getItem('login_user');//Session.get("login_user");
   console.log(tmp);
   if(tmp==null){
      Router.go("/managelogin");
   }
}

Template.typeShow.helpers({
    typelists: function() {
      return TypeInfo.find({isVaild:1}).fetch();
    },
});

Template.typeShow.helpers({
  checked: function() {
  	var types = Session.get("news_info").typeObj
  	for(var i = 0;i<types.length;i++){
		if(this._id._str === types[i].typeID._str) {
			return "checked";
		}
  	}
    return "";
  }
});