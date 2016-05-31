

Template.updateDB.helpers({
	newsInfo : function(){
		return News.findOne(Template.currentData().id);
	}
});

// 添加点击事件
Template.showDetail.events({
	//更新
	"click #update" :function(event){
		alert(this._id)
		var id = this._id;
		//
		var editNews = {
			title : $("#nameUpdate").val(),
			author_name : $("#authorUpdate").val(),
			over_content : $("#overUpdate").val()
		}

		News.update({_id:id}, {$set: editNews}, function(error) {
	      if (error) {
	        // 向用户显示错误信息
	        // console.log(error);
	        alert("更新失败");
	      } else {
	        //Router.go('postPage', {_id: currentPostId});
	        alert("更新成功");
	      }
    	});
	}
});