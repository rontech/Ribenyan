
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