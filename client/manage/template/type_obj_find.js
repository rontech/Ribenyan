// Obj = "";
 Template.typeList.helpers({
    typelists: function() {
      return TypeInfo.find({isVaild:1}).fetch();
    },
    // typechoose: function() {
    //   if($("input[type='checkbox']").is(':checked') ) {
    //       Obj = Obj + "{\"typeID\":" + {{_id}} + "," + "\"typeName\":" + {{name}} + "}";
    //   }
    //   return Obj;
    // },
});

