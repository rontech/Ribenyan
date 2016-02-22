//首页
Router.route("/manage",{name:"manageIndex",template:"manageIndex",layoutTemplate: 'manageLayout'});


Router.route("/manage/custormeradd",{name:"custormeradd",template:"coustomerAdd",layoutTemplate: 'manageLayout'});
Router.route("/manage/newsinfoadd",{name:"newsinfoadd",template:"newsInfoAdd",layoutTemplate: 'manageLayout'});