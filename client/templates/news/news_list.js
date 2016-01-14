var newsList = [
	{
		title		: "test1",
		author_name : "张三",
		upload_date : "2015-12-24",
		image_url 	: "http://image.golaravel.com/e/d5/0dd5c3a731c98638a076afe8ce6de.png",
		over_content: "剪短描述，剪短冒，测试数据。",
		type_name 	: "热点",
		type_id		: "1",
		tag_list	: [
					{
						name : "标签1"
					},
					{
						name : "标签2"
					},
					{
						name : "标签3"
					}
			]
	},
	{
		title		: "test2",
		author_name : "李四",
		upload_date : "2015-12-24",
		image_url 	: "http://image.golaravel.com/e/d5/0dd5c3a731c98638a076afe8ce6de.png",
		over_content: "剪短描述，剪短冒，测试数据。",
		type_name 	: "社会",
		type_id		: "2",
		tag_list    : [
					 {
						name : "标签21"
					},
					{
						name : "标签22"
					},
					{
						name : "标签23"
					}
			]
	},
	{
		title		: "test3",
		author_name : "王五",
		upload_date : "2015-12-24",
		image_url 	: "http://image.golaravel.com/e/d5/0dd5c3a731c98638a076afe8ce6de.png",
		over_content: "剪短描述，剪短冒，测试数据。",
		type_name 	: "财经",
		type_id		: "3",
		tag_list    : [
					{
						name : "标签31"
					},
					{
						name : "标签32"
					},
					{
						name : "标签33"
					}
			]
	}
];

Template.newsList.helpers({
	newslist : function(){
		return News.find();
	}
});