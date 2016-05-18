
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
		name:"myPageHeader",
		template:"myPageHeader",
		layoutTemplate : "myPageLayout",
		waitOn: function(){return Meteor.subscribe("bus_type_info");},
		action: function () {
			this.render();
		}
	}

);