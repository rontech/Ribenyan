Template.footer.helpers({
    firstNode:function(){
        return HeaderInfoCol.find({showType:"0"});
    },
    MoreNode:function(){
        return HeaderInfoCol.find({showType:"1"});
    },
    isShowMore:function(){
        var moreNodeList = HeaderInfoCol.find({showType:"1"});
        if ( moreNodeList.fetch().length > 0) {
            return "block";
        }else{
            return "none";
        }
    }
});

