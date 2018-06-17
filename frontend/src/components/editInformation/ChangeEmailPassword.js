import React from 'react';

class ChangeEmailPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileInfo: [],
        };
    }

    componentWillMount() {
        fetch('http://localhost:5000/profile/user')
            .then(response => response.json())
            .then(data => this.setState({profileInfo: data}))
            .catch(error => console.log(error));
    }


    render() {

        if (!this.state.profileInfo[0]){
            return <div/>
        }

        const email = this.state.profileInfo[0].email;

        return(
            <div className="container">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input placeholder={email} id="email_register" type="email" className="validate"/>
                            <label className="active" htmlFor="email_register">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password_old" type="password" className="validate"/>
                            <label htmlFor="password_old">Old Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password_new" type="password" className="validate"/>
                            <label htmlFor="password_new">New Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="confirm_password_new" type="password" className="validate"/>
                            <label htmlFor="confirm_password_new">Confirm New Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="center" style={{boxAlign: "center"}}>
                            <a className="waves-effect waves-light btn #ffd54f amber lighten-1"
                            >
                                <span className="text-color">Confirm</span>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ChangeEmailPassword;