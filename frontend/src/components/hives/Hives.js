import React from 'react';
import './Hives.css';
import Block from "../block/Block";

class Hives extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hives: props.hives,
        }
    }

    render() {
        let list = [];
        if(this.state.hives !== undefined){
            for(let i = 0; i < this.state.hives.length; i++){
                list.push(<div className="section"> <div key={i} className="item">{this.state.hives[i]}</div></div>);
            }
        }
        return (
            // <Block title="Hives" content={list}/>
            <div className="card">
            <div className="card-content">
                <h6 className="center-align">Hives</h6>
                {list}
            </div>
            </div>
        )
    }
}

export default Hives