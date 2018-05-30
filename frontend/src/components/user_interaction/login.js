import React from 'react';

export default class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {forgotPW : false};
    this.handleForgottenPW = this.handleForgottenPW.bind(this);

  }

  handleForgottenPW(){
    this.setState({forgotPW: !this.state.forgotPW});
  }

    render(){
        return this.state.forgotPW ? (
            <div className="row">
                <form className="col s12">
                    <div className="row">
                    <div className = "title">
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
                            <a className="waves-effect waves-light btn amber darken-1"
                            >
                                Login
                            </a>
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
                    <a className="waves-effect waves-light btn-small orange" onClick={this.handleForgottenPW}>Forgot password?</a>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email_forgot_pw" type="email" className="validate"/>
                            <label htmlFor="email_forgot_pw">Enter your email here</label>
                            <a className="waves-effect waves-light btn-small orange" >Send password</a>
                        </div>
                    </div>
                </form>
            </div>
        ) : (
            <div className="row">
                <form className="col s12">
                    <div className="row">
                    <div className = "title">
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
                            <a className="waves-effect waves-light btn amber darken-1"
                            >
                                Login
                            </a>
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
                    <a className="waves-effect waves-light btn-small orange" onClick={this.handleForgottenPW}>Forgot password?</a>
                    </div>
                </form>
            </div>
        );
    }
}
