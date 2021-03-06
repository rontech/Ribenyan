Template.mainLeft.helpers({
    bannerData : function(){//轮播图
        return IndexLayoutCol.findOne({showType:1});
    },
    typeNewsList : function(){//新闻及广告
        var list =  IndexLayoutCol.find(
            {
                showType:{$ne:1}
            },
            {
                sort:{showRule:1}
            }
        ).fetch();
        var leftList = [];
        var num = Math.floor(list.length / 2);
        for(var i = 0;i<num;i++){
            leftList[i] = list[i];
        }
        return leftList;
    }
});