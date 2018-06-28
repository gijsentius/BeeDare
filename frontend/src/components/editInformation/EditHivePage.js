import React from 'react';
import Icon from "../icon/Icon";
import {Link} from "react-router-dom";
import Upload from "../upload/Upload";

class EditHivePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileInfo: [],
            image: '',
            name: this.props.match.params.name,
            response: ''
        };

        this.editInformation = this.editInformation.bind(this);
    }

    componentDidMount() {
        // hier nog graag een API request die alleen op ID haalt, anders beetje zonde van data etc.
        fetch('http://localhost:5000/profile/hive/' + this.props.match.params.name)
            .then(response => response.json())
            .then(data => this.setState({profileInfo: data.hive}))
            .catch(error => console.log(error));
    }

    // source: https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
    // comment voor merge

    editInformation(event, hive_name) {
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);

        fetch('http://localhost:5000/profile/hive/edit/' + hive_name, {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(data => this.setState({response: data.success}))
            .catch(error => console.log(error));
        // window.location.reload()
    }

    render() {
        if (!this.props.match.params.name) {
            return <div/>
        }
        // Het is dus van essentieel belang om hier const te gebruiken, anders krijg je undefined errors.
        const profileInfo = this.state.profileInfo;

        return (

            <div className="container">
                <form onSubmit={(e) => this.editInformation(e, profileInfo[1])} className="col s12">
                    <div className="row">
                        <div className="col 6">
                            <div style={{maxWidth: "10vw", maxHeight: "auto"}}>
                                <Icon image={'http://localhost:5000/image/' + profileInfo[2] + '/hives'}
                                      action={() => alert(profileInfo.image)}/>
                            </div>
                        </div>
                        {/*Br is misschien wel heel lelijk, maar is voor nu een snelle oplossing*/}
                        <br/>
                        <br/>

                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input name="hive_name" placeholder={profileInfo[1]}
                                   id="hive_name" type="text" className="validate"/>
                            <label className="active" htmlFor="first_name">Hive Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input name="beekeeper" placeholder={profileInfo[4]}
                                   id="beekeeper" type="text" className="validate"/>
                            <label className="active" htmlFor="last_name">Beekeeper</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn amber darken-1">Save changes</button>
                    </div>
                    <h6>{this.state.response}</h6>
                </form>
                <Upload folder='users'/>
            </div>
        )
    }
}

export default EditHivePage;