var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;

var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;

var CocktailList = require('./CocktailList');
var CocktailEdit = require('./CocktailEdit');


var NoMatch = React.createClass({
  render: function() {
    return (
      <h2>No match for the route</h2>
    );
  }
});

ReactDOM.render(
  (
    <Router>
      <Route path="/cocktails" component={CocktailList} />
      <Route path="/cocktails/:id" component={CocktailEdit} />
      <Redirect from="/" to="/cocktails" />
      <Route path="*" component={NoMatch} />
    </Router>
  ),
  document.getElementById('main')
);