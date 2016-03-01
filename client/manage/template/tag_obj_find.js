Template.tagList.helpers({
    taglists: function() {
      return TagInfo.find({isVaild:1}).fetch();
    },

});