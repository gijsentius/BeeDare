import React from 'react';
import "./login-register.css";
import Redirect from "react-router-dom/es/Redirect";

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmpassword: "",
            email: "",
            firstname: "",
            lastname: "",
            username: "",
            message: [],
        };
        this.handleRegister = this.handleRegister.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);

    }

    handleRegister(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('password', this.state.password);
        formData.append('confirmpassword', this.state.confirmpassword);
        formData.append('email', this.state.email);
        formData.append('firstname', this.state.firstname);
        formData.append('lastname', this.state.lastname);
        formData.append('username', this.state.username);

        fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => this.setState({message: data}))
            .catch(error => console.log(error));
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleConfirmPasswordChange(e) {
        this.setState({confirmpassword: e.target.value});
    }

    handleFirstnameChange(e) {
        this.setState({firstname: e.target.value});
    }

    handleLastnameChange(e) {
        this.setState({lastname: e.target.value});
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    render() {
        let errors;
        if (this.state.message) {
            errors = this.state.message.map((mes) => <div>{mes.message}</div>);
        }

        let error;
        if (this.state.message) {
            error = this.state.message.map((mes) => mes.message);
            if (error[0] === "Success!") {
                return <Redirect to='/signin'/>
            }
        }

        return (

            <div className="card">
                <div className="card-content">
                    {errors ? <div>{errors}</div> : null}
                    <div className="row">
                        <form onSubmit={this.handleRegister}
                              className="col s12">
                            <div className="row">
                                <div className="title">
                                    <h5 className="title">Register</h5>
                                </div>

                                <div className="input-field col s6">
                                    <input id="first_name_register" type="text" className="validate"
                                           onChange={this.handleFirstnameChange}/>
                                    <label htmlFor="first_name_register">First Name</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="last_name_register" type="text" className="validate"
                                           onChange={this.handleLastnameChange}/>
                                    <label htmlFor="last_name_register">Last Name</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="username_register" type="text" className="validate"
                                           onChange={this.handleUsernameChange}/>
                                    <label htmlFor="username_register">Username</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password_register" type="password" className="validate"
                                           onChange={this.handlePasswordChange}/>
                                    <label htmlFor="password_register">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="confirm_password_register" type="password" className="validate"
                                           onChange={this.handleConfirmPasswordChange}/>
                                    <label htmlFor="confirm_password_register">Confirm Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="email_register" type="email" className="validate"
                                           onChange={this.handleEmailChange}/>
                                    <label htmlFor="email_register">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="center" style={{boxAlign: "center"}}>

                                    <button className="waves-effect waves-light btn #ffd54f amber darken-1">Register
                                    </button>

                                </div>
                            </div>
                            <div className="row">
                                <div className="center">
                                    <a className="waves-effect waves-light btn social google light red"
                                    >
                                        Register with Google
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
