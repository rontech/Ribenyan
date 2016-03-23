//　新闻弹出层选择
Template.popupViewNewsModal.events({
	"hide.bs.modal #newsModal" : function(e){//弹出框关闭
		var boxID = Session.get("boxID");
		var selectNewsID = Session.get("selectNewsID");

		if(selectNewsID){
			//　设置值
			setNewsBoxValue(boxID,selectNewsID);

			// 清空ｓｅｓｓｉｏｎ
			Session.set("selectNewsID",null);

		}else{
		}
	},
	'shown.bs.modal #newsModal': function(e){//关闭
    	/* ... */
		var boxID = Session.get("boxID");
		var boxObj = $("#"+boxID);
		
  	},
  	"click button.js-select-news" : function(e){//点击新闻的选择框
  		var eveObj = $(e.currentTarget);
  		var selectNewsID = eveObj.data().id;
  		if(selectNewsID){
  			//　存储session 
  			Session.set("selectNewsID",selectNewsID);
  			
  			//关闭
  			Modal.hide("popupViewNewsModal");
  		}else{
  			alert(DATA_ERROR);
  		}
  	}
});

//设置新闻详情　数据
var setNewsBoxValue = function(boxID,selectNewsID){
	var boxObj = $("#"+boxID);
	var id = new Meteor.Collection.ObjectID(selectNewsID);
	var newsObj = NewsInfo.findOne({_id:id});
	// 填充数据
	
	// 标题
	var titleInput = boxObj.find("input[name=title]");
	titleInput.val(newsObj.title);

	//二级标题
	var introduceInput = boxObj.find("input[name=introduce]");
	introduceInput.val(newsObj.secondTitle);
	// 图片
	// 默认为第一个
	var imageid = newsObj.imageObj[0];
	var imageUrl = getImagePathByID(imageid);

	//图片显示
	var imageObj = boxObj.find("img.js-selectImage");
	imageObj.data("imageid",imageid);
	imageObj.attr("src",imageUrl);

	//按钮
	var imageButObj = boxObj.find("button.js-select-old-image");
	imageButObj.data("imageid",imageid);
	imageButObj.CSS("display","inline");

	// 新闻ＩＤ
	var newsidInput = boxObj.find("input[name=newsid]");
	newsidInput.val(selectNewsID);

	//link
	var newsLink = Meteor.absoluteUrl('news/detail/' + selectNewsID);
	var newslinkInput = boxObj.find("input[name=siteinlink]");

	newslinkInput.val(newsLink);

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
		        label: '标题'
		    },{ 
	          	key: 'typeObj', 
	          	label: '类型',
	          	fn:function(value,object,key){
	          		var typeName = "";
	          		for(var i = 0; i < value.length;i++){
	          			typeName += value[i].typeName + "," ;
	          		}
	          		return typeName;
          	}
      	  }
        ]
      };
    }
});