import React from 'react';
import placeHolder from "../../images/placeholder.jpg"

class CardRow extends React.Component{
    render(){
        return(
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

        );
    }
}

export default CardRow