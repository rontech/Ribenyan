
$(function() {
	
   $(document).scroll(function(){
   	var scrollTop =$(document).scrollTop();
  if(scrollTop<=80){
  	$('.left-menu').removeClass('fixed');
  	 $('.card-list').removeClass('fixed');
   
  }else{
  	$('.left-menu').addClass('fixed');
    $('.card-list').addClass('fixed');
  }
})

	$(".submenu > a").on('click',function(){
	  if($(this).parent().hasClass('open')){
	  	$(this).parent().removeClass('open');
	  }else{
      $('.nav li').removeClass('open');
	    $(this).parent().addClass('open');
    }
	})

	$(".submenu ul li > a").on('click',function(){
    if($('.left-menu').css('display') == 'block') {
		  $('.submenu').removeClass('open');
		  $('.left-menu').css('display', 'none');
    } 
	})

	$("#menuswitch").on('click',function(){
    if(!$('.submenu').hasClass('open')) {
		  $('.submenu').addClass('open');
		  $('.left-menu').css('display', 'block');
      $("#menuswitch").click();
    } 
	})

	
})

$(".a-upload").on("change","input[type='file']",function(){
    var filePath=$(this).val();
    if(filePath.indexOf("jpg")!=-1 || filePath.indexOf("png")!=-1){
        $(".fileerrorTip").html("").hide();
        var arr=filePath.split('\\');
        var fileName=arr[arr.length-1];
        $(".showFileName").html(fileName);
    }else{
        $(".showFileName").html("");
        $(".fileerrorTip").html("您未上传文件，或者您上传文件类型有误！").show();
        return false 
    }
})
