import React from 'react';
import '../user_interaction/login-register.css'
import {Redirect} from "react-router-dom";
import {UserContext} from "../UserProvider";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            forgotPW: false,
            redirectToReferrer: false,
            password: "",
            email: "",
            showLogEffect: false,
        };
        this.handleForgottenPW = this.handleForgottenPW.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

    }

    handleLogin(event) {
        event.preventDefault();

        this.setState(() => ({
            redirectToReferrer: true
        }));
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }


    handleForgottenPW() {
        this.setState({forgotPW: !this.state.forgotPW});
    }

    render() {
        const {redirectToReferrer} = this.state;
        const {from} = this.props.location || {from: {pathname: '/'}};

        if (this.state.showLogEffect) {
            return this.mehhh();
        }

        if (redirectToReferrer === true) {
            return <Redirect to={from}/>
        }

        return (
            <div className="card">
                <div className="card-content">
                    <div className="row">
                        <UserContext.Consumer>{
                            (context) =>
                                <form onSubmit={(event) => {
                                    let formData = new FormData();
                                    formData.append('password', this.state.password);
                                    formData.append('email', this.state.email);
                                    context.authenticate(formData);
                                    this.handleLogin(event);
                                }}
                                      className="col s12">
                                    <div className="row">
                                        <div className="title">
                                            <h5 className="title">Login</h5>
                                        </div>
                                        <div className="input-field col s12">
                                            <input name="email" id="email_login" type="email"
                                                   onChange={this.handleEmailChange} className="validate"/>
                                            <label htmlFor="email_login">Email</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="password" id="password" type="password"
                                                   onChange={this.handlePasswordChange} className="validate"/>
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="center">

                                            <button className="btn amber darken-1">Log In</button>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="center">
                                            <a className="waves-effect waves-light btn social google light red"
                                            >
                                                Login with Google
                                            </a>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <a className="waves-effect waves-light btn-small orange"
                                           onClick={this.handleForgottenPW}>Forgot password?</a>
                                    </div>

                                    {this.state.forgotPW ? <div className="row">
                                        <div className="input-field col s12">
                                            <input id="email_forgot_pw" type="email" className="validate"/>
                                            <label htmlFor="email_forgot_pw">Enter your email here</label>
                                            <a className="waves-effect waves-light btn-small amber lighten-1">Send
                                                password</a>
                                        </div>
                                    </div> : null}
                                </form>}
                        </UserContext.Consumer>
                    </div>
                </div>
            </div>
        )
    }
}
