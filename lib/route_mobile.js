//移动端访问

MobileController = RouteController.extend({
	layoutTemplate:"secondMobileDisscussContainer",
});

Router.route("mobile/news/discuss/:id/:type?",
			function(){
						this.render("discussMobile",{to : "main"});
						this.render("footerDiscussFooter",{to : "footer"});
			},
			{
				name:"discussMobile",
				template:"discussMobile",
				controller : "MobileController",
				data:function(){
					var id = new Meteor.Collection.ObjectID(this.params.id);
					return this.params;
				}
			}
		);