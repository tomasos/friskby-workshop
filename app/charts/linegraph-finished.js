var d3 = require('d3');
var moment = require('moment');


function tooltipbox(x, y, width, height, radius, circleradius) {
  return 'M' + (x - ((width/2) + radius - circleradius)) + ',' + (y - (height + 20))
    + "h" + (width - radius)
    + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
    + "v" + (height - 2 * radius)
    + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
    + "h" + (((radius - width) / 2) + 5)
    + "l-5,5"
    + "l-5,-5"
    + "h" + (((radius - width) / 2) + 5)
    + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius
    + "v" + (2 * radius - height) 
    + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + -radius
    + "z";
}

module.exports = function(data) {
  // svg properties
  var height = 300;
  var width = 500;
  var margin = 70;

  // min/max values
  var dateMax = d3.max(data, function(d) { return new Date(d[0]); });
  var dateMin = d3.min(data, function(d) { return new Date(d[0]); });
  var maxValue = d3.max(data, function(d) { return d[1]; });
  var minValue = d3.min(data, function(d) { return d[1]; });

  // the scales
  var x = d3.time.scale()
        .domain([dateMin, dateMax])
        .range([margin, width - margin]);

  var y = d3.scale.linear()
        .domain([maxValue, minValue])
        .range([margin, height - margin]);

  // the line path. this uses the x and y scales for positioning
  var line = d3.svg.line()
        .x(function(d, i) {
          return x(new Date(d[0]));
        })
        .y(function(d, i) {
          return y(d[1]);
        });

  // clear graph when redrawing
  d3.selectAll('#graph > *').remove();
  

  // draw stuff!

  // this sets the svg properties
  var graph = d3.select('#graph')
        .attr('viewBox','0 0 ' +  width + ' ' + height)
        .attr('preserveAspectRation', 'xMinYMin meet');

  // this defines the x and y axis
  var xAxis = d3.svg.axis()
        .scale(x)
        .tickFormat(function(d) {
          return moment(d).format('M.D.YY');
        })
        .ticks(6)
        .orient('bottom');

  var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(6)
        .orient('left');

  // draw the axes
  graph.append('g')
    .attr('class', 'axis')
    .attr("transform", "translate(0," + (height - margin) + ")")
    .call(xAxis);
    

  graph.append('g')
    .attr('class', 'axis')
    .attr("transform", "translate(" + margin + ",0)")
    .call(yAxis);


  // draw the line using the line function we created earlier
  var graphline = graph
        .append('path')
        .attr('d', line(data))
        .attr('fill', 'none')
        .attr('stroke', '#63B1E5');

  // add fancy animations!
  var totallength = graphline.node().getTotalLength();

  graphline.attr('stroke-dasharray', totallength + " " + totallength)
    .attr('stroke-dashoffset', totallength)
    .transition()
    .duration(1000)
    .ease('linear')
    .attr('stroke-dashoffset', 0);


  // draw dots and tooltips
  for(var i = 0; i < data.length; i++) {
    
    
    var dot = graph.append('g').attr('class', 'circle');
    var circleradius = 2;
    
    dot.append('circle')
      .attr('cx', x(new Date(data[i][0])))
      .attr('cy', y(data[i][1]))
      .attr('r', circleradius)
      .attr('fill', '#fff')
      .attr('stroke', '#004990')
      .attr('stroke-width', 1)
      .attr('class', data[i].month);

    var tooltip = dot.append('g').attr('class', 'tool');

    tooltip.append('path')
      .attr('d', tooltipbox(x(new Date(data[i][0])), y(data[i][1]), 100, 45, 2, circleradius))
      .attr('fill', '#fff')
      .attr('stroke', '#ddd')
      .attr('stroke-width', 2);

    tooltip.append('text')
      .attr('x', x(new Date(data[i][0])))
      .attr('y', y(data[i][1]))
      .attr('dy', -45)      
      .append('tspan')
      .attr('text-anchor', 'middle')
      .attr('class', 'month')
      .attr('fill', '#999')
      .text(moment(data[i][0]).format('M.D.YY'));
    
    tooltip.append('text')
      .attr('x', x(new Date(data[i][0])))
      .attr('y', y(data[i][1]))
      .attr('dy', -30)   
      .append('tspan')
      .attr('text-anchor', 'middle')
      .attr('class', 'volume')
      .attr('fill', '#004990')
      .text(data[i][1].toLocaleString('nb-NO', {minimumFractionDigits: 1, maximumFractionDigits: 2}));
    
  }
};

