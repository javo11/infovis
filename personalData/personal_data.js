"use strict";
$(document).ready(function() {
	d3.json('heart_rate.json', function(data) {
		var visualization = d3plus.viz()
			.container("#viz")
			.data(data)
			.type("box")
			.id("Heart Rate")
			.x("Date")
			.y("Heart Rate")
			.time("Date")
			.height(700)
			.draw();
	});
});