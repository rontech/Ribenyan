Template.contentBox.rendered = function() {
    CKEDITOR.replace("content");
    if(!this._rendered) {
        $("input").iCheck();
    }
    $('input').iCheck({
        labelHover : false,
        cursor : true,
        checkboxClass : 'icheckbox_square-grey',
        radioClass : 'iradio_square-blue',
        increaseArea : '20%'
    })
}
