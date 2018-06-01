import React from 'react';
import Register from "./register";
import Login from "./login";
import '../user_interaction/login-register.css'

export default class LoginRegisterPage extends React.Component{

    render(){
        return(
                <div className="col m6 s12 offset-m3" id="register">
                    <Register />
                </div>
        );
    }
}
