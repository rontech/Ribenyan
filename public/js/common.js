var openTrue = true;
$(function() {
  $(window).on('touchstart', onTouchStart); //指が触れたか検知
  $(window).on('touchmove', onTouchMove); //指が動いたか検知
  $(window).on('touchend', onTouchEnd); //指が離れたか検知
  var direction, position;

  //スワイプ開始時の横方向の座標を格納
  function onTouchStart(event) {
    position = getPosition(event);
    direction = ''; //一度リセットする
  }

  //スワイプの方向（left／right）を取得
  function onTouchMove(event) {
    if (position - getPosition(event) > 30) { // 70px以上移動しなければスワイプと判断しない
      direction = 'left'; //左と検知
    } else if (position - getPosition(event) < -30){  // 70px以上移動しなければスワイプと判断しない
      direction = 'right'; //右と検知
    }
  }

  function onTouchEnd(event) {
    var current = $("#category_list li.on");
    var index = $("#category_list li").index(current);
    current.removeClass("on");
    if (direction == 'right') {
      if (index == 0) {
        var last = $("#category_list li:last");
        last.addClass("on");
        last.children("a").click();
      } else {
        var prev = current.prev("li");
        prev.addClass("on");
        prev.children("a").click();
      }
    } else if (direction == 'left'){
      if (index == 4) {
        var first = $("#category_list li:first");
        first.addClass("on");
        first.children("a").click();
      } else {
        var next = current.next("li");
        next.addClass("on");
        next.children("a").click();
      }
    }
  }

  //横方向の座標を取得
  function getPosition(event) {
    return event.originalEvent.touches[0].pageX;
  }
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
