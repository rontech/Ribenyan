Template.contentBox.rendered = function() {
    CKEDITOR.replace("content");
    // Meteor.subscribe("bus_type_info");
    // var typelists = TypeInfo.find({isVaild:1}).fetch();
    // console.log(typelists);
    // typelists.foreach(
    //     $("#111").append(
    //     "<input type='hidden' name='_id'  id='_id' value=' "+ this._id +" '/> <label class='checkbox-inline'><input id=' "+ this._id +" ' name='checkbox' type='checkbox' value=' "+ this._id._str + this.name +">"+ this.name +"&nbsp;&nbsp;</label>"
    // )    );


    
    $('input').iCheck({
        labelHover : false,
        cursor : true,
        checkboxClass : 'icheckbox_square-grey',
        radioClass : 'iradio_square-blue',
        increaseArea : '20%'
    })
}

Template.contentBox.helpers({
    typelists: function() {
        return TypeInfo.find({isVaild:1}).fetch();
    },
    checked: function() {
        var user = Session.get('user_info');
        var id = new Array();
        for(var i=0;i<user.newsblockperms.length;i++){
            if(this._id._str === user.newsblockperms[i].typeID._str) {
                return "checked";
            }
        }
        return "";
    }
});
