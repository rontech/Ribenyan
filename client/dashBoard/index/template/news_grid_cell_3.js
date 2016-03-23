
Template.newsGridCell3.helpers({
	imageid : function(){
		var imageID = "";
		if(this.imageObj){
			imageID = this.imageObj[0];
		}else{
			imageID = this.imageID;
		}
		return imageID;
	}
});