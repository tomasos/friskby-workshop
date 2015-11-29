var React = require('react');
var chart = require('../charts/linegraph.js');
var dom = React.DOM;

module.exports = React.createClass({
  getInitialState: function() {

    return {
      currentSensor: 123,
      currentData: [30, 33, 31, 20]
    };
  },

  drawGraph: function() {
    chart(this.state.currentData);
  },

  componentDidMount: function() {
    this.drawGraph();
  },

  componenedDidUpdate: function() {
    this.drawGraph();
  },
  

  render: function() {
    return dom.div({},
                   dom.svg({id: 'graph'}, '')
                  );
  }
});
