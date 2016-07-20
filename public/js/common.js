var openTrue = true;
$(function() {
					$('body').removeClass('with-panel-left-cover');
					$('.respBox').removeClass('on');
					openTrue = true;
				
					$(document).scroll(function(){
	   					var scrollTop =$(document).scrollTop();
	 					if(scrollTop==0){
	 					 	$('.header').removeClass("on");
	 					}else{
	 						$('.header').addClass("on");
	 					}
					})
				
				
				
				
				$("#sp-menu").on('click', function() {
					if (openTrue) {
						$('body').addClass('with-panel-left-cover');
						$('.respBox').addClass('on');
						openTrue = false;
					} else {
						$('body').removeClass('with-panel-left-cover');
						$('.respBox').removeClass('on');
						openTrue = true;
					}
				})
				$(".panel-overlay").on('click', function() {
					$('body').removeClass('with-panel-left-cover');
					$('.respBox').removeClass('on');
				})
				$(".search").on('click', function() {
					$('#search-box').addClass('active');
					$('body').css('overflow', 'hidden')
				});
				$(".icon-search-close").on('click', function() {
					$('#search-box').removeClass('active');
					$('body').css('overflow', 'inherit')
				})
				$(".login-input input").focus(function() {
					$(this).parents().css('border-color', '#1d8bdf');
					$(this).prev('span').css('background-color', '#1d8bdf');
				})
				$(".login-input input").blur(function() {
					$(this).parents().css('border-color', '#dcddde');
					$(this).prev('span').css('background-color', '#dcddde');
				})
				
				
				
			})
			

$(".onWeChat").on('click', function() {
			$(".js_qrcode_wrap.on").removeClass('on');
			$(this).parents('.card').find(".js_qrcode_wrap").addClass('on');
					
				})
$(".share-close").on('click', function() {
			
					$(this).parents(".js_qrcode_wrap.on").removeClass('on');
					
				})
jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 100,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});
	//www.sucaijiayuan.com
	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
	
	$(".go-top").on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});



});
