Template.mainLeft.helpers({
    bannerData : function(){//轮播图
        return IndexLayoutCol.findOne({showType:1});
    },
    typeNewsList : function(){//新闻及广告
        return IndexLayoutCol.find(
            {
                showType:{$ne:1}
            },
            {
                sort:{showRule:1}
            }
        );
    }
});