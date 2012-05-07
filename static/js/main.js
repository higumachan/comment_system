
var slides = [];
var slides_index = 0;
var layer1, layer2;
var comments = [{text:"test", x: 2000, y: 100}];
var path = "img/";
var tag = "haiku";
var ago_datetime = new Date();
var ago_max_id = 0;
var count = 0;
var draw_flag = false;
var DEBUG = false;

onload = function () {
	$.ajaxSetup({cache: false});
	draw();
	var dict = getRequest();
	name = dict["name"];
	comment_update();
};

function initWebSocket(port)
{
	ws = new WebSocket("ws://localhost:" + port);
	ws.onopen = function (e) {
		if (DEBUG == true){
			alert("onopen");
		}
		this.send(name);
	}
	ws.onclose = function (e) {
		if (DEBUG == true){
			alert("onclose");
		}
	}
	ws.onmessage = function (e) {
		if (DEBUG == true){
			alert("onmassage");
		}
		text = e.data;
		comment_add(text);
	}
}

function dtoa(date){
	date_string = date.getFullYear()  + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
	
	return (date_string);
}

function draw ()
{
	//layer1 = document.getElementById('layer1');
	layer2 = document.getElementById('layer2');
	top.test.focus();
	//layer1.width = window.innerWidth;
	//layer1.height = window.innerHeight;
	layer2.width = window.innerWidth;
	layer2.height = window.innerHeight;

	//ctx1 = layer1.getContext('2d');
	ctx2 = layer2.getContext('2d');

	ctx2.font = "italic bold 30px 'ＭＳ Ｐゴシック'";
	ctx2.fillStyle = "rgb(255, 255, 255)";
	//slides = load_slide(path, 3);
	slides_index = 0;

	listen_keybind();
	comment_update();
};

function load_slide(path, count)
{
	result = [];
	file = path + "img" + 0 + ".jpg";
	image = new Image();
	image.onload = function () {
		ctx1.drawImage(this, 0, 0, layer1.width, layer1.height);
	};
	image.src = file;
	result.push(image);
	for (var i = 1; i < count; i++){
		file = path + "img" + i + ".jpg";
		image = new Image();
		image.src = file;
		result.push(image);
	}

	return (result);
}

function listen_keybind()
{
	document.onkeydown = function () {
		//37 39
		if (event.keyCode == 37){
			slide_prev();
		}
		else if (event.keyCode == 39){
			slide_next();
		}
	};
}

var i = 0;


function comment_update()
{
	comment_move();
	comment_draw();
	if (count % 10 == 0){
		$.getJSON("/getcomment", {}, function (json) {
			for (var i = 0; i < json.length; i++){
				comment_add(json[i].comment);
			}
		});
	}

	count++;

	setTimeout("comment_update()", 100);
}

function string_to_datetime(time_string)
{
	// 日時データを要素分解
	var created_at = result[i]['created_at'].split(" ");
	// 投稿日時変換 "Mon Dec 01 14:24:26 +0000 2008" -> "Dec 01, 2008 14:24:26"
	var post_date  = created_at[1] + " "+ created_at[2] + ", " + created_at[5] + " " + created_at[3];
	  // 日時データ処理#
	  var date = new Date(post_date);     // 日付文字列 -> オブジェクト変換
	  date.setHours(date.getHours() + 9); // UTC -> JST (+9時間)
	  return (date);
}


function comment_add(text)
{
	
	comment = {
		x: layer2.width,
		y: Math.floor(Math.random() * layer2.height),
		text: text,
	};
	comments.push(comment);
	
}

function comment_draw()
{
	ctx2.clearRect(0, 0, layer2.width, layer2.height);
	if (draw_flag == true){
		for (var i = 0; i < comments.length; i++){
			ctx2.fillText(comments[i].text, comments[i].x, comments[i].y);
		}
	}
}

function comment_move()
{
	for (var i = 0; i < comments.length; i++){
		comments[i].x -= 20;
	}
}

function toggle()
{
	d = $("#draw_ctrl");
	if (draw_flag){
		draw_flag = false;
		d.attr("value", "on");
	}
	else {
		draw_flag = true;
		d.attr("value", "off");
	}
}
