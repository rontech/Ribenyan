Template.newsListCell.onRendered(function() {
    //截取introduce长度
    $(".content-list #introduce").each(function () {
        if(($(this).text().length)>75){
            var tmp = $(this).text().substring(0, 75) + "...";
        }
        $(this).html(tmp);
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