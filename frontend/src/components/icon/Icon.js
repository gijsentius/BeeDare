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
        let color = '#343434';
        if (this.state.online) {
            color = '#8F6593';
        }
        return (
            <img className='icon' src={this.state.image} onClick={this.state.action} alt=''
                 style={{'borderColor': color}}/>
        )
    }
}

export default Icon;