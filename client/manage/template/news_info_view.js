 Template.newsView.rendered = function() {
   $('#content').ckeditor();
  }

 Template.registerHelper('selected', function(key, value){
 	return key == value ? {selected:'selected'}: '';
});