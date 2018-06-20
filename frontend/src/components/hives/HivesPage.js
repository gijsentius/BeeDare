import React from 'react';
import Hive from "./Hive";

class HivesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hives: [],
        };
    }


    componentDidMount() {
        fetch('http://localhost:5000/hive/hives')
            .then(response => response.json())
            .then(data => this.setState({hives: data}))
            .catch(error => console.log(error));
    }

    render() {
        let hives = this.state.hives;
        let listItems;

        listItems = hives.map((item) =>
            <div className="item dare-col">
                <Hive name={item.hiveName} content={item.totalScore} image="https://placeimg.com/400/400/nature"/>
            </div>
        );


        return (
                <div className="dare-cols">
                    {listItems}
                </div>
        )
    }
}

export default HivesPage;