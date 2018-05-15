import React from 'react';
import './Hives.css';
import Icon from "../icon/Icon";

class Hive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            content: props.content
        }
    }

    componentDidMount() {
        if (this.state.name === undefined) {
            this.setState({name: ['Hive']});
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                </div>
                <div className="row">
                    <div className="col s8">
                        <b className="text">{this.state.name}</b>
                        <p className="text">{this.state.content}</p>
                    </div>
                    <div className="col s4">
                        <Icon/>
                        <a className="waves-effect #4dd0e1 btn-small s12 col">Join!</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Hive