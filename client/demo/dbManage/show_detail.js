
//console.log(this.data);

Template.showDetail.helpers({
	
	_id : function(){
		return this._id = "测试修改数据";
	},
	title : function(){
		console.log("B");
		console.log(this.title);
		this.title = "测试标题"

		console.log("C");
		console.log(this.title);
		return this.title;
	}

});

//接收传递的参数
Template.showDetail.rendered = function(){	
	console.log("D");
	console.log(this.data);
	this.data = Posts.findOne({_id:"EJ2dQydQTpLMPMxTc"});
};

