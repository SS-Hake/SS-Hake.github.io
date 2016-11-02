$(document).ready(function () {
	
	function randomColor() {
		return '#' + Math.random().toString(16).slice(2, 8);
	};

	$(".box").on("mouseenter", function () {
		$(this).css('background-color', randomColor());
		$(this).css('box-shadow', "0 0 25px white");
		$(this).css('z-index', "100000");
		$(this).animate({ opacity: 1 }); 

	});

	$(".box").on("mouseleave", function () {
		$(this).css('box-shadow', "none");
		$(this).css('z-index', "1");
		$(this).css('background-color', randomColor());
		$(this).css('box-shadow', "0 0 15px black");
		$(this).css('z-index', "100000");
		$(this).animate({ opacity: 0.5 }); 
		//$(this).animate({ width: 20 });
	});

});