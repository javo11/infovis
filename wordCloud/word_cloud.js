
/** Codigo de NicoBuch **/
d3.json('word_cloud.json', function (data) {
    wordMap(data);
});

function wordMap(data) {
    var fill = d3.scale.category20();
    var minFont = Math.random() * (30 - 10) + 10
    var maxFont = Math.random() * (125 - 100) + 100
    var scale = d3.scale.linear().domain([min(data),max(data)]).range([minFont,maxFont]);

    d3.select("#words")
        .selectAll()
        .data(data)
        .enter()
        .append("span")
        .style("font-size", function (d, i) {
            return scale(d.count) + "px";
        })
        .style("color",function(d, i) {
            return fill(i);
        })
        .style('-webkit-transform', function(d, i) {
        	return 'rotate(' + ((Math.random() * 5) - 2.5) + 'deg)'
        })
        .style('padding', '2px 7px 2px 7px')
        .style("font-family", "Courier New, Lucida Console")
        .style("display", "inline-block")
        .html('<b></b>')
        .text(function (d, i) {
            return d.word;
        });
}


/** Codigo de NicoBuch **/
function min(data) {
    return d3.min(data, function(d) {
        return d.count;
    });
}
/** Codigo de NicoBuch **/
function max(data) {
    return d3.max(data, function(d) {
        return d.count;
    });
}