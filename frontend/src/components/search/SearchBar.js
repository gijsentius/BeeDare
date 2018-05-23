import React, {Component} from 'react';
import './Search.css';

class SearchBar extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <input id="search" placeholder="Search" required/>
                    <i className="material-icons">search</i>
                </div>
            </div>
        );
    }
}

export default SearchBar;