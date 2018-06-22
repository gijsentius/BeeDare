import React from 'react';
import Icon from "../icon/Icon";
import EmployeeDagmar from "../../images/EmployeeDagmar.jpg";
import {Link} from "react-router-dom";
import {UserContext} from "../UserProvider";
import NotLogIn from "../ErrorMessages/NotLogIn";
import Login from "../user_interaction/login";
import Upload from "../upload/Upload";

class EditProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileInfo: [],
            image: ''
        };

        this.editInformation = this.editInformation.bind(this);
    }

    componentDidMount() {
        // hier nog graag een API request die alleen op ID haalt, anders beetje zonde van data etc.
        fetch('http://localhost:5000/profile/user')
            .then(response => response.json())
            .then(data => this.setState({profileInfo: data}))
            .catch(error => console.log(error));
    }

    // source: https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
    // comment voor merge

    editInformation(event, username) {
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);

        fetch('http://localhost:5000/profile/user/edit/' + username, {
            method: 'POST',
            body: data,
        });
        window.location.reload()
    }

    render() {
        if (!this.state.profileInfo[0]) {
            return <div/>
        }
        // Het is dus van essentieel belang om hier const te gebruiken, anders krijg je undefined errors.
        const profileInfo = this.state.profileInfo[0];

        // alert(this.getImage(profileInfo));

        return (

            <div className="container">
                <form onSubmit={(e) => this.editInformation(e, profileInfo.username)} className="col s12">
                    <div className="row">
                        <div className="col 6">
                            <div style={{maxWidth: "10vw", maxHeight: "auto"}}>
                                <Icon image={'http://localhost:5000/image/' + profileInfo.image + '/users'}
                                      action={() => alert(profileInfo.image)}/>
                            </div>
                        </div>
                        {/*Br is misschien wel heel lelijk, maar is voor nu een snelle oplossing*/}
                        <br/>
                        <br/>
                        {/*<form className="col s2">*/}
                            {/*<div className="file-field input-field">*/}
                                {/*<div className="btn btn-small amber darken-1">*/}
                                    {/*<i className="material-icons">edit</i>*/}
                                    {/*<input name="edit" type="file"/>*/}
                                {/*</div>*/}
                                {/*<div className="file-path-wrapper">*/}
                                    {/*<input className="file-path"/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</form>*/}

                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input name="firstName" placeholder={profileInfo.first_name}
                                   id="first_name" type="text" className="validate"/>
                            <label className="active" htmlFor="first_name">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input name="lastName" placeholder={profileInfo.last_name}
                                   id="last_name" type="text" className="validate"/>
                            <label className="active" htmlFor="last_name">Last Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input name="userName" placeholder={profileInfo.username}
                                   id="last_name" type="text" className="validate"/>
                            <label className="active" htmlFor="last_name">Username</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn amber darken-1">Save changes</button>
                    </div>
                </form>
                <div className="row">
                    {/*TODO: ervoor zorgen dat deze rechts op de pagina komt te staan*/}
                    <Link className="btn amber darken-1" to="/change-email">Edit Email and password</Link>
                </div>
                <Upload folder='users'/>
            </div>
        )
    }
}

export default EditProfilePage;