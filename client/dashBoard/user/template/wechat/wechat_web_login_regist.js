Template.wechatWebLoginRegist.onCreated(function(){
	var self = this;

	 self.autorun(function() {
		var list = getNewsPL(Template.currentData().newsID);
		var userIDs = list.map(function(doc) { return doc.userID; });
		// console.log(userIDs);
		self.subscribe("userData",userIDs);
	 });
	
});

Template.wechatWebLoginRegist.events({

})