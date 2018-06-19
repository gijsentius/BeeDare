import React from "react";
import beedareLaptop from "../../images/beedare_on_laptop.png"
import Fade from 'react-reveal/Fade';

class FirstYellowBox extends React.Component{
    render(){
        return(
            <div>
                <Fade top>
                    <h4 id="textPositionLP" style={{color: "#255957", fontWeight:"bold"}}> Dare yourself to Bee <br/>green! </h4>
                </Fade>
                <Fade bottom>
                    <img className="floatingLaptop" src={beedareLaptop}
                        style={{maxWidth: "50vw", maxHeight: "auto"}}/>
                </Fade>
            {/*Blijkbaar is het dus nodig om zo een afbeelding te resizen, in de css werkt niet lekker*/}
            </div>

        );
    }
}

export default FirstYellowBox