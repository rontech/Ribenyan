Template.indexContainer.helpers({
	bannerData : function(){//轮播图

	},
	typeNewsList : function(){//新闻及广告
		return IndexLayout.find(
								{
									showType:{$ne:1}
								},
								{
									sort:{showRule:1}
								}
								);
	}
});