var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var CocktailEdit = React.createClass({
  render: function() {
    return(
      <div>
        Edit cocktail: {this.props.params.id}
        <br/>
        <form onSubmit={this.submit}>
          Ingredients:
          <select name="ingredients" value={this.state.ingredients} onChange={this.onChangeIngredients}>
            <option value="jugs">jugs</option>
            <option value="everything">everything</option>
          </select>
          <br/>
          Name:
          <select value={this.state.name} onChange={this.onChangeName}>
            <option>Bug Juice</option>
            <option>High School</option>
          </select>
          <br/>
          Measure: <input type="text" value={this.state.measure} onChange={this.onChangeMeasure}/>
          <br/>
          Instructions: <input type="text" value={this.state.instructions} onChange={this.onChangeInstructions}/>
          <br/>
          <button type="submit">Submit</button><Link to="/cocktails">Back to cocktail list</Link>
        </form>
      </div>
    );
  },
  
  getInitialState: function() {
    return {};
  },
  
  componentDidMount: function() {
    this.loadData();
  },
  
  componentDidUpdate: function(prevProps) {
    console.log("CocktailEdit: componentDidUpdate", prevProps.params.id, this.props.params.id);
    if (this.props.params.id != prevProps.params.id) {
      this.loadData();
    }
  },
  
  loadData: function() {
    $.ajax('/api/cocktails/' + this.props.params.id) .done(function(cocktail) {
      this.setState(cocktail);
    }.bind(this));
  },
  
  onChangeIngredients: function(e) {
    this.setState({ingredients: e.target.value});
  },
  
  onChangeName: function(e) {
    this.setState({name: e.target.value});
  },  

  onChangeMeasure: function(e) {
    this.setState({measure: e.target.value});
  },

  onChangeInstructions: function(e) {
    this.setState({instructions: e.target.value});
  },

  submit: function(e) {
    e.preventDefault();
    var cocktail = {
      ingredients: this.state.ingredients,
      name: this.state.name,
      measure: this.state.measure,
      instructions: this.state.instructions
    }

    $.ajax({
      url: '/api/cocktails/' + this.props.params.id, type: 'PUT', contentType:'application/json',
      data: JSON.stringify(cocktail),
      dataType: 'json',
      success: function(cocktail) {
        this.setState(cocktail);
      }.bind(this),
    });
  }
  
});

module.exports = CocktailEdit;
