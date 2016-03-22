d3.json('svg_d3.json', function(data) {
	svgProcess(data);
});

var barWidth = 500;
var barHeight = 40;
var offset = 400;

function processDataElement(element, index, array) {
	var svgContainer = d3.select("#container").append("svg")
		.attr("width", barWidth + offset)
		.attr("height", barHeight)
		.attr('class', 'row');

	var row = svgContainer.selectAll('text')
		.data([element])
		.enter();

	row.append('text')
		.text(function(e) {
			return element.text;
		})
		.style("height", barHeight)
		.attr('fill', 'black')
		.attr("y", barHeight / 2)
		.style("font-size", "20px")
		.attr('class', 'col s1');

	var x = offset;

	row.append('rect')
		.attr("x", x)
		.attr("width", barOfsset(element.agree))
		.attr("height", barHeight)
		.style("fill", "#66bb6a");

	row.append('text').text(function(e) {
			return element.agree
		})
		.attr("fill", "white")
		.attr("y", barHeight / 2)
		.attr("x", x + barOfsset(element.agree) / 2)
		.attr('dy', '0.35em')
		.style("font-size", "15px")
		.style("text-anchor", "middle")
		.style("height", barHeight);

	x += barOfsset(element.agree);
	row.append('rect')
		.attr("x", x)
		.attr("width", barOfsset(element.neutral))
		.attr("height", barHeight)
		.style("fill", "#9e9e9e");

	row.append('text').text(function(e) {
			return element.neutral
		})
		.attr("fill", "white")
		.attr("y", barHeight / 2)
		.attr("x", x + barOfsset(element.neutral) / 2)
		.attr('dy', '0.35em')
		.style('class', 'center-align')
		.style("font-size", "15px")
		.style("text-anchor", "middle")
		.style("height", barHeight);

	x += barOfsset(element.neutral);

	row.append('rect')
		.attr("x", x)
		.attr("width", barOfsset(element.disagree))
		.attr("height", barHeight)
		.style("fill", "#f44336");

	row.append('text').text(function(e) {
			return element.disagree
		})
		.attr("fill", "white")
		.attr("y", barHeight / 2)
		.attr('dy', '0.35em')
		.attr("x", x + barOfsset(element.disagree) / 2)
		.style("font-size", "15px")
		.style("text-anchor", "middle")
		.style("height", barHeight);
}

function barOfsset(count) {
	return (count * barWidth) / 100;
}

function svgProcess(data) {
	data.forEach(processDataElement);
}