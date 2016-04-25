
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

Template.newsGridCell3.onRendered(function(){
	//截取introduce长度
	$(".info p").each(function(){
		var tmp = $(".info p:first").text().substring(0,35)+"...";
		$(".info p:first").replaceWith(tmp);
	});
});
