import React from 'react';
import Register from "../user_interaction/register";
import Landinginfo from "./Landinginfo";

class LandingPage extends React.Component{
    render(){
        return(
            <div>
                <div className="row landingpage_background">
                    <div className="col m4 offset-m1" id="landinginfo">
                        <Landinginfo/>
                    </div>
                    <div className="col m3 offset-m4" id="register">
                        <Register />
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage