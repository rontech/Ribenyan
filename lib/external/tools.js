
// 格式化输入框内容
trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, "");
};

// 是否为空 true 为空
isEmpty = function(value) {
	return !value;
}

// 验证是否是邮箱 true:是邮箱
isEmail	 = function(email){
	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(email);
}

/*
* 时间解析
*　比对当前时间－返回　*小时前　，１天前，２天前，日期
*param date 
*/
analysisTime = function(date){
	var today = new Date();
	// 转换成当地时间
	var localDate = new Date(date.toLocaleString());

	var misTime = today.getTime() - localDate.getTime();

	var daySecond = 1 * 12 * 60 * 60 * 1000;
	var hourSecond = 1 * 60 * 60 * 1000;
	var minuteSecond = 1 * 60 * 1000;

	var day = Math.floor(misTime　/ daySecond);
	var hour = Math.floor(misTime　/ hourSecond);
	if(day == 0　&& hour == 0){
		return "刚刚";
	}else if( day > 0){// 天
		if(day < 6){
			return day + "天前";
		}else{
		 	return date.Format('yyyy-MM-dd');
		}
	}else if(hour > 0 && hour　< 24){
		return hour + "小时前";
	}else{
		return date.Format('yyyy-MM-dd');
	}
}

/*
* 验证string长度
*/
checkTextNum = function(text,num){
	if(text.length > num){
		return true;
	}else{
		return false;
	}

}