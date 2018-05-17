import React from 'react';
import './Hives.css';
import Icon from "../icon/Icon";

class Hive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            content: props.content,
            image: props.image,
        }
    }

    componentDidMount() {
        if (this.state.name === undefined) {
            this.setState({name: ['Hive']});
        }
    }

    render() {
        return (
                <div className="row">
                    <div className="col s8 section">
                        <b className="text">{this.state.name}</b>
                        <p className="text">{this.state.content}</p>
                    </div>
                    <div className="col s4">
                        <Icon image={this.state.image} action={undefined}/>
                        <a className="waves-effect #4dd0e1 btn-small amber darken-1 s12 col">Join!</a>
                    </div>
            </div>
        )
    }
}

export default Hive