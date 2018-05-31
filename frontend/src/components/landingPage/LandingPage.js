import React from 'react';
import Register from "../user_interaction/register";
import Landinginfo from "./Landinginfo";
import backgroundImage from "../../images/Background.jpg"
import placeHolder from "../../images/placeholder.jpg"
import scrollToComponent from 'react-scroll-to-component';
import CardRow from "./CardRow";

class LandingPage extends React.Component{
    render(){
        return(
            <div className="main">

                <div className="pageSection" ref={(section) => { this.YellowBG = section; }} style={{backgroundColor: "#fff8e1"}}>
                    <div className="center-align">
                        <button
                                onClick={() => scrollToComponent(this.White, { offset: 0, align: 'top', duration: 1500})}
                                className="center-bottom btn-floating btn-medium waves-effect amber accent-4"><i
                            className="material-icons">keyboard_arrow_down</i></button>
                    </div>
                </div>

                <div className="pageSection" ref={(section) => { this.White = section; }}>
                    <div className="center-align">
                        <button
                            onClick={() => scrollToComponent(this.PictureBG, { offset: 0, align: 'top', duration: 1500})}
                            className="center-bottom btn-floating btn-medium waves-effect amber accent-4"><i
                            className="material-icons">keyboard_arrow_down</i></button>
                    </div>
                </div>

                <div className="pageSection" ref={(section) => { this.PictureBG = section; }}
                     style={{backgroundImage: `url(${backgroundImage})`}}>
                    <CardRow/>
                    <div className="center-align">
                        <button
                            onClick={() => scrollToComponent(this.Blue, { offset: 0, align: 'top', duration: 1500})}
                            className="center-bottom btn-floating btn-medium waves-effect amber accent-4"><i
                            className="material-icons">keyboard_arrow_down</i></button>
                    </div>
                </div>

                <div className="pageSection" ref={(section) => { this.Blue = section; }} style={{backgroundColor: "#255957"}}>
                    <div className="center-align">
                        <button
                            onClick={() => scrollToComponent(this.Register, { offset: 0, align: 'top', duration: 1500})}
                            className="center-bottom waves-effect amber accent-4 btn">Register</button>
                    </div>
                </div>

                <div className="col m1 floatingRegister" ref={(section) => { this.Register = section; }}>
                    <Register />
                </div>

            </div>
        );
    }
}

export default LandingPage