

Template.header.helpers({
	firstNode:function(){
		return HeaderInfo.find({showType:"0"});
	},
	MoreNode:function(){
		return HeaderInfo.find({showType:"1"});
	},
	isShowMore:function(){
		var moreNodeList = HeaderInfo.find({showType:"1"});
		if ( moreNodeList.fetch().length > 0) {
			return "block";
		}else{
			return "none";
		}
	}
});