import React, {Component} from 'react';
import ChallengeCard from '../challenge/ChallengeCard';
import Hive from '../hives/Hive';
import './SearchResults.css'

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchItems:this.props.searchResults,
        }
    }

    render() {
        let peopleResults = [];
        let hivesResults = [];
        let dareResults = [];
        let searchItems = this.state.searchItems;
        if(searchItems !== undefined) {
            for(let i=0;i<searchItems.length;i++) {
                let type = searchItems[i].type;
                if(type === 'hive') {
                    hivesResults.push(
                        <div className="search-result-box">
                            <Hive />
                        </div>
                    );
                }
                if(type === 'person') {
                    peopleResults.push(
                        <div className="search-result-box">
                            <test/>
                        </div>
                    );
                }
                if(type === 'dare') {
                    dareResults.push(
                        <div className="search-result-box">
                            <ChallengeCard
                                description={searchItems[i].description}
                                reward="60 gallons of honey"
                                title={searchItems[i].title}
                                image={searchItems[i].image}
                            />
                        </div>
                    );
                }
            }
            return (
                <div>
                    <div className="search-results">
                        {peopleResults}
                    </div>
                    <div className="search-results">
                        {hivesResults}
                    </div>
                    <div className="search-results">
                        {dareResults}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="search-results">
                </div>
            );
        }
    }
}

export default SearchResults;