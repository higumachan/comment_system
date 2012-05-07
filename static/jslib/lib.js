function DrawLike() {
	$.getJSON("./cgi-bin/like_count.py", {}, function(json){
		for (var i = 0; i < json.like_count; i++){
			var style = "left:" + GetRandomNumber() +"%;"+ "top:" + GetRandomNumber() +"%;" +  "position:absolute;opacity:1.0;";
			$("body").html($("body").html() + "<h1 " + 'class="t2" id="' + count +'" ' + "style=" + style + ">(・∀・)ｲｲﾈ!!</h1>");
			count++;
		}
	});
}

function get_date(){
	date = new Date();
	date_string = date.getFullYear()  + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
	return (date_string);
}

function get_date(date)
{
	date_string = date.getFullYear()  + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
	return (date_string);
}

function getRequest(){
	if(location.search.length > 1) {
		var get = new Object();
		var ret = location.search.substr(1).split("&");
		for(var i = 0; i < ret.length; i++) {
			var r = ret[i].split("=");
			get[r[0]] = r[1];
		}
		return get;
	} 
	else {
		return false;
	}
}
