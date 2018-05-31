import React from 'react';
import Register from "../user_interaction/register";
import Landinginfo from "./Landinginfo";
import backgroundImage from "../../images/Background.jpg"
import placeHolder from "../../images/placeholder.jpg"

class LandingPage extends React.Component{
    render(){
        return(
            <div className="marginRemover">
                <div className="pageSection" style={{backgroundColor: "#fff8e1"}}>
                </div>
                <div className="pageSection" >

                </div>
                <div className="pageSection" style={{backgroundImage: `url(${backgroundImage})`}} >
                    {/*style={{backgroundColor: "#e3f2fd"}}*/}
                    <div className="row centerContent">

                        <div className="col s4">
                            <div className="card">
                            <div className="card-content">
                                <div className="card-image">
                                    <img src={placeHolder}/>
                                        <span className="card-title">Card Title</span>
                                </div>
                                <p>I am a very simple card. I am good at containing small bits of information.
                                    I am convenient because I require little markup to use effectively.</p>
                            </div>
                            </div>
                        </div>
                        <div className="col s4">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-image">
                                        <img src={placeHolder}/>
                                        <span className="card-title">Card Title</span>
                                    </div>
                                    <p>I am a very simple card. I am good at containing small bits of information.
                                        I am convenient because I require little markup to use effectively.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col s4">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-image">
                                        <img src={placeHolder}/>
                                        <span className="card-title">Card Title</span>
                                    </div>
                                    <p>I am a very simple card. I am good at containing small bits of information.
                                        I am convenient because I require little markup to use effectively.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="pageSection" style={{backgroundColor: "#40F7FF"}}>

                </div>
                <div className="col m1 floatingRegister">
                    <Register />
                </div>

            </div>
        );
    }
}

export default LandingPage