import React from "react";
import './LandingPage.css';


class Landinginfo extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="col s12 m10">
                    <div className="card white">
                        <div className="card-content white text">
                            <span className="card-title">What is BeeDare?</span>
                            <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Landinginfo