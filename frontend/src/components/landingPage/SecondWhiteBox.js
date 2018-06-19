import React from "react";
import Fade from 'react-reveal/Fade';

class SecondWhiteBox extends React.Component{
    render(){
        return(
            <div>
                <Fade top>
                <blockquote id="textPositionQuote"><h4 style={{fontStyle:"italic", color: "#512da8"}}>
                    "Every drop in the ocean counts"<br/>- Yoko Ono </h4></blockquote>
                </Fade>
            </div>

        );
    }
}

export default SecondWhiteBox