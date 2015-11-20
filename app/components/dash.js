var React = require('react');
var dom = React.DOM;

module.exports = React.createClass({
  getInitialState: function() {

    return {};
  },

  render: function() {
    return dom.div({},
                   dom.svg({}, '')
                  );
  }
});
