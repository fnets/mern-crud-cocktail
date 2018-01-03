var CocktailFilter = React.createClass({
  render: function() {
    console.log("Rendering CocktailFilter");
    return (
      <div>A way to filter the list of Cocktails would come here.</div>
    )
  }
});

var CocktailRow = React.createClass({
  render: function() {
    console.log("Rendering CocktailRow:", this.props.cocktail);
    return (
      <tr>
        <td>{this.props.cocktail.id}</td>
        <td>{this.props.cocktail.name}</td>
        <td>{this.props.cocktail.ingredients}</td>
        <td>{this.props.cocktail.instructions}</td>
      </tr>
    )
  }
});

var CocktailTable = React.createClass({
  render: function() {
    console.log("Rendering CocktailTable, num items:", this.props.cocktails.length);
    var cocktailRows = this.props.cocktails.map(function(cocktail) {
      return <CocktailRow key={cocktail.id} cocktail={cocktail} />
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          {cocktailRows}
        </tbody>
      </table>
    )
  }
});

var CocktailAdd = React.createClass({
  console.log("Rendering CocktailAdd");
  render: function() {
    return (
      <div>
        <form name="cocktailAdd">
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="ingredient" placeholder="Ingredient" />
          <button onClick={this.handleSubmit}>Add Cocktail</button>
        </form>
      </div>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var form = document.forms.CocktailAdd;
    this.props.addCocktail({name: form.name.value, ingredient: form.ingredient.value, instructions: 'I dunno'});
    // clear the form for the next input
    form.owner.value = ""; form.title.value = "";
  }
});

var cocktailData = [
          <CocktailRow id={1} name="Bug Juice" ingredients="bugs" instructions="smash up a bunch of bugs"  />
          <CocktailRow id={2} name="High School" ingredients="everything" instructions="be insecure"  />
];

var CocktailList = React.createClass({
  getInitialState: function() {
     return {cocktails: cocktailData};
  },
  render: function() {
    console.log("Rendering CocktailList, num items:", this.state.cocktails.length);
    return (
      <div>
        <h1>Cocktail List</h1>
        <CocktailFilter />
        <hr />
        <CocktailTable cocktails={this.state.cocktails}/>
        <hr />
        <CocktailAdd addCocktail={this.addCocktail} />
      </div>
    )
  },

  addCocktail: function(cocktail) {
    console.log("Adding cocktail:", cocktail);
    // We're advised not to modify the state, it's immutable. So, make a copy.
    var cocktailsModified = this.state.cocktails.slice();
    cocktail.id = this.state.cocktails.length + 1;
    cocktailsModified.push(cocktail);
    this.setState({cocktails: cocktailsModified});
  }
});

ReactDOM.render(
  <CocktailList />,
  document.getElementById('main')
);