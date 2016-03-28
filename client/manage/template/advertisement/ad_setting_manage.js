// 广告投放
Template.advSettingManage.helpers({
	"adTables" : function(){//投放广告信息查询
		return analysisAdvInfo();
	},
	tableSettings : function () {
    return {
      rowsPerPage: 10,
      showNavigation: 'auto',
      showColumnToggles: false,
      fields: [
        {
          key: 'title',
          label: '名称',
          headerClass: '',
          cellClass:'',
          fn: function (name,object) {
           var html = '<a href="/manage/adview/' + object._id + '">' + name + '</a>';
            return new Spacebars.SafeString(html);
          }
        },
        {
          key: 'type',
          label: '投放板块',
          headerClass: '',
          cellClass:'',
          fn: function (value,object) {
          		var name = "";
		      	switch (value) {
		      		case 1 :
		      			name = "首页";
		      			break;
		      		case 2 :

			  			name  = "二级列表"; 
			  			//投放类型
			  			var typeInfo = TypeInfo.findOne({"_id":object.modalID});
			  			name = name + "~" + typeInfo.name;
			  			break;
			  		case 3 :
			  		 	name = "推荐模块";
			  		 	break;
			  	}
            return name;
          }
        },
        {
          key: 'advType',
          label: '广告类型',
          headerClass: '',
          cellClass:'',
          fn: function (value,object) {
          	var name = "";
          	switch (value) {
          		case 1 :
          			name = "卖房";
          			break;
          		case 2 :
          			name = "房屋出租";
          			break;
          		case 3 :
          			name = "招聘";
          			break;
          	}
            return name;
          }
        },
        {
          key: 'isVaild',
          label: '状态',
          headerClass: '',
          cellClass:'',
          fn: function (value,object) {
          	var name = "";
      		switch (value) {
      		case 1 :
      			name = "投放";
      			break;
      		case 2 :
      			name = "未投放";
      			break;
          	}
            return name;
          }
        },
        {
          key: '',
          label: '',
          headerClass: '',
          cellClass:'',
          fn: function (value,object) {
          	if(object.type == 2){
          		var html = '<div class="text-center"><button class="btn btn-danger js-delete" data-id=' + object._id._str + '>删除</button></div>';
            	return new Spacebars.SafeString(html);
          	}else{
          		return "";
          	}
      		
          }
        },
      ]
    };
  },

});

Template.advSettingManage.events({
	// 删除
	"click button.js-delete" : function(e){

		if(window.confirm("确认要删除吗？")==true){
			var deleteID = $(e.currentTarget).data().id;
			//提交Id
			Meteor.call("deleteSetAdvInfoByID",deleteID,function(error,result){
				if(error){
					alert(DELETE_ERROR);
				}else{
					// 待调整 
					alert(DELETE_SUCCESS);
				}
			});
			return false;
		}else{
			return false;
		}
		return false;
	},
});

//整和数据信息
function analysisAdvInfo(){
	// 投放信息
	var setAdvList = SetingAdvInfo.find({"isVaild":{$in:[1,2]}}).fetch();
	var newList = new Array();
	// 
	for(var i=0;i<setAdvList.length;i++){
		 var advInfo = AdInfo.findOne({"_id":setAdvList[i].advID});
		 if(advInfo){
		 	// 整合数据
		 	setAdvList[i].advType = advInfo.type;
		 	setAdvList[i].title = advInfo.title;
		 	newList.push(setAdvList[i]);
		 }
	}
	return newList;
}