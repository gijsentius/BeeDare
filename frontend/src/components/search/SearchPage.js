import React, {Component} from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Icon from "../icon/Icon";
import Hive from "../hives/Hive";
import ChallengeCard from "../challenge/ChallengeCard";

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            searchResults: [],
            userResults: [],
            hiveResults: [],
            dareResults: []
        };
        this.search = this.search.bind(this);
    }

    search(input) {
        let searchQuery = input.split(' ').join('+'); // to split with multiple seperators use regex
        console.log(searchQuery);
        this.fetchResults(searchQuery);
    }

    fetchResults(searchQuery) {
        fetch('http://localhost:5000/search/users/' + searchQuery)
            .then(response => response.json())
            .then(data => this.setState({userResults: data.result}))
            .catch(error => console.log(error));

        fetch('http://localhost:5000/search/hives/' + searchQuery)
            .then(response => response.json())
            .then(data => this.setState({hiveResults: data.result}))
            .catch(error => console.log(error));

        fetch('http://localhost:5000/search/dares/' + searchQuery)
            .then(response => response.json())
            .then(data => this.setState({dareResults: data.result}))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <SearchBar search={this.search}/>
                <SearchResults results={this.state.searchResults}/>
                {console.log(this.state.userResults)}
                {console.log(this.state.hiveResults)}
                {console.log(this.state.dareResults)}
                {this.getItems()}
            </div>
        );
    }

    getItems() {
        let userList = [];
        let hiveList = [];
        let dareList = [];
        for (let i = 0; i < this.state.userResults.length; i++) {
            userList.push(<div className='search-result-box item' style={{maxWidth: '15vw'}}><Icon
                action={() => alert(this.state.userResults[i][0])}/>
                <p className='text'>{this.state.userResults[i][0]}</p></div>)
        }
        for (let i = 0; i < this.state.hiveResults.length; i++) {
            hiveList.push(<div className='search-result-box item'><Hive name={this.state.hiveResults[i][0]}/></div>)
        }
        for (let i = 0; i < this.state.dareResults.length; i++) {
            dareList.push(<div className='search-result-box'><ChallengeCard description={this.state.dareResults[i][2]}
                                                                            reward={this.state.dareResults[i][2]}
                                                                            title={this.state.dareResults[i][2]}/>
            </div>)
        }
        return <div>
            <div className='card'>
                <h6 className="center">Users</h6>
                <div className="search-results row">{userList}</div>
                <br/>
            </div>
            <div className='card'>
                <h6 className="center">Hives</h6>
                <div className="search-results">{hiveList}</div>
                <br/>
            </div>
            <div className='card'>
                <h6 className="center">Dares</h6>
                <div className="search-results">{dareList}</div>
                <br/>
            </div>
        </div>
    }
}

export default SearchPage;