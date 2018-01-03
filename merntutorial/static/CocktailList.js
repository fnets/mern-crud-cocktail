var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var CocktailFilter = require('./CocktailFilter');
var CocktailAdd = require('./CocktailAdd');

CocktailRow = React.createClass({
  displayName: 'CocktailRow',

  render: function () {
    console.log("Rendering CocktailRow", this.props.cocktail);
    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        null,
        this.props.cocktail._id
      ),
      React.createElement(
        'td',
        null,
        this.props.cocktail.name
      ),
      React.createElement(
        'td',
        null,
        this.props.cocktail.ingredients
      ),
      React.createElement(
        'td',
        null,
        this.props.cocktail.instructions
      )
    );
  }
});

var CocktailTable = React.createClass({
  displayName: 'CocktailTable',

  render: function () {
    console.log("Rendering CocktailTable, num items:", this.props.cocktails.length);
    var cocktailRows = this.props.cocktails.map(function (cocktail) {
      return React.createElement(CocktailRow, { key: cocktail._id, cocktail: cocktail });
    });
    return React.createElement(
      'table',
      null,
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            null,
            'Id'
          ),
          React.createElement(
            'th',
            null,
            'Name'
          ),
          React.createElement(
            'th',
            null,
            'Ingredients'
          ),
          React.createElement(
            'th',
            null,
            'Instructions'
          )
        )
      ),
      React.createElement(
        'tbody',
        null,
        cocktailRows
      )
    );
  }
});

var CocktailList = React.createClass({
  displayName: 'CocktailList',

  getInitialState: function () {
    return { cocktails: [] };
  },
  render: function () {
    console.log("Rendering CocktailList, num items:", this.state.cocktails.length);
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Cocktail List'
      ),
      React.createElement(CocktailFilter, null),
      React.createElement('hr', null),
      React.createElement(CocktailTable, { cocktails: this.state.cocktails }),
      React.createElement('hr', null),
      React.createElement(CocktailAdd, { addCocktail: this.addCocktail })
    );
  },

  componentDidMount: function () {
    $.ajax('/api/cocktails').done(function (data) {
      this.setState({ cocktails: data });
    }.bind(this));
    // In production, we'd also handle errors.
  },

  addCocktail: function (cocktail) {
    console.log("Adding cocktail:", cocktail);
    $.ajax({
      type: 'POST', url: '/api/cocktails', contentType: 'application/json',
      data: JSON.stringify(cocktail),
      success: function (data) {
        var cocktail = data;
        // We're advised not to modify the state, it's immutable. So, make a copy.
        var cocktailsModified = this.state.cocktails.concat(cocktail);
        this.setState({ cocktails: cocktailsModified });
      }.bind(this),
      error: function (xhr, status, err) {
        // ideally, show error to user.
        console.log("Error adding cocktail:", err);
      }
    });
  }
});

module.exports = CocktailList;