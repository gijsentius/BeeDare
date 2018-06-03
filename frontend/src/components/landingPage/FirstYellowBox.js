import React from "react";
import beedareLaptop from "../../images/beedare_on_laptop.png"

class FirstYellowBox extends React.Component{
    render(){
        return(
            <div>
                <h4 id="textPositionLP" style={{color: "#255957", fontWeight:"bold"}}> Dare yourself to Bee <br/> more green! </h4>
                <img className="floatingLaptop" src={beedareLaptop}
            style={{maxWidth: "50vw", maxHeight: "auto"}}/>
            {/*Blijkbaar is het dus nodig om zo een afbeelding te resizen, in de css werkt niet lekker*/}
            </div>

        );
    }
}

export default FirstYellowBox