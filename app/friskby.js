var React = require('react');
var ReactDOM = require('react-dom');
var dash = React.createFactory(require('./components/dash.js'));


ReactDOM.render(dash(), document.getElementById('dash'));
