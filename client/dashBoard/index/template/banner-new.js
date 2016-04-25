Template.banner.helpers({
	slideData : function(){
			return this.dataObj.slideData;
	}
});
Template.banner.onRendered(function(){
	$(".bxslider").bxSlider({
 		auto: true,
 		autoControls: true,
			infiniteLoop:true
 	});
 });