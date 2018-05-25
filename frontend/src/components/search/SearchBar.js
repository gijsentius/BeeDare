import React, {Component} from 'react';
import './Search.css';

class SearchBar extends Component {

    render() {
        return (
            <div className="card">
                <div className="search-field">
                    <div className="input-field">
                        <input id="search" type="search" onChange={(input) => this.props.search(input.target.value)} required/>
                        <i className="material-icons search-icon">search</i>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;