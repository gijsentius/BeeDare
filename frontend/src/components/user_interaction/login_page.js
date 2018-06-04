import React from 'react';
import Register from "./register";
import Login from "./login";
import '../user_interaction/login-register.css'

export default class LoginPage extends React.Component{

    render(){
        return(
            <div className="row">
                <div className="col m4 s12 offset-m4 center" id="login">
                    <Login />
                </div>
            </div>
        );
    }
}
