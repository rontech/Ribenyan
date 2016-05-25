Template.frontAdView.rendered = function() {
    unhtml("contentarea");
    
    var adsession = Session.get("ad_view_info");
    var dFile = Files.find({_id:{$in:adsession.imageObj}}).fetch();

    var active = "active";
    for(var i=0;i<dFile.length;i++){
        // $("#imgnum").append("<li data-target=\"#carousel-example-generic\" data-slide-to=\""+i+"\"></li>");
        // $("#imgshow").append(
        //     "<div class=\"img-responsive item "+ active +"\"  >"+
        //     "<img src=\""+ dFile[i].url +"\" alt=\"...\">"+
        //     "<div class=\"carousel-caption\">"+(i+1)+"</div>"+
        //     "</div>"
        $("#picture").append("<li><img src='"+dFile[i].url+"' /></li>");
        active="";
    }

    $('.bxslider').bxSlider({
        adaptiveHeight: true,
        mode: 'fade'
    });
}