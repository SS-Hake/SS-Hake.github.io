$(document).ready(function() {

	var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#A23C7B";

	(function(clock, $, undefined) {
		var present;
		var hour;
		var minute;
		var second;

		//Grab the height and width.
		var width = canvas.width;
		var height = canvas.height;

		centerPoint = width / 2;
		
		clock.display = function() {
			ctx.clearRect(0, 0, width, height);
			getTime();
			makeFace();
		};

		function getTime() {
			present = new Date();
			hour = present.getHours();
			minute = present.getMinutes();
			second = present.getSeconds();

			hour = (hour >= 12) ? hour - 12 : hour;
		}

		function makeFace() {
			drawHourHand();
			drawMinuteHand();
			drawSecondHand();
		}

		function drawNums() {

			console.log("[+] Draw the numbers...")

			var theta = 0;

			for(var i = 4; i < 17; i++) {
				theta = theta + (30 * Math.PI / 180);

				x = centerPoint + 100 * Math.cos(theta);
				y = centerPoint + 100 * Math.sin(theta);

				ctx.font = "16px 'Arial'";
				ctx.textBaseLine = "middle";
				ctx.textAlign = "centerPoint";
				ctx.fillStyle = "#AB5C78"

				if(i < 13) {
					ctx.fillText(i, x, y);
				} else if (i >= 13) {
					ctx.fillText(i - 12, x, y);
				}
			}
		}

		function drawDivs(dist) {

			var theta = 0;

			for(var i = 0; i < 60; i++) {

				theta = theta + 6 * Math.PI / 180;

				x = centerPoint + dist * Math.cos(theta);
				y = centerPoint + dist * Math.sin(theta);

				ctx.beginPath();
				ctx.fillStyle = "#AB5C78";
				ctx.arc(x, y, 1, 0, Math.PI * 2, true);
				ctx.fill();
				ctx.closePath();
			}
		}

		function drawSecondHand() {

			drawDivs(250);

			var theta = 6 * Math.PI / 180;

			var x = centerPoint + 250 * Math.cos(second * theta - Math.PI / 2);
			var y = centerPoint + 250 * Math.sin(second * theta - Math.PI / 2);

			ctx.beginPath();
			ctx.moveTo(centerPoint, centerPoint);
			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.fill();
		}

		function drawMinuteHand() {

			drawDivs(180);

			var theta = 6 * Math.PI / 180;

			var x = centerPoint + 180 * Math.cos((minute + (second / 60)) * theta - Math.PI / 2);
			var y = centerPoint + 180 * Math.sin((minute + (second / 60)) * theta - Math.PI / 2);

			ctx.fillStyle = "#AB56DE";
			ctx.beginPath();
			ctx.moveTo(centerPoint, centerPoint);
			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.fill();
		}

		function drawHourHand() {

			drawNums();
			var theta = (30 * Math.PI / 180);

			var x = centerPoint + 100 * Math.cos((hour + (minute / 60) + (second / 3600)) * theta - Math.PI / 2);
			var y = centerPoint + 100 * Math.sin((hour + (minute / 60) + (second / 3600)) * theta - Math.PI / 2);

			ctx.fillStyle = "#AB5C78";
			ctx.beginPath();
			ctx.moveTo(centerPoint, centerPoint);
			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.fill();
		}

	}(window.clock = window.clock || {}, jQuery));

	setInterval(clock.display, 500);

});
