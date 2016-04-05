Template.adView.created = function() {

}

Template.adView.leagueIs = function (showRule) {
	return this.showRule === showRule;
};

Template.adtemplate1.rendered = function() {
	unhtml("inner");
	unhtml("contentview");
	var adsession = Session.get("ad_view_info");

	var dFile = Files.find({_id:{$in:adsession.imageObj}}).fetch();

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

	setTitle();
}

Template.adtemplate2.rendered = function() {
	unhtml("inner");
	var adsession = Session.get("ad_view_info");
	var dFile = Files.find({_id:{$in:adsession.imageObj}}).fetch();
	for(var i=0;i<dFile.length;i++){
		$("#imgshow").append(
			"<div style=\"padding-bottom: 12px;\">"+
				  "<a href=\"#\"><img src=\""+dFile[i].url+"\" class=\"img-responsive\"></a>"+
			"</div>"
		);
	}
	setTitle();
}

Template.adtemplate3.rendered = function() {
	unhtml("inner");
	setTitle();
}

//设置网站标题 
function setTitle(){
	var adTitle = Template.currentData().title;
	var title = adTitle + "-" + SYS_APP_NAME;

// 网页标题　类型＋网站名称
	document.title = title  ;
}