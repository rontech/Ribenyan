
UserController = RouteController.extend({
    layoutTemplate : "userLayout"
  });

Router.route("/user/login",
            {
              name:"login",
              template:"loginRegister",
              controller : "UserController"
            });

Router.route("/user/forgotpassword",
			{
				name:"forgotpassword",
				template:"forgotPassword",
				controller:"UserController"
			}	
	);

Router.route("/user/resetpassword/:token?",
			{
				name:"resetpassword",
				template:"resetPassword",
				controller:"UserController",
				data : function(){
					return this.params;
				}
			}	
	);

Router.route("/user/mypage/",
	{
		name:"contentBox",
		template:"contentBox",
		layoutTemplate : "myPageLayout"
	}
);

Router.route("/user/mypage/newslist",
	{
		name:"contentBoxListNews",
		template:"contentBoxListNews",
		layoutTemplate : "myPageLayout"
	}
);

Router.route("/user/mypage/eval_list",
	{
		name:"contentBoxListEvaluation",
		template:"contentBoxListEvaluation",
		layoutTemplate : "myPageLayout"
	}
);

Router.route("/user/mypage/parise_list",
	{
		name:"contentBoxListParise",
		template:"contentBoxListParise",
		layoutTemplate : "myPageLayout"
	}
);