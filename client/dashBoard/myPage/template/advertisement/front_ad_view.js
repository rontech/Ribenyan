Template.frontAdView.leagueIs = function (showRule) {
    return this.showRule === showRule;
};

Template.adtemplate12.rendered = function() {
    unhtml("contentarea");
    
    var adsession = Session.get("ad_view_info");
    var dFile = Files.find({_id:{$in:adsession.imageObj}}).fetch();
    for(var i=0;i<dFile.length;i++){
        $("#picture").append("<li><img src='"+dFile[i].url+"' /></li>");
    }

    $('.bxslider').bxSlider({
        adaptiveHeight: true,
        mode: 'fade'
    });
}

Template.adtemplate13.rendered = function() {
    unhtml("companyIntroduce");

    var adsession = Session.get("ad_view_info");
    var dFile = Files.find({_id:{$in:adsession.imageObj}}).fetch();
    for(var i=0;i<dFile.length;i++){
        $("#picture").append("<li><img src='"+dFile[i].url+"' /></li>");
    }

    $('.bxslider').bxSlider({
        adaptiveHeight: true,
        mode: 'fade'
    });
}
