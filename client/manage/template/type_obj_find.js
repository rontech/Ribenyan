Template.typeList.helpers({
    typelists: function() {
      return TypeInfo.find({isVaild:1}).fetch();
    },
});

