$(document).ready(function() {

	var squares = _.range(1000);

	console.log("[+] Assigning squares...");

	_.each(squares, function(i) {

		console.log("[+] Running...");

		//$('#square_container').append('<div id="square' + i + '" class="square"></div>');
		$('<div>', { id: 'square' + i, class: 'square' }).on('click', function(event) {
			$(this).off('click');
			wave(event, i);
		}).appendTo('#square_container');

	});

	function wave(event, sequenceNum) {
		var seq = sequenceNum;

		flip(seq);

		setTimeout(function() {
			$('#square' + (seq + 1)).trigger('click');
			$('#square' + (seq - 1)).trigger('click');
			$('#square' + (seq - 40)).trigger('click');
			$('#square' + (seq + 40)).trigger('click');
		}, 50);

		setTimeout(function() {
			$('#square' + seq).on('click', function(event) {
				$(this).off('click');
				wave(event, sequenceNum);
			});
		}, 800);
	};

	function flip(id) {
		console.log("[+] Flipping...")

		var squareId = '#square' + id; 
		$(squareId).addClass('wave');

		setTimeout(function() {
			$(squareId).removeClass('wave');
		}, 400);
	};

});
/*$(document).ready(function () {

	console.log("this runs!");

	var i;

	console.log("Hello");

	for(i = 0; i < 1001; i++) {
		console.log(i);
		$('div', { id: 'square' + i, class: 'squareClass'}).on('click', function(event) {
			$(this).off('click');
			cascade(event, position);
		}).appendTo('#square_container');
	}

	var units ='';

	for(i = 1; i < 5001; i++) {
		units += '<div class="week"></div>';
	}	
	$('#square_container').append(units);

	}

	var divsToAppend = '';

	for(i = 0; i < 1001; i++) {

		console.log(i);
		divsToAppend += '<div id="square' + i + '" class="squareClass"></div>';

	}

	$('#square_container').append(divsToAppend);

	$('.week').on('click', function(event) {
		$(this).off('click');
		wave(event, i);

	})

});
*/


/*$(document).ready(function() {

	var squares = _.range(1000);

	console.log("[+] Assigning squares...")
	_.each(squares, function(i) {
		$('div', { id: 'square' + i, class: 'square' }).on('click', function(event) {
			$(this).off('click');
			wave(event, i);
		}).appendTo('#square_container');
	});

	function wave(event, sequenceNum) {
		var seq = sequenceNum;

		flip(seq);

		setTimeout(function() {
			$('#square' + (seq + 1)).trigger('click');
			$('#square' + (seq - 1)).trigger('click');
			$('#square' + (seq - 40)).trigger('click');
			$('#square' + (seq + 40)).trigger('click');
		}, 50);

		setTimeout(function() {
			$('#square' + seq).on('click', function(event) {
				$(this).off('click');
				wave(event, sequenceNum);
			});
		}, 800);
	};

	function flip(id) {
		console.log("[+] Flipping...")

		var squareId = '#square' + id 
			$(squreId).addClass('wave');

		setTimeout(function() {
			$(squareId).removeClass('wave');
		}, 400);
	}
});

$(document).ready(function () {
	var numberOfCards = _.range(1000);

	_.each(numberOfCards, function(position) {
		$('<div>', {
			id: 'card' + position,
			class: 'card'
		}).on('click', function (event) {
			$(this).off('click');
			cascade(event, position);	
		}).appendTo('#container');
	});

	$('#container').append('<br class="clear">');

	function cascade(event, position) {
		var pos = position;
		
		flip(pos);

		setTimeout(function () {
				$('#card' + (pos + 1)).trigger('click');
				$('#card' + (pos - 1)).trigger('click');
				$('#card' + (pos - 40)).trigger('click');
				$('#card' + (pos + 40)).trigger('click');
		}, 50);

		setTimeout(function () {
			$('#card' + pos).on('click', function (event) {
				$(this).off('click');
				cascade(event, position);
			});
		}, 800);
	};

	function flip(id) {
		var cardId = '#card'+id
			$(cardId).addClass('wave');
		
		setTimeout(function () {
			$(cardId).removeClass('wave');
		}, 400);
	}
});
*/