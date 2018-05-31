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
                            <p>We are BeeDare. <br/>
                                We are 5 students from the Hanzehogeschool Groningen
                                who are passionate about living the vegan life.<br/>
                                As real vegans, we love to push our lifestyle and choices to the public.<br/>
                                BeeDare is a social platform that strives to motivate you to live the vegan life.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Landinginfo