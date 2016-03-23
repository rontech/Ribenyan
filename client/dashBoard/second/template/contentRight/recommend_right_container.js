
Template.recommendRightContainer.helpers({
	"isShow" : function(argument) {
		if(this.dataObj){
			if(this.dataObj.length > 0){
				return "block";
			}else{
				return "none";
			}
		}else{
			return "none";
		}
	}
});
