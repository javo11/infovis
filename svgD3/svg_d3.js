d3.json('svg_d3.json', function (data) {
    svgProcess(data);
});

var barWidth = 500;
var barHeight = 40;
var offset = 400;

function processDataElement(element, index, array) {
	var svgContainer = d3.select("#container").append("svg")
                                           .attr("width", barWidth + offset)
                                           .attr("height", barHeight)
                                           .attr('class','row');
  svgContainer.selectAll('text')
  							.data([element])
  							.enter()
  							.append('text')
                .text(function(d) { return element.text; })
                .style("height", barHeight)
                .attr('fill', 'black')
                .attr("y", barHeight/2)
                .style("font-size", "20px")
                .attr('class', 'col s1');
           
    var x = offset;     
    svgContainer.append('rect')
                .attr("x", x)
                .attr("width", barOfsset(element.agree))
                .attr("height", barHeight)
                .style("fill", "#66bb6a");

    x += barOfsset(element.agree);
    						svgContainer
                .append('rect')
                .attr("x", x)
                .attr("width", barOfsset(element.neutral))
                .attr("height", barHeight)
                .style("fill", "#9e9e9e");

    x += barOfsset(element.neutral)
    svgContainer
                .append('rect')
                .attr("x", x)
                .attr("width", barOfsset(element.disagree))
                .attr("height", barHeight)
                .style("fill", "#f44336");
}

function barOfsset(count) {
	return (count * barWidth) /100;
}

function svgProcess(data) {
  data.forEach(processDataElement);                                          
}