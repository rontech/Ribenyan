
Template.newsGridCell3.helpers({
	imageID : function(){
		var aryImageObj = this.imageObj;
		var imageID = "";
		for(var i = 0;i<aryImageObj.length;i++){
			if(aryImageObj[i].rule == 1){
				imageID = aryImageObj[i].imageID._str;
			}
		}
		return imageID;
	}
});