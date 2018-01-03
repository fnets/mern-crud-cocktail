import SearchInput, {createFilter} from 'react-search-input'

const KEYS_TO_FILTERS = ['name', 'ingredients', 'recipe', 'description']

var reactSearchComponent = React.createClass({
  getInitialState () {
    return { searchTerm: '' }
  },

  render () {
    const filteredCocktails = cocktails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        {filteredCocktails.map(cocktail => {
          return (
                this.setState({name: newProps.initFilter.name, ingredients: newProps.initFilter.ingredients});
          )
        })}
      </div>
    )
  },

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
})