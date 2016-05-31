
Template.showDetail.onCreated(function(){
	// console.log("onCreated:");
	var self = this;
	// console.log("页面数据:" + Template.currentData());	

});

Template.showDetail.onRendered(function(){

	// console.log("onRender:画面加载完之后调用的方法");
	// console.log("页面数据:" + Template.currentData());

});

Template.showDetail.helpers({
	
	_id : function(){
		return this._id;
	},

	title : function(){
		return this.title;
	},

	_idNew : function(){
		return this._id = "测试修改数据";
	},
	titleNew : function(){
		this.title = "测试标题";

		return this.title;
	},
	layout : function(){
		return layout.findOne({type_id : "1"});
	}
});


//接收传递的参数
Template.showDetail.rendered = function(){	
	// console.log("D");
	// console.log(this.data);
};

