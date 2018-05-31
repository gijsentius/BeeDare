import React from 'react';

export default class Register extends React.Component{

    render(){
        return(
        <div className="card">
        <div className="card-content">
        <div className="row">
            <form className="col s12">
                <div className="row">
                  <div className = "title">
                    <h5 className="title">Register</h5>
                  </div>
                    <div className="input-field col s6">
                        <input id="first_name_register" type="text" className="validate"/>
                            <label htmlFor="first_name_register">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="last_name_register" type="text" className="validate"/>
                            <label htmlFor="last_name_register">Last Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password_register" type="password" className="validate"/>
                            <label htmlFor="password_register">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="confirm_password_register" type="password" className="validate"/>
                            <label htmlFor="confirm_password_register">Confirm Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email_register" type="email" className="validate"/>
                            <label htmlFor="email_register">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="center" style={{boxAlign: "center"}}>
                        <a className="waves-effect waves-light btn #ffd54f amber lighten-1"
                        >
                            <span className="text-color">Register</span>
                        </a>
                    </div>
                </div>
                <div className="row">
                    <p className="center">Or register with Google</p>
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
