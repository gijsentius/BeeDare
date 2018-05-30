import React from 'react';
import Register from "../user_interaction/register";
import Landinginfo from "./Landinginfo";

class LandingPage extends React.Component{
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col s6 offset-s1" id="landinginfo">
                        <Landinginfo/>
                    </div>
                    <div className="col m3 offset-m8" id="register">
                        <Register />
                    </div>
            </div>
        );
    }
}

export default LandingPage