//　新闻弹出层选择
Template.popupViewNewsModal.events({
	"hide.bs.modal #newsModal" : function(e){//弹出框关闭
		console.log("弹出矿关闭");

		var boxID = Session.get("boxID");
		var selectNewsID = Session.get("selectNewsID");

		if(selectNewsID){
			//　设置值
			setNewsBoxValue(boxID,selectNewsID);

			// 清空ｓｅｓｓｉｏｎ
			Session.set("selectNewsID",null);

		}else{
			console.log("未选择日期");
		}
	},
	'shown.bs.modal #newsModal': function(e){//关闭
    	/* ... */
		console.log("弹出矿打开");
		var boxID = Session.get("boxID");
		var boxObj = $("#"+boxID);
		
  	},
  	"click button.js-select-news" : function(e){//点击新闻的选择框
  		var eveObj = $(e.currentTarget);
  		var selectNewsID = eveObj.data().id;
  		if(selectNewsID){
  			//　存储session 
  			Session.set("selectNewsID",selectNewsID);
  			console.log("手动关闭弹出框");
  			
  			//关闭
  			Modal.hide("popupViewNewsModal");
  		}else{
  			alert(DATA_ERROR);
  		}
  	}
});

//设置banner详情　数据
var setNewsBoxValue = function(boxID,selectNewsID){
	var boxObj = $("#"+boxID);
	var id = new Meteor.Collection.ObjectID(selectNewsID);
	var newsObj = NewsInfo.findOne({_id:id});
	// 填充数据
	
	// 标题
	var titleInput = boxObj.find("input[name=title]");
	titleInput.val(newsObj.title);
	//简介
	var introduceInput = boxObj.find("input[name=introduce]");
	introduceInput.val(newsObj.introduce);
	// 图片
	
	// 新闻ＩＤ
	var newsidInput = boxObj.find("input[name=newsid]");
	newsidInput.val(selectNewsID);

}

/*
* 新闻列表
*/
Template.popupNewsList.helpers({
	tables : function () {
      return NewsInfo.find();
    },
    tableSettings : function () {
      return {
        rowsPerPage: 10,
        showNavigation: 'auto',
        showColumnToggles: false,
        fields: [
        	{
        		key:'_id',
        		label:'',
        		fn:function(value,object,key){
        			var html = "<button class='btn btn-success js-select-news' data-id='" + value._str +"' >选择</button>";
        			return new Spacebars.SafeString(html);
        		}
        	},{
		    	key: 'title',
		        label: '标题',
		        fn: function (name,object) {
		         var html = '<a href="/manage/newslist/' + object._id + '">' + name + '</a>';
		          return new Spacebars.SafeString(html);
		        }
		    },{ 
	          	key: 'typeObj', 
	          	label: '类型',
	          	fn:function(value,object,key){
	          		console.log(value);
	          		console.log(object);
	          		console.log(key);
	          		return key;
          	}
      	  }
        ]
      };
    }
});