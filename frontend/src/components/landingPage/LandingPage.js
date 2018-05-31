import React from 'react';
import Register from "../user_interaction/register";
import Landinginfo from "./Landinginfo";

class LandingPage extends React.Component{
    render(){
        return(
            <div className="row pageSection">
                <div className="col s12"><span
                    className="flow-text">I am always full-width (col s12)</span></div>
                {/*<div className="col m3 offset-m4" id="register">*/}
                    {/*<Register />*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default LandingPage