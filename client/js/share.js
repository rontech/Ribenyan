

  //分享到新浪微博
  function shareToSinaWB(event){
  	var _title,_source,_sourceUrl,_pic,_showcount,_desc,_summary,_site,
      _width = 600,
      _height = 600,
      _top = (screen.height-_height)/2,
      _left = (screen.width-_width)/2,
      _url = window.location.host,
      uid=88888,
    	_pic = '';


      event.preventDefault();
      
      var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey='+uid;     //真实的appkey，必选参数
      _shareUrl += '&url='+ encodeURIComponent(_url||document.location);     //参数url设置分享的内容链接|默认当前页location，可选参数
      _shareUrl += '&title=' + encodeURIComponent(_title||document.title);    //参数title设置分享的标题|默认当前页标题，可选参数
      _shareUrl += '&source=' + encodeURIComponent(_source||'');
      _shareUrl += '&sourceUrl=' + encodeURIComponent(_sourceUrl||'');
      _shareUrl += '&content=' + 'utf-8';   //参数content设置页面编码gb2312|utf-8，可选参数
     _shareUrl += '&pic=' + encodeURIComponent(_pic||'');  //参数pic设置图片链接|默认为空，可选参数
     window.open(_shareUrl,'_blank','width='+_width+',height='+_height+',top='+_top+',left='+_left+',toolbar=no,menubar=no,scrollbars=no, resizable=1,location=no,status=0');
 }
 