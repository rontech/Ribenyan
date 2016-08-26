  ServiceConfiguration.configurations.remove({
    service: "wechat"
  });
  ServiceConfiguration.configurations.insert({
    service: "webwechat",
    appId: "wx25a4726b89792eda",
    scope:['snsapi_login','basic'],
    secret: "7a8d26c1f5de1315486de7fe48d4951d"
  });

  ServiceConfiguration.configurations.update(
      { "service": "wechat" },
      {
      	$set: {
          	"service": "wechat",
          	"appId": "wxdd15b6922237eac5",
          	"secret": "d19ca18ad6bbc9bb2be1bd93e28db5a1"
		}
      },
      { upsert: true } // If doesn't find wechat, insert one
    );