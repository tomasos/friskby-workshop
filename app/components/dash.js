var React = require('react');
var superagent = require('superagent');

var chart = require('../charts/linegraph-finished.js');
var dom = React.DOM;

module.exports = React.createClass({
  getInitialState: function() {

    return {
      currentSensor: 'Florida',
      currentData: [],
      sensors: [
        {name: 'Grønnlien', location: '60.369803,5.33422,101', dataids: ['NJBGassGroenllien', 'NJBStoevGronnlien']},
        {name: 'OJ Brochs Gate', location: '60.3854551014,5.3171092272,18', dataids: ['OAMStoevOJBrochsGate']},
        {name: 'Random', location: '60.3854551014,5.3171092272,18', dataids: ['RANDOM']},
        {name: 'Florida', location: '60.3854551014,5.3171092272,18', dataids: ['MET:TEMP:FLORIDA']}
        
      ]
    };
  },

  drawGraph: function() {
    chart(this.state.currentData);
  },

  compressData: function(data) {
    // compute average
    var n = 100;
    var count = 0;

    var compressedArray = [];

    var numberOfIterations = Math.floor(data.length / n);
    
    var lastIterationCount = data.length % n;

    for(var i = 0; i < numberOfIterations + 1; i++) {
      var total = 0;
      var date = {};
      var last = n * (i + 1);

      // set last count so we will not go out of bounds
      if(i === numberOfIterations) {
        last = n * i + lastIterationCount;
      }

      
      for(var j = (n * i); j < last; j++) {
        total += data[j][1];
        
        // set date as last reading
        if(j === last - 1) {
          date = data[j][0];
        }
      }

      compressedArray.push([new Date(date), total / n]);
      
    }

    return compressedArray;
    
  },

  getData: function(sensor) {
    var sensordata = this.state.sensors.find(function(el, i, a) {
      if(el.name === sensor)  return true;

      return false;
    });
    if(sensordata !== undefined) {
      superagent.get('https://friskby.herokuapp.com/sensor/api/reading/' + sensordata.dataids[0] + '?num=1000')
        .end(function(err, res) {
          var data = JSON.parse(res.text);
          var currentData = this.compressData(data);
          this.setState({currentData: currentData});
        }.bind(this));
    }

    // this.setState({currentData: [['Tue Dec 01 2015 17:23:44 GMT+0100 (CET)', 123], ['Tue Dec 02 2015 17:23:44 GMT+0100 (CET)', 133], ['Tue Dec 03 2015 17:23:44 GMT+0100 (CET)', 143]] });
  },

  changeCurrentSensor: function(event) {
    var sensor = event.target.value;

    this.setState({currentSensor: sensor, currentData: []});
    this.getData(sensor);
  },

  componentDidMount: function() {
    this.getData(this.state.currentSensor);
    this.drawGraph();
  },

  componentDidUpdate: function() {
    this.drawGraph();
  },
  

  render: function() {
    var sensors = this.state.sensors.map(function(sensor, i) {
      return dom.option({value: sensor.name, key: i}, sensor.name);
    });
    
    return dom.div({},
                   dom.svg({id: 'graph'}, ''),
                   dom.select({value: this.state.currentSensor, onChange: this.changeCurrentSensor}, sensors)
                  );
  }
});
