import React from 'react';
import './Challenge.css';
import ChallengeIcon from "./ChallengeIcon";


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// source code = https://github.com/reactjs/react-modal


export default class CompletedChallenges extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){

        // source onderstaande functie: https://stackoverflow.com/questions/42391499/
        // react-render-new-row-every-4th-column
        // het zorgt er voor dat er elke vierde element een nieuwe rij aangemaakt wordt.
        function createRows(props) {
            let listItems = [];
            props.completedChallenges.forEach((challenge, i) =>{
                if((i+1) % 4 == 0){
                    listItems.push(
                        <div className="row" >
                            <div className="col m3">
                                <ChallengeIcon image={challenge.image}/>
                                <p className="center-align">{challenge.value + ' points'}</p>
                            </div>
                        </div>
                    )
                }else{
                    listItems.push(<div className="col m3">
                        <ChallengeIcon image={challenge.image}/>
                        <p className="center-align">{challenge.value + ' points'}</p>
                    </div>);
                }
            });
            return (
                <div>
                    {listItems}
                </div>
            );
        }



        return(
            <div>
                <div className="card">
                <div className="card-content overflow-scroll-box">
                    <div className="section">
                    {createRows(this.props)}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}







