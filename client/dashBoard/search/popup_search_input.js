Template.popupSearchInput.events({
	"click i.js-close-search-box" : function(e) {
		$("#search-box").removeClass("active");
		$("body").css("overflow","");
	}
});