import React from 'react';
import Register from "../user_interaction/register";
import './LandingPage.css';
import backgroundImage from "../../images/Background.jpg"
import beedareLaptop from "../../images/beedare_on_laptop.png"
import scrollToComponent from 'react-scroll-to-component';
import CardRow from "./CardRow";

class LandingPage extends React.Component{
    render(){
        return(
            <div className="main z-depth-1">

                <div className="pageSection z-depth-1" ref={(section) => { this.YellowBG = section; }} style={{backgroundColor: "#fff8e1"}}>
                    <h4 id="textPositionLP" style={{color: "#255957", fontWeight:"bold"}}> Dare yourself to Bee <br/> more green! </h4>
                    <img className="floatingLaptop" src={beedareLaptop}
                         style={{maxWidth: "50vw", maxHeight: "auto"}}/>
                    {/*Blijkbaar is het dus nodig om zo een afbeelding te resizen, in de css werkt niet lekker*/}
                    <div className="center-align">
                        <button
                                onClick={() => scrollToComponent(this.White, { offset: 0, align: 'top', duration: 1500})}
                                className="center-bottom btn-floating btn-medium waves-effect amber accent-4"><i
                            className="material-icons">keyboard_arrow_down</i></button>
                    </div>
                </div>

                <div className="pageSection z-depth-1" ref={(section) => { this.White = section; }}>
                    <blockquote id="textPositionQuote"><h4 style={{fontStyle:"italic", color: "#512da8"}}>
                        "Every drop in the ocean counts"<br/>- Yoko Ono </h4></blockquote>
                    <div className="center-align">
                        <button
                            onClick={() => scrollToComponent(this.PictureBG, { offset: 0, align: 'top', duration: 1500})}
                            className="center-bottom btn-floating btn-medium waves-effect amber accent-4"><i
                            className="material-icons">keyboard_arrow_down</i></button>
                    </div>
                </div>

                <div className="pageSection z-depth-1" ref={(section) => { this.PictureBG = section; }}
                     style={{backgroundImage: `url(${backgroundImage})`}}>
                    <CardRow/>
                    <div className="center-align">
                        <button
                            onClick={() => scrollToComponent(this.Blue, { offset: 0, align: 'top', duration: 1500})}
                            className="center-bottom btn-floating btn-medium waves-effect amber accent-4"><i
                            className="material-icons">keyboard_arrow_down</i></button>
                    </div>
                </div>

                <div className="pageSection z-depth-1" ref={(section) => { this.Blue = section; }} style={{backgroundColor: "#255957"}}>
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