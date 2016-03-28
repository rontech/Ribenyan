/*
* 广告信息投放信息
* author ysj
*/
Meteor.methods({

	/*
	* 添加广告投放信息
	* param : data (array) ;
	*		eco: {
					type:类型，//1:首页；2：二级列表；3.右侧推荐板块
	*				advID:广告ID,
	*				modalID:投放板块(ID)/类型ID，
	*				dataObjID:内嵌结构标示ID
	*			}
	*
	*
	*
	*/
	"addSetAdvInfo" : function(data){
		// 检验数据
		if(data.length > 0){
			// 存储数据
			for(var i = 0;i<data.length;i++){
				// 整理数据
				data[i].isVaild = 1;

				SetingAdvInfo.insert(data[i]);	
			}
		 	var result ={
				"result" : true
			};
			return result;
		}else{//错误，返回错误；
			var result ={
				"result" : false,
				"reason" : DATA_ERROR
			};
			return result;
		}	
	},
	/*
	* 删除广告投放信息根据ID
	*/
	"deleteSetAdvInfoByID" : function(deleteID){
		// 
		var ID = new Meteor.Collection.ObjectID(deleteID);
		SetingAdvInfo.remove(ID);
		var result = {
			"result" : true
		};
 		return result;  
	}
});