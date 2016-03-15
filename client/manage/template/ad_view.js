Template.adView.rendered = function() {
   unhtml("inner");
   unhtml("contentview");
   var adsession = Session.get("ad_view_info");
   console.log(adsession.imageObj);
   var dFile = Files.find({_id:{$in:adsession.imageObj}}).fetch();
   console.log(dFile);
   var active = "active";
   for(var i=0;i<dFile.length;i++){
      $("#imgnum").append("<li data-target=\"#carousel-example-generic\" data-slide-to=\""+i+"\"></li>");
      $("#imgshow").append(
                           "<div class=\"img-responsive item "+ active +"\"  >"+
                              "<img src=\""+ dFile[i].url +"\" alt=\"...\">"+
                              "<div class=\"carousel-caption\">"+(i+1)+"</div>"+
                            "</div>"
                            );
      active="";
   }

}