import React, {Component} from 'react';
import './Search.css';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchItems:this.props.SearchResults,
        }
    }

    render() {
        // let results = [];
        // if
        // for(let i=0;i<this.state.searchItems.length;i++) {
        //     results.push(
        //         <div className="card ">
        //         </div>
        //     );
        // }
        return (
            <div>
                {/* {results} */}
            </div>
        );
    }
}

export default SearchResults;