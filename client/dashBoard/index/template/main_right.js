Template.mainRight.helpers({

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
        for(var i = num;i<list.length;i++){
            leftList[leftList.length] = list[i];
        }
        return leftList;
    },
    isFirstOne : function(index){
        if (index == 0){
            return true;
        }else{
            return false;
        }
    }
});