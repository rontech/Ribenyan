Template.bannerRightCell.helpers({
	imageIDs:function(){
		var imageIDs = "";
		console.log(this.imageID);
		if(this.type == 1){//新闻广告
			var aryImageObj = this.imageObj;
			for(var i = 0;i<aryImageObj.length;i++){
				if(aryImageObj[i].rule == 1){
					imageIDs = aryImageObj[i].imageID._str;
				}
			}
		}else{//广告
			imageIDs = this.imageID._str;
		}
		return imageIDs;
	}
});