Template.advCompanyJopLeftCell.helpers({
    "authors": function () {
        if (this.attribute) {
            return Meteor.users.findOne({_id: this.attribute}).username;
        } else {
            return "日本眼";
        }
    }
})