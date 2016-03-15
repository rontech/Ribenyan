Template.banner.helpers({
	slideData : function(){
		return this.dataObj.slideData;
	},
	rightData : function(){
		return this.dataObj.rightData;
	},
	isFirstOne : function(index){
		if (index == 0){
			this.cellClass = "rightdiv one1";
			return true;
		}else{
			this.cellClass = "rightdiv two1"
			return false;
		}
	}
});