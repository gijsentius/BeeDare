import React from 'react';
import './Block.css';

class Block extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            content: props.content,
        }
    }

    render() {
        // className="list"
        //className="item"

        return (
            <ul >
                <li ><h3 className="text center-align">{this.state.title}</h3></li>
                    <div className="apiary col">{this.state.content}</div>
            </ul>

        )
    }
}


export default Block