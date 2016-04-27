Template.newsListCell.onRendered(function() {
    //截取introduce长度
    $(".content-list #introduce").each(function () {
        var tmp = "<p>"+$(".content-list #introduce").text().substring(0, 80) + "...<p>";
        $(".content-list #introduce").replaceWith(tmp);
    });
});