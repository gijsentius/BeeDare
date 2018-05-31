import React from 'react';
import Register from "../user_interaction/register";
import Landinginfo from "./Landinginfo";
import backgroundImage from "../../images/Background.jpg"
import placeHolder from "../../images/placeholder.jpg"
import scrollToComponent from 'react-scroll-to-component';

class LandingPage extends React.Component{
    render(){
        return(
            // Het is belangrijk om alle "grote" divs ID's mee te geven voor de buttons
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

// <div className='main'>
//     <button onClick={() => scrollToComponent(this.Indigo, { offset: 0, align: 'bottom', duration: 500, ease:'inExpo'})}>Go To Indigo</button>
//
// <section className='blue' ref={(section) => { this.Blue = section; }}>Blue</section>
// <section className='indigo' ref={(section) => { this.Indigo = section; }}>Indigo</section>
// </div>