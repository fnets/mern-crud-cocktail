var React = require('react');
var ReactDOM = require('react-dom');

var CocktailFilter = React.createClass({
  render: function() {
  	console.log("******************************Rendering CocktailFilter, state=", this.state);
    return (
      <div>
        <h3>Filter</h3>
        Ingredients:
        <select value={this.state.ingredients} onChange={this.onChangeIngredients}>
          <option value="">(Any)</option>
          <option value="jugs">jugs</option>
          <option value="everything">everything</option>
        </select>
        <br/>
        Name:
        <select value={this.state.name} onChange={this.onChangeName}>
          <option value="">(Any)</option>
          <option value="Bug Juice">Bug Juice</option>
          <option value="High School">High School</option>
        </select>
        <br/>
        <button onClick={this.submit}>Apply</button>
      </div>
    )
  },
  
  getInitialState: function() {
    console.log("CocktailFilter, getInitialState",this.props.initFilter);
    var initFilter = this.props.initFilter;
    return {name: initFilter.name, ingredients: initFilter.ingredients};
  },

  componentWillReceiveProps: function(newProps) {
    console.log("componentWillReceiveProps, newProps=", newProps);
    console.log("componentWillReceiveProps, state=", this.state);
    console.log("componentWillReceiveProps, state.name=", this.state.name);
    console.log("componentWillReceiveProps, initFilter.name=", newProps.initFilter.name);

    if (newProps.initFilter.name === this.state.name
        && newProps.initFilter.ingredients === this.state.ingredients) {
      console.log("CocktailFilter: componentWillReceiveProps, no change");
      return;
    }
    console.log("CocktailFilter: componentWillReceiveProps, new filter:", newProps.initFilter);
    this.setState({name: newProps.initFilter.name, ingredients: newProps.initFilter.ingredients});
  },

  onChangeIngredients: function(e) {
    
    this.setState({ingredients: e.target.value});
  },
  
  onChangeName: function(e) {
    this.setState({name: e.target.value});
  },

  submit: function(e) {
    var newFilter = {};
    if (this.state.name) newFilter.name = this.state.name;
    if (this.state.ingredients) newFilter.ingredients = this.state.ingredients;
    console.log("********Submit, newFilter:", newFilter);
    this.props.submitHandler(newFilter);
  }
});

module.exports = CocktailFilter;