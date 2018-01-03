var React = require('react');
var ReactDOM = require('react-dom');

var CocktailAdd = React.createClass({
  displayName: 'CocktailAdd',

  render: function () {
    console.log("Rendering CocktailAdd");
    return React.createElement(
      'div',
      null,
      React.createElement(
        'form',
        { name: 'cocktailAdd' },
        React.createElement('input', { type: 'text', name: 'name', placeholder: 'Cocktail Name' }),
        React.createElement('input', { type: 'text', name: 'ingredients', placeholder: 'Cocktail Ingredients' }),
        React.createElement('input', { type: 'text', name: 'instructions', placeholder: 'Cocktail Instructions' }),
        React.createElement(
          'button',
          { onClick: this.handleSubmit },
          'Add Cocktail'
        )
      )
    );
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var form = document.forms.cocktailAdd;
    this.props.addCocktail({ name: form.name.value, ingredients: form.ingredients.value, instructions: form.instructions.value });
    // clear the form for the next input
    form.name.value = "";form.ingredients.value = "";form.instructions.value = "";
  }
});

module.exports = CocktailAdd;