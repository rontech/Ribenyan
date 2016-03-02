 Template.adInfoAdd.rendered = function() {
   $('#content').ckeditor();
 };

 Template.adInfoAdd.events({
    'submit #ad_info_add' : function(e,t){
        e.preventDefault();
        var title     = t.find('#title').value;
        var introduce = t.find('#introduce').value;
        var content   = t.find('#content').value;
        var cstId     = t.find('#cstId').value;
        console.log(title,introduce,content,cstId);
        AdInfo.insert({
        				"title":title,
            			"introduce":introduce,
        				"content":content,
        				"cstId":cstId,
        				},function(){alert("已保存");});
    },
});