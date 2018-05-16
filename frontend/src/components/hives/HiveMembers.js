import React from 'react';
import './Hives.css';
import Block from "../block/Block";

class HiveMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //icons
            members: props.members
        }
    }

    render() {
        let list = [];
        if (this.state.members !== undefined) {
            for (let i = 0; i < this.state.members.length; i++) {
                list.push(<li key={i} className="item">{this.state.members[i]}</li>);
            }
        }
        return (
            <Block title="Members" content={list}/>
        )
    }
}

export default HiveMembers