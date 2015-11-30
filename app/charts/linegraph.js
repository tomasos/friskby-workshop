var d3 = require('d3');
var moment = require('moment');


module.exports = function(data) {
  // svg properties
  var height = 300;
  var width = 500;
  var margin = 70;

  
  // this sets the svg properties
  var graph = d3.select('#graph')
        .attr('viewBox','0 0 ' +  width + ' ' + height)
        .attr('preserveAspectRation', 'xMinYMin meet');

  graph.append('g')
    .append('text')
    .attr('fill', '#333')
    .attr('dy', 50)
    .text('Velkommen!');
  
  
  
};

