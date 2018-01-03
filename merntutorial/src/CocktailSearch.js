

//CHECK THIS OUT
//https://www.npmjs.com/package/react-list-filter
// https://github.com/enkidevs/react-search-input
// http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/



var React = require('react');
var ReactDOM = require('react-dom');

var CocktailSearch = React.createClass({
  	
  	render:function(){
        console.log("Rendering CocktailSearch*******************************")  
        return (
            <div>
                <h2>Search</h2>
                <SearchBox query={this.state.query} doSearch={this.doSearch}/>
            </div>
       );
    },
  	
    doSearch:function(queryText){
        console.log("query text", queryText)
        //get query result
        var queryResult=[];
        this.props.data.forEach(function(cocktail){
            if(cocktail.name.toLowerCase().indexOf(queryText)!=-1)
            queryResult.push(cocktail);
        });
 
        this.setState({
            query:queryText,
            filteredData: queryResult
        })
    },
    
    getInitialState: function() {
    console.log("CocktailSearch, getInitialState",this.props.initFilter);
    var initFilter = this.props.initFilter;
    return {
            name: initFilter.name,
            ingredients: initFilter.ingredients,
            instructions: initFilter.instructions,
            strMeasure1: initFilter.strMeasure1,
            query:'', 
            filteredData: this.props.data
        };
    }
    
});

module.exports = CocktailSearch;