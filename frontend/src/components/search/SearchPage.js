import React, {Component} from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Icon from "../icon/Icon";
import Hive from "../hives/Hive";
import ChallengeCard from "../challenge/ChallengeCard";
import "../block/Block.css";
import Link from "react-router-dom/es/Link";

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            searchResults: [],
            userResults: [],
            hiveResults: [],
            dareResults: [],
            query: '',
            content: <div/>
        };
        this.search = this.search.bind(this);
    }

    search(input) {
        let searchQuery = input.split(' ').join('+'); // to split with multiple seperators use regex
        this.fetchResults(searchQuery);
    }

    fetchResults(searchQuery) {
        this.setState({query: searchQuery});
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
                <div className='row'>
                    <SearchBar search={this.search}/>
                    <input type='button' className="btn amber darken-1" value='Search' onClick={() => this.getItems()}/>
                </div>
                {/*<SearchResults results={this.state.searchResults}/>*/}
                {/*{console.log(this.state.hiveResults)}*/}
                {/*{this.getItems()}*/}
                {this.state.content}
            </div>
        );
    }

    getItems() {
        let userList = [];
        let startUser = [];
        let hiveList = [];
        let startHive = [];
        let dareList = [];
        let startDare = [];

        for (let i = 0; i < this.state.userResults.length; i++) {
            if (this.state.userResults[i][0].toLowerCase().startsWith(this.state.query.toLowerCase())) {
                startUser.push(<Link to={"/profile/" + this.state.userResults[i][0]} className='search-result-box item'
                                     style={{maxWidth: '15vw'}}><Icon
                    image={"http://localhost:5000/image/" + this.state.userResults[i][3] + "/users"}/>
                    <p className='text'>{this.state.userResults[i][0]}</p></Link>)
            }
            else {
                userList.push(<Link to={"/profile/" + this.state.userResults[i][0]} className='search-result-box item'
                                    style={{maxWidth: '15vw'}}><Icon
                    image={"http://localhost:5000/image/" + this.state.userResults[i][3] + "/users"}/>
                    <p className='text'>{this.state.userResults[i][0]}</p></Link>)
            }
        }
        for (let i = 0; i < this.state.hiveResults.length; i++) {
            if (this.state.hiveResults[i][0].toLowerCase().startsWith(this.state.query.toLowerCase())) {
                startHive.push(
                    <div style={{cursor: 'pointer'}}>
                        <div className="item dare-col">
                            <Hive name={this.state.hiveResults[i][0]} content={this.state.hiveResults[i][2]}
                                  image={"http://localhost:5000/image/" + this.state.hiveResults[i][4] + "/hives"}/>
                        </div>
                    </div>)
                //     <div className='search-result-box item'>
                //         <Hive name={this.state.hiveResults[i][0]} content={this.state.hiveResults[i][2]} image="https://placeimg.com/400/400/nature"/>
                // </div>)
            }
            else {
                hiveList.push(<div className='search-result-box item'><Hive name={this.state.hiveResults[i][0]}
                                                                            image={"http://localhost:5000/image/" + this.state.hiveResults[i][4] + "/hives"}/>
                </div>)
            }
        }
        for (let i = 0; i < this.state.dareResults.length; i++) {
            if (this.state.dareResults[i][2].toLowerCase().startsWith(this.state.query.toLowerCase())) {
                startDare.push(<div className='search-result-box'><ChallengeCard
                    description={this.state.dareResults[i][2]}
                    reward={this.state.dareResults[i][2]}
                    title={this.state.dareResults[i][2]}/>
                </div>)
            }
            else {
                dareList.push(<div className='search-result-box'><ChallengeCard
                    description={this.state.dareResults[i][2]}
                    reward={this.state.dareResults[i][2]}
                    title={this.state.dareResults[i][2]}/>
                </div>)
            }
        }
        this.setState({
            content: <div>
                <div className='card'>
                    <h6 className="center">Users</h6>
                    <div className="search-results row">{startUser}{userList}</div>
                    <br/>
                </div>
                <div className='card'>
                    <h6 className="center">Hives</h6>
                    <div className="search-results">{startHive}{hiveList}</div>
                    <br/>
                </div>
                <div className='card'>
                    <h6 className="center">Dares</h6>
                    <div className="search-results">{startDare}{dareList}</div>
                    <br/>
                </div>
            </div>
        })
    }
}

export default SearchPage;