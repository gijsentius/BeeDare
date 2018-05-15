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
        if (this.props.hits !== undefined){
            openChallenges = this.props.hits;
            console.log(openChallenges);
            // .map is eigenlijk al een forloop. Het zorgt ervoor dat listItems een nieuwe
            // array wordt, maar hij loop dus over movieHits en stopt er vervolgens listItems in.
            // div met de className center wordt gebruikt om de image in het midden te zetten
            listItems = openChallenges.map((item) =>
                <div className="section" key={item.id}><div className="center"><img src={item.url} width="90%" height="100%"/></div></div>);
        }

        return(

            <div className="container">
                <div className="col m4 s1">
                    <div id="openchallenges">
                        {listItems}
                    </div>
                </div>
            </div>
        )
    }
}







