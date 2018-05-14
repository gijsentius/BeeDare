import React from 'react';
import personPlaceholder from '../../images/personPlaceholder.png';
import './Icon.css';

class Icon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
            action: props.action,
        };
    }

    componentDidMount() {
        if (this.state.image === undefined) {
            this.setState({image: personPlaceholder});
        }
        if (this.state.action === undefined) {
            this.setState({action: () => alert("No action set.")});
        }
    }

    render() {
        return (
            <img className='icon' src={this.state.image} onClick={this.state.action} alt=''/>
        )
    }
}

export default Icon;