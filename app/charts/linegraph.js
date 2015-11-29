var d3 = require('d3');

module.exports = function(data) {
  console.log(data);
  var height = 200;
  var width = 500;
  
  var x = d3.scale.linear()
      .domain([0, data.length])
      .range([0, width]);

  var y = d3.scale.linear()
        .domain([d3.max(data), 0])
        .range([0, height]);

  var line = d3.svg.line()
        .x(function(d, i) {
          console.log(x(i));
    return x(i);
  })
        .y(function(d, i) {
          console.log(y(d));
    return y(d);
  });

  var graph = d3.select('#graph')
        .attr('width', width)
        .attr('height', height);

  var graphline = graph
        .append('path')
        .attr('d', line(data))
        .attr('fill', 'none')
        .attr('stroke', '#333');
  
};

