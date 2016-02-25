
UserController = RouteController.extend({
    layoutTemplate : "userLayout"
  });

Router.route("/user/login",
            {
              name:"login",
              template:"loginRegister",
              controller : "UserController"
            });