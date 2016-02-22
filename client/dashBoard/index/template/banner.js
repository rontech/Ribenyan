Template.banner.helpers({
	slideData : function(){
		return this.dataObj.slideData;
	},
	rightData : function(){
		return this.dataObj.rightData;
	},
	isAdver : function(type){
		var result = true;
		if (type == 2 ){
			result = false; 
		}
		return result;
	},
	isFirstOne : function(index){
		if (index == 0){
			this.cellClass = "one";
			return true;
		}else{
			return false;
		}
	}
});