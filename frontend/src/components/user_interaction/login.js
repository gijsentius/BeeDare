import React from 'react';

export default class Login extends React.Component{

    render(){
        return(
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email_login" type="email" className="validate"/>
                            <label htmlFor="email">Email</label>
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
                        <p className="center">Of login met Google</p>
                    </div>
                    <div className="row">
                        <div className="center">
                        <a className="waves-effect waves-light btn social google light red"
                        >
                            Login via Google
                        </a>
                        </div>
                    </div>
                </form>
            </div>
        )

    }
}

