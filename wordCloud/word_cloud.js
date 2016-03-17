var stop_words = ['and', 'the', 'with', 'for', 'to', 'of', 'in', 'from', 'a', 'can', 'but', 'get', 'an', 'so',
 'are', 'has', 'is', 'or', 'it', 'about'];

/** Codigo de NicoBuch **/
d3.json('word_cloud.json', function (data) {
    /**
     * http://stackoverflow.com/questions/16244857/d3-js-data-filtering
     */
    wordMap(data.filter(function(d) {
        return stop_words.indexOf(d.word) === -1;
    }));
});

function wordMap(data) {
    var fill = d3.scale.category20();
    var min = Math.random() * (200 - 15) + 15
    var max = Math.random() * (200 - min) + min
    var scale = d3.scale.linear().domain([min(data),max(data)]).range([min,max]);

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
        .style("font-family", "Helvetica-Neue, Courier New")
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