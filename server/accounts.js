  ServiceConfiguration.configurations.remove({
    service: "wechat"
  });
  ServiceConfiguration.configurations.insert({
    service: "wechat",
    appId: "wx25a4726b89792eda",
    scope:['snsapi_login','basic'],
    secret: "7a8d26c1f5de1315486de7fe48d4951d"
  });

  ServiceConfiguration.configurations.update(
      { "service": "wechat" },
      {
      	$set: {
          	"service": "wechat",
          	"appId": "wx25a4726b89792eda",
          	"secret": "7a8d26c1f5de1315486de7fe48d4951d"
		}
      },
      { upsert: true } // If doesn't find wechat, insert one
    );