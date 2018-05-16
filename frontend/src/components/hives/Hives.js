import React from 'react';
import './Hives.css';
import Block from "../block/Block";

class Hives extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //hive
            hives: props.hives,
        }
    }

    render() {
        let list = [];
        if(this.state.hives !== undefined){
            for(let i = 0; i < this.state.hives.length; i++){
                list.push(<li key={i} className="item">{this.state.hives[i]}</li>);
            }
        }
        return (
            <Block title="Hives" content={list}/>
        )
    }
}

export default Hives