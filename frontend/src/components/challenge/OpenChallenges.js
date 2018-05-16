import React from 'react';
import './Challenge.css'
import ChallengeBig from "./ChallengeBig";

export default class OpenChallenges extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        let openChallenges;
        let listItems;
        if (this.props.openChallenges !== undefined){
            openChallenges = this.props.openChallenges;
            // .map is eigenlijk al een forloop. Het zorgt ervoor dat listItems een nieuwe
            // array wordt, maar hij loop dus over movieHits en stopt er vervolgens listItems in.
            // div met de className center wordt gebruikt om de image in het midden te zetten
            listItems = openChallenges.map((item) =>
                <div className="section" key={item.id}>
                    <div className="center">
                        <img id='imgCH' src={item.url}/>
                        <form action='#'>
                            <label>
                                <h6>Achieved? {item.title}</h6>
                                <input type="checkbox" />
                                <span>{item.id}</span>
                            </label>
                        </form>
                </div></div>);
        }

        return(

            <div className="container">
                <div className="col m4 s1">
                    <div id="openchallenges">
                        <div className="card">
                            <div className="card-image">
                        {listItems}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}







