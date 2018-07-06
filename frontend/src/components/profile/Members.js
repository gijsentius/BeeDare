import React from 'react';
import Block from "../block/Block";
import Icon from "../icon/Icon";
import Link from "react-router-dom/es/Link";

class Members extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const members = this.props.members;

        let list = [];
        for (let i = 0; i < members.length; i++) {
            list.push(<Link to={"/profile/" + members[i]}><div className='item col s4 m3 l2'><Icon/>{members[i]}</div></Link>)
        }
        return <div className='card dare-cols'>
            <div>{list}</div>
        </div>
    }
}

export default Members