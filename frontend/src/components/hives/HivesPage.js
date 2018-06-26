import React from 'react';
import Hive from "./Hive";
import "../block/Block.css";

class HivesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hives: [],
        };

        this.goToHive = this.goToHive.bind(this);
        this.onHover = this.onHover.bind(this);
    }


    componentDidMount() {
        fetch('http://localhost:5000/hive/hives')
            .then(response => response.json())
            .then(data => this.setState({hives: data}))
            .catch(error => console.log(error));
    }

    goToHive(event, hiveId){
        event.preventDefault();
        alert("going to hivepage " + hiveId);
    }

    onHover(event){

    }

    render() {
        let hives = this.state.hives;
        let listItems;

        listItems = hives.map((item) =>
            <div style={{cursor:'pointer'}}>
                <div className="item dare-col">
                    <Hive name={item.hiveName} content={item.totalScore} image="https://placeimg.com/400/400/nature" beekeeper={item.beekeeper}/>
                </div>
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