import React from 'react';
import './Challenge.css';
import ChallengeIcon from "./ChallengeIcon";


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// source code = https://github.com/reactjs/react-modal


export default class CompletedChallenges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        if (this.props.completedChallenges === "undefined"){
            return <div/>
        }

        // source onderstaande functie: https://stackoverflow.com/questions/42391499/
        // react-render-new-row-every-4th-column
        // het zorgt er voor dat er elke vierde element een nieuwe rij aangemaakt wordt.
        let listItems;

        listItems = this.props.completedChallenges.map((challenge) => <div className="completedMH dare-col">
            <ChallengeIcon image="https://placeimg.com/400/400/nature"/>
            {/*challenge.image*/}
            <p className="center-align">{challenge.value + ' points'}</p>
        </div> );



        return (
            <div>
                <div className="card">
                    <div className="card-content overflow-scroll-box">
                        <div className="dare-cols">
                            {listItems}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}







