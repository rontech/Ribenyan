//动态加载模板
Router.route("dynamic",{name:"dynamicDemo"});
//显示数据
Router.route("showdata",{name:"showData"});
//路由配置跳转画面并传递参数
Router.route("showdatarouter",{name:"showDataRouter"});

Router.route("showdetail/:title",{name:"showDetail"});