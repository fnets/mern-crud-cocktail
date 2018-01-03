var React = require('react');
var ReactDOM = require('react-dom');

var CocktailAdd = React.createClass({
  render: function() {
  	//console.log("Rendering CocktailAdd");
    return (
      <div>
        <form name="cocktailAdd">
          <input type="text" name="name" placeholder="Cocktail Name" />
          <input type="text" name="ingredients" placeholder="Cocktail Ingredients" />
          <input type="text" name="instructions" placeholder="Cocktail Instructions" />
          <input type="text" name="strMeasure1" placeholder="Cocktail Measure" />
          <button onClick={this.handleSubmit}>Add Cocktail</button>
        </form>
      </div>
    )
  },
  
  handleSubmit: function(e) {
    e.preventDefault();
    var form = document.forms.cocktailAdd;
    this.props.addCocktail({name: form.name.value, ingredients: form.ingredients.value, instructions: form.instructions.value, strMeasure1: form.strMeasure1.value});
    // clear the form for the next input
    form.name.value = ""; form.ingredients.value = ""; form.instructions.value = "", form.strMeasure1.value = "";
  }
});

module.exports = CocktailAdd;