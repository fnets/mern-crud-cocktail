var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var CocktailFilter = require('./CocktailFilter');
var CocktailAdd = require('./CocktailAdd');
//var CocktailSearch = require('./CocktailSearch');

var CocktailRow = React.createClass({
  render: function() {
  	console.log("*******************************Rendering CocktailRow", this.props.cocktail);
    return (
      <tr>
        <td>
          <Link to={'/cocktails/' + this.props.cocktail._id}>{this.props.cocktail._id}</Link>
        </td>
        <td>{this.props.cocktail.name}</td>
        <td>{this.props.cocktail.strMeasure1}</td>
        <td>{this.props.cocktail.ingredients}</td>
        <td>{this.props.cocktail.instructions}</td>
      </tr>
    )
  }
});

var CocktailTable = React.createClass({
  render: function() {
  	console.log("*******************************Rendering CocktailTable, num items:", this.props.cocktails.length);
    var cocktailRows = this.props.cocktails.map(function(cocktail) {
      return <CocktailRow key={cocktail._id} cocktail={cocktail} />
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Measure</th>
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

var CocktailList = React.createClass({
  getInitialState: function() {
    console.log("CocktailList, getInitialState");
  	return {cocktails: []};
  },
  render: function() {
  	console.log("Rendering CocktailList, num items:", this.state.cocktails.length);
    return (
      <div>
        <h1>Cocktail List</h1>
        // <SearchBox query={this.state.query} doSearch={this.doSearch}/>
        // <hr />
        <CocktailFilter submitHandler={this.changeFilter} initFilter={this.props.location.query}/>
        <hr />
        <CocktailTable cocktails={this.state.cocktails}/>
        <hr />
        <CocktailAdd addCocktail={this.addCocktail} />
      </div>
    )
  },
  
  componentDidMount: function() {
    console.log("CocktailList: componentDidMount");
    this.loadData();
  },

  componentDidUpdate: function(prevProps) {
    var oldQuery = prevProps.location.query;
    var newQuery = this.props.location.query;
    console.log('CocktailList: componentDidUpdate newQuery:',newQuery)
    console.log('CocktailList: componentDidUpdate oldQuery:',oldQuery)
    if (oldQuery.ingredients === newQuery.ingredients &&
        oldQuery.name === newQuery.name) {
      console.log("CocktailList: componentDidUpdate, no change in filter, not updating");
      return;
    } else {
      console.log("CocktailList: componentDidUpdate, loading data with new filter. should match componentDidUpdate");
      this.loadData();
    }
  },

  loadData: function() {
    var query = this.props.location.query;// || {};
    var filter = {ingredients: query.ingredients, name: query.name};
    console.log("CocktailList: componentDidUpdate: Loading data for query",this.props.location.query);

    $.ajax('/api/cocktails', {data: filter}).done(function(data) {
      this.setState({cocktails: data});
    }.bind(this));
    // In production, we'd also handle errors.
  },
  
  changeFilter: function(newFilter) {
    console.log("CocktailList: changeFilter: newFilter", newFilter);
    this.props.history.push({search: '?' + $.param(newFilter)});
    console.log("CocktailList: changeFilter: history push", {search: '?' + $.param(newFilter)});
  },
  
  addCocktail: function(cocktail) {
    console.log("Adding cocktail:", cocktail);
    $.ajax({
      type: 'POST', url: '/api/cocktails', contentType: 'application/json',
      data: JSON.stringify(cocktail),
      success: function(data) {
        var cocktail = data;
        // We're advised not to modify the state, it's immutable. So, make a copy.
        var cocktailsModified = this.state.cocktails.concat(cocktail);
        this.setState({cocktails: cocktailsModified});
      }.bind(this),
      error: function(xhr, name, err) {
        // ideally, show error to user.
        console.log("Error adding cocktail:", err);
      }
    });
  }
});

module.exports = CocktailList;