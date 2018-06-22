import React from 'react';
import {UserContext} from "../UserProvider";
import Login from "../user_interaction/login";
import NotLogIn from "../ErrorMessages/NotLogIn";

class ChangeEmailPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileInfo: [],
        };
        this.editInformation = this.editInformation.bind(this);
    }

    componentWillMount() {
        fetch('http://localhost:5000/profile/user')
            .then(response => response.json())
            .then(data => this.setState({profileInfo: data}))
            .catch(error => console.log(error));
    }

    editInformation(event, username){
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);

        fetch('http://localhost:5000/profile/user/pwandeedit/' + username, {
            method: 'POST',
            body: data,
        });
        window.location.reload()
    }


    render() {

        if (!this.state.profileInfo[0]){
            return <div/>
        }

        const profileInfo = this.state.profileInfo[0];

        return(

            <div className="container">
                <form onSubmit={(e) => this.editInformation(e, profileInfo.username)} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="email" placeholder={profileInfo.email} id="email_register" type="email" className="validate"/>
                            <label className="active" htmlFor="email_register">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="oldpassword" id="password_old" type="password" className="validate"/>
                            <label htmlFor="password_old">Old Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="newpassword" id="password_new" type="password" className="validate"/>
                            <label htmlFor="password_new">New Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="confirmnewpassword" id="confirm_password_new" type="password" className="validate"/>
                            <label htmlFor="confirm_password_new">Confirm New Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="center" style={{boxAlign: "center"}}>
                            <button className="waves-effect waves-light btn #ffd54f amber lighten-1"
                            >
                               Confirm
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ChangeEmailPassword;