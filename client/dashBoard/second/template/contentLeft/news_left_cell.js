Template.newsListCell.onRendered(function() {
    //截取introduce长度
    $(".content-list #introduce").each(function () {
        var tmp = $(".content-list #introduce").text().substring(0, 80) + "...";
        console.log(tmp);
        $(".content-list #introduce").html(tmp);
    });
});

Template.newsListCell.helpers({
    "authors": function () {
        if (this.attribute) {
            return Meteor.users.findOne({_id: this.attribute}).username;
        } else {
            return "日本眼";
        }
    }
})