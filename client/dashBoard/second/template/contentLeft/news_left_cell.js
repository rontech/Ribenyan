Template.newsListCell.onRendered(function() {
    //截取introduce长度
    $(".content-list #introduce").each(function () {
        var tmp = $(".content-list #introduce").text().substring(0, 80) + "...";
        console.log(tmp);
        $(".content-list #introduce").html(tmp);
    });
});