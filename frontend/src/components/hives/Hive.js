import React from 'react';
import Icon from "../icon/Icon";
import Link from "react-router-dom/es/Link";

class Hive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            content: props.content,
            image: props.image,
            beekeeper: props.beekeeper,
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
                    <p className="text">Score: {this.state.content}</p>
                    <p className="text">Beekeeper: {this.state.beekeeper}</p>
                </div>
                <div className="col s4">
                    <Icon image={this.state.image} action={undefined}/>
                    <Link to={"/hive/" + this.state.name} type='button'
                          className="waves-effect waves-light btn amber darken-1 center-component top-button">Fly!</Link>
                </div>
            </div>
        )
    }
}

export default Hive