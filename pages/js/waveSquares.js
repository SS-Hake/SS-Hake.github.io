$(document).ready(function() {

	//Establish 2k squares, this will be our number of divs.
	var squares = _.range(1000);

	console.log("[+] Assigning squares...");

	//This function populates the container div.
	//_.each iterates over thelist of elements (squares), passing each of them to a function.
	//In this case passing the 1k squares one at a time to the anonymous function.
	_.each(squares, function(i) {

		//Print that we are running the .each function.
		console.log("[+] Running...");

		//Create a div with unique ID and global class which has click functions bound.
		//Put the newly created div inside the quare container.
		//$('#square_container').append('<div id="square' + i + '" class="square"></div>');
		$('<div>', { id: 'square' + i, class: 'square' }).on('click', function(event) {
			$(this).off('click');
			wave(event, i);
			console.log("[+] Wave...")
		}).appendTo('#square_container');

	}); 

	//The function which controls animation.
	
	function wave(event, sequenceNum) {

		var seq = sequenceNum;
		flip(seq);

		setTimeout(function() {
			$('#square' + (seq - 5)).trigger('click');
			$('#square' + (seq + 5)).trigger('click');
			console.log("[+] Trigger...")
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