import React, {Component} from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            searchResults: []
        }
        this.search.bind(this);
    }

    search(input) {
        let searchQuery = input.split(' ').join('+'); // to split with multiple seperators use regex
        console.log(searchQuery);
        // this.fetchResults(searchQuery);
    }

    fetchResults(searchQuery) {
        fetch("api" + searchQuery)
            .then(response => response.json())
            .then(data => this.setState({ searchResults: data.results }));
    }

    render() {
        return (
            <div>
                <SearchBar search={this.search}/>
                <SearchResults results={this.state.searchResults}/>
            </div>
        );
    }
}

export default SearchPage;