
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
	console.log($(".card .info p").text());
	$(".card .info p").each(function(){
		var tmp = $(".card .info p:first").text().substring(0,20)+"...";
		$(".card .info p:first").text(tmp);
	});
});
