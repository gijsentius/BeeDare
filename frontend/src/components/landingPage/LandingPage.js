import React from 'react';
import Register from "../user_interaction/register";
import './LandingPage.css';
import backgroundImage from "../../images/Background.jpg"
import scrollToComponent from 'react-scroll-to-component';
import CardRow from "./CardRow";
import FirstYellowBox from "./FirstYellowBox";
import SecondWhiteBox from "./SecondWhiteBox";
import MeetTeamBox from "./MeetTeamBox";
import ArrowedButton from "./ArrowedButton";
import Fade from 'react-reveal/Fade';

class LandingPage extends React.Component{

    render(){
        return(
            <div className="main z-depth-1">

                <div className="pageSection z-depth-1" ref={(section) => { this.YellowBG = section; }} style={{backgroundColor: "#fff8e1"}}>
                    <FirstYellowBox/>
                    <ArrowedButton onClick={() => scrollToComponent(this.White, { offset: 0, align: 'top', duration: 1500})} />
                </div>

                <div className="pageSection z-depth-1" ref={(section) => { this.White = section; }}>
                    <SecondWhiteBox/>
                    <ArrowedButton onClick={() => scrollToComponent(this.PictureBG, { offset: 0, align: 'top', duration: 1500})} />
                </div>

                <div className="pageSection z-depth-1" ref={(section) => { this.PictureBG = section; }}
                     style={{backgroundImage: `url(${backgroundImage})`}}>
                    <CardRow/>
                    <ArrowedButton
                        onClick={() => scrollToComponent(this.Blue, { offset: 0, align: 'top', duration: 1500})} />
                </div>

                <div className="pageSection z-depth-1" ref={(section) => { this.Blue = section; }} style={{backgroundColor: "#255957"}}>
                    <div className="center-align">
                        <MeetTeamBox/>
                        <button
                            onClick={() => scrollToComponent(this.Register, { offset: 0, align: 'top', duration: 1500})}
                            className="center-bottom waves-effect amber accent-4 btn">Register</button>
                    </div>
                </div>

                <div className="col m1 floatingRegister" ref={(section) => { this.Register = section; }}>
                    <Fade bottom>
                        <Register />
                    </Fade>
                </div>

            </div>
        );
    }
}

export default LandingPage