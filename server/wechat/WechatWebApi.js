// wechat 

/**
* 获取aeecsstoken及openID
*
*@param code 获取授权返回的code，不能为空
*@return obj 
*/ 
getAccssToken = function(code){
	// 发送请求

	// 获取access_token ,openid

	//test
	var obj = {
		"access_token" : "Ajhy0OchX5xma0iwm9Vws3iNw-OyMsRks2vwrcjg4dRZy5W8ucUg32NDvKGTqyicIjshtGflaTEuVd6GXqGk2nvTMyM8h_jcSQ4yFvJ4pzU",
		"openid" : "oG5t7xGiKyX03Y0qNycbwkEZ3F94"
	};
	return obj;
}

/**
* 获取微信用户信息
*
*@param code 获取授权返回的code，不能为空
*@return obj 
*
*/ 
getWechatInfo = function(access_token,openid){
	var url = "https://api.weixin.qq.com/sns/userinfo?access_token="+ access_token + "&openid="　+　openid;
	// 发送请求
	var wechatInfo = {
		"openid": "oG5t7xGiKyX03Y0qNycbwkEZ3F94",
		"nickname": "馃悜馃悜",
		"sex": 1,
		"language": "zh_CN",
		"city": "",
		"province": "",
		"country": "CN",
		"headimgurl": "http://wx.qlogo.cn/mmopen/8gvkbsB2qQ6294TfE9yx6ak5nIMm4Vgjc2Wtib7tEv4icRro3JC2REL9zmSb8dF02Taics0nPMs9Ob2GzNlLvTQ6FxiacISOGLho/0",
		"unionid": "oBg45sy5moQn6GtwZknTZEbGt_Qw"
	};
	return wechatInfo;
}

validationWechatUser = function(obj){
	if(!isEmpty(obj.unionid)){
		var username = obj.unionid;;
		var paw = obj.unionid;
		//查找用户
		Meteor.loginWithPassword(username,paw,
					function(error){
						if(error){
							var rea = error.reason;
							if(rea == LOGIGN_USER_NOT_FOUND_ACCOUNT){
								$(".error-msg").text(LOGIGN_USER_NOT_FOUND);
								$(".error-msg").removeClass("hide");
							}else if(rea == LOGIGN_INCORRECT_PASSWORD_ACCOUNT){
								$(".error-msg").text(LOGIGN_INCORRECT_PASSWORD);
								$(".error-msg").removeClass("hide");
							}
							// console.log("登录失败");
						}else{
							Router.go("index");
						}
					}
				);
	}
	
	//

}

wechatLogin = function(code){
	var token = getAccssToken(code);
    if(token){
      var result = getWechatInfo(token.access_token,token.openid);
      if(result){
      	//验证用户

      }else{
     	//返回时失败信息
     	return false;
      }
    }else{
    	return false;
    }
}
