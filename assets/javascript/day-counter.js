$(document).ready(function () {
	var d = new Date();
	var day = d.getDay();
	var msg = ["Sunday! Relax!",
				"Monday! :(",
				"Tuesday! Nearly half way!",
				"Wednesday! Hump day!",
				"Thursday! Nearly there!",
				"FRIDAY! Living for the weekend!",
				"Saturday! Have fun!"]

	$('#' + day).attr('id', 'today');
	$("#message").text(msg[day]);

	//$("a").click(function(event) {
	//	alert("You have clicked!");
	//});
});