Template.userLayout.onRendered(function(){
    myscroll=new IScroll("#wrapper",{ eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
    //mobile 导航颜色
    var tmp=-1;
    $("#scroller li").each(function(){
        switch(tmp%4+1){
            case 1:
                $(this).addClass("one");
                break;
            case 2:
                $(this).addClass("two");
                break;
            case 3:
                $(this).addClass("three");
                break;
            case 4:
                $(this).addClass("four");
                break;
        }
        tmp++;
    });
});