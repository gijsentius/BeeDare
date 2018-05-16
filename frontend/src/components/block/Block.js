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
        return (
            <ul className="list">
                <li className="item"><h3 className="text">{this.state.title}</h3></li>
                <div className="apiary">{this.state.content}</div>
            </ul>

        )
    }
}

export default Block