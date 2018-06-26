import React from 'react';
import {UserContext} from "../UserProvider";

class ChangeEmailPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileInfo: [],
            username: null,
            token: null,
            renderOnce: true,
        };
        this.editInformation = this.editInformation.bind(this);
    }

    fetchImportant() {
        if (this.state.username) {
            fetch('http://localhost:5000/profile/user/' + this.state.username + "/" + this.state.token)
                .then(response => response.json())
                .then(data => this.setState({profileInfo: data}))
                .catch(error => console.log(error));

            this.setState({renderOnce: false});
        }
    }

    editInformation(event) {
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);

        fetch('http://localhost:5000/profile/user/pwandeedit/' + this.state.username + "/" + this.state.token, {
            method: 'POST',
            body: data,
        });
        window.location.reload()
    }

    // comment voor merge
    render() {

        if(this.state.renderOnce){
            return(
                <UserContext.Consumer>{
                    (context) => { this.setState({username: context.loggedInUsername,
                        token: context.token}); this.fetchImportant() ;}
                }
                </UserContext.Consumer>
            )
        }


        if (!this.state.profileInfo) {
            return <div/>
        }

        const profileInfo = this.state.profileInfo;

        return (

            <div className="container">
                <form onSubmit={(e) => this.editInformation(e)} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="email" placeholder={profileInfo.email} id="email_register" type="email"
                                   className="validate"/>
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
                            <input name="confirmnewpassword" id="confirm_password_new" type="password"
                                   className="validate"/>
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