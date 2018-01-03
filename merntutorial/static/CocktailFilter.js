var React = require('react');
var ReactDOM = require('react-dom');

var CocktailFilter = React.createClass({
  displayName: 'CocktailFilter',

  render: function () {
    console.log("Rendering CocktailFilter");
    return React.createElement(
      'div',
      null,
      'A way to filter the list of Cocktails would come here.'
    );
  }
});

module.exports = CocktailFilter;