import React from 'react';
import Register from "../user_interaction/register";

class LandingPage extends React.Component{
    render(){
        return(
            <div>
                <div className="row"/>
                <div className="row">
                    <div className="col s6">
                        <h1 className="text">Welcome on the landing page!</h1>
                    </div>
                    <div className="col m3 s12 offset-m3" id="register">
                        <Register />
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage