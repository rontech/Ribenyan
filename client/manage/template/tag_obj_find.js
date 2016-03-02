 Template.tagList.helpers({
    taglists: function() {
      return TagInfo.find({isVaild:1}).fetch();
    },

});

Template.tagList.helpers({
  checked: function() {
  	var tags = Session.get("news_info").tagObj
  	for(var i = 0;i<tags.length;i++){
		if(this._id._str === tags[i].tagID._str) {
			return "checked";
		}
  	}
    return "";
  }
});