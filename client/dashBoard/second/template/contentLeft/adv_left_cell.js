// 广告集成cell
Template.advLeftCell.helpers({
	"templateName" : function(){//显示模板
		var advInfo = getAdvInfoById(this.advID);
		var type = advInfo.showRule;
		var templateName = "";
		switch(type){
			case "1" :
			case "2" : 
				templateName = "advHouseLeftCell";//房屋广告显示模板
				break;
			case "3" : 
				templateName = "advCompanyJopLeftCell";//招聘信息显示模板
				break;
			default :
			    break;
		}
		return templateName;
	},
	"advInfo" : function(){
		return getAdvInfoById(this.advID);
	}
});

//获取广告信息
function getAdvInfoById(advID){
	return AdInfo.findOne({"_id": advID});
}