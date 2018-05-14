import React from 'react';
import personPlaceholder from './images/personPlaceholder.png';
import './components.css';

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
        if (this.state.action === undefined) {
            this.setState({action: () => alert("No action set.")});
        }
        if (this.state.online === undefined) {
            this.setState({online: false});
        }
    }

    render() {
        let color = '#343434';
        if(this.state.online){
            color = '#8F6593';
        }
        return (
            <img className='icon' src={this.state.image} onClick={this.state.action} alt='' style={{'border-color':color}}/>
        )
    }
}

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: props.friends,
        }
    }

    componentDidMount() {
        if (this.state.friends === undefined) {
            this.setState({friends: ['no friends']});
        }
    }

    render() {
        let list = [];
        if (this.state.friends !== undefined) {
            for (let i = 0; i < this.state.friends.length; i++) {
                let info = this.getInfo(this.state.friends[i]);
                list.push(<td key={i}><Icon action={() => alert(info.name)} online={info.online} image={info.image}/></td>);
            }
        }
        return (
            <div className='friendsList'>
                <h3>Active Friends</h3>
                <table>
                    <tbody>
                    <tr>{list}</tr>
                    </tbody>
                </table>
            </div>
        )
    }

    getInfo(friend){
        return {name:friend, online:false, image:undefined};
    }
}

export {Icon, Friends};