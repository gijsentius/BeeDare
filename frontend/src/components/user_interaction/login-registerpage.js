import React from 'react';
import Register from "./register";
import Login from "./login";
import '../user_interaction/login-register.css'

export default class LoginRegisterPage extends React.Component{

    render(){
        return(
            <div className="container">
            <div className="center">
            <div className="row">
                <div className="col m5 s12" id="login">
                    <Login />
                </div>

                <div className="col m5 s12 offset-m1" id="register">
                    <Register />
                </div>
                </div>
            </div>
            </div>
        );
    }
}
