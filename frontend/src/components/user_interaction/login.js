import React from 'react';
import '../user_interaction/login-register.css'
import {Redirect} from "react-router-dom";
import {UserContext} from "../UserProvider";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            forgotPW: false,
            redirectToReferrer: false
        };
        this.handleForgottenPW = this.handleForgottenPW.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    handleLogin(event) {
        event.preventDefault();
        this.setState(() => ({
            redirectToReferrer: true
        }))
    };


    handleForgottenPW() {
        this.setState({forgotPW: !this.state.forgotPW});
    }

    render() {
        const {redirectToReferrer} = this.state;
        const { from } = this.props.location || { from: { pathname: '/' } };

        if (redirectToReferrer === true) {
            return <Redirect to={from}/>
        }

        return (
            <div className="card">
                <div className="card-content">
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="title">
                                    <h5 className="title">Login</h5>
                                </div>
                                <div className="input-field col s12">
                                    <input id="email_login" type="email" className="validate"/>
                                    <label htmlFor="email_login">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" type="password" className="validate"/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="center">
                                    <UserContext.Consumer>
                                        {(context) => <a onClick={(event) => {
                                            context.authenticate();
                                            this.handleLogin(event)
                                        }} className="waves-effect
                                                         waves-light btn #ffd54f amber lighten-1">
                                            Login
                                        </a>}
                                    </UserContext.Consumer>
                                </div>
                            </div>

                            <div className="row">
                                <p className="center">Or login with Google</p>
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
                                    <a className="waves-effect waves-light btn-small amber lighten-1">Send password</a>
                                </div>
                            </div> : null}

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
