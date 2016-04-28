
Template.banner.helpers({
	slideData : function(){
			return this.dataObj.slideData;
	}
});

Template.banner.onRendered(function(){

            $('.bxslider').bxSlider({
                auto: true,
                autoControls: true
            });
            $('.bxslider-list').bxSlider({
                  minSlides: 1,
                  maxSlides: 3,
                  slideWidth: 175,
                  slideMargin: 10
            });
 });