Template.bannerRightCell.helpers({
	imageID:function(){
		var imageID = "";
		if(this.type == 1){//新闻广告
			var aryImageObj = this.imageObj;
			for(var i = 0;i<aryImageObj.length;i++){
				if(aryImageObj[i].rule == 1){
					imageID = aryImageObj[i].imageID._str;
				}
			}
		}else{//广告
			imageID = this.imageID._str;
		}
		return imageID;
	}
});