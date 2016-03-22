// 右侧列表
Template.secondRightList.helpers({
	"rightList":function(){
		return SecondRightLayout.find({"isVaild": 1},{sort:{"showRule":1}});
	},
});