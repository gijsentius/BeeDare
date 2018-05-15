import React from 'react';
import personPlaceholder from '../../images/personPlaceholder.png';
import './Icon.css';

class Icon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
            action: props.action,
            online: props.online,
        };
    }

    componentDidMount() {
        if (this.state.image === undefined) {
            this.setState({image: personPlaceholder});
        }
        if (this.state.online === undefined) {
            this.setState({online: false});
        }
    }

    render() {
        if (!this.state.online) {
            return (
                <img className='icon' src={this.state.image} onClick={this.state.action} alt=''
                     style={{'border': '3px solid black', 'margin-left': '1%', 'margin-right': '1%'}}/>
            )
        }
        else{
            return (
                <img className='icon' src={this.state.image} onClick={this.state.action} style={{'margin-left': '1%', 'margin-right': '1%'}} alt=''/>
            )
        }
    }
}

export default Icon;