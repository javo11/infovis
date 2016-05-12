"use strict";
var loaded_normal_data = false;
var loaded_exercise_data = false;
var loaded_cal_data = false;
$(document).ready(function() {
	d3.json('hr_all_data.json', function(data) {
		box_plot(data, "#viz")
	});

	$('ul.tabs').tabs();


});

function box_plot(data, container) {
	var visualization = d3plus.viz()
		.container(container)
		.data(data)
		.type("box")
		.id("Heart Rate")
		.x("Date")
		.y("Heart Rate")
		.time(function(data) {
			var date_data = data['Date'].split('-')
			return new Date(date_data[0], date_data[1], 1, 0, 0, 0, 0);
		})
		.height(700)
		.draw();
}

function load_cal_tab() {
	if (!loaded_cal_data) {
		d3.json('hr_cal_data.json', function(data) {
			data = data.map(function(elem) {
				var dic = elem
				dic["date"] = new Date(elem["date"]);
				dic["date"].setDate(dic["date"].getDate() + 1);
				return dic;
			});
			var chart1 = calendarHeatmap()
			.data(data)
			.selector('#cal-heatmap')
			.colorRange(['#dae289', '#3b6427'])
			.legendEnabled(true)
			.tooltipEnabled(true);
			chart1();
			loaded_cal_data = true;
		});
	}
}

function load_exersice_data() {
	if (!loaded_exercise_data) {
		d3.json('hr_exercise_data.json', function(data) {
			box_plot(data, "#exercise")
			loaded_exercise_data = true;
		});
	}
}

function load_normal_data() {
	if (!loaded_normal_data) {
		loaded_normal_data = true;
		d3.json('hr_normal_data.json', function(data) {
			box_plot(data, "#normal")
		});
	}
}
