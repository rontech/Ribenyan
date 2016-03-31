/*
* 解析新闻图片，默认返回第一张，返回图片
* data:["imageid1","imageid2"]
* index: 获取序号
*/
getImaegPathByObj = function(data){
	var imageID = data[0];
	var imageObj = Files.findOne({_id:imageID});
	
	if(imageObj){
		return imageObj.url;
	}else{
		return IMAGE_DEFAULT;
	}
}

//返回图片
getImagePathByID = function(imageID){
	var imageObj = Files.findOne({_id:imageID});
	if(imageObj){
		return imageObj.url;
	}else{
		return IMAGE_DEFAULT;
	}
}