import React from 'react';
import './NewsFeed.css';
import Hives from "../hives/Hives";
import Hive from "../hives/Hive";

class NewsFeedPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m4">
                    <Hives className="col s4" hives={[<Hive/>, <Hive/>, <Hive/>]}/>
                </div>
                <div className="col s12 m4">
                    <Hives className="col s4" hives={[<Hive/>, <Hive/>, <Hive/>]}/>
                </div>
                <div className="col s12 m4">
                    <Hives className="col s4" hives={[<Hive/>, <Hive/>, <Hive/>]}/>
                </div>
            </div>
        )
    }
}

export default NewsFeedPage