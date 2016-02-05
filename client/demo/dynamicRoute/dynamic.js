var data = [
	{
		type : "1",
		modeType : "1",
		templateName : "template1"
	},
	{	
		type : "2",
		modeType : "2",
		templateName : "template2"
	},
	{	
		type : "2",
		modeType : "2",
		templateName : "template2"
	},
	{	
		type : "2",
		modeType : "2",
		templateName : "template1"
	}
]


Template.dynamicDemo.helpers({
		templateList : data
	});