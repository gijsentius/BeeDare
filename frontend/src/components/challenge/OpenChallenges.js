import React from 'react';
import './Challenge.css';
import ChallengeIcon from "./ChallengeIcon";


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// source code = https://github.com/reactjs/react-modal


export default class OpenChallenges extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }


    // componentDidMount(){
    //     // dit is de event listener voor dropdown menu. Source: https://materializecss.com/dropdown.html
    //     $('.dropdown-button').dropdown();
    // }

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
                    <div className="center" id='imgCH'>
                        <ChallengeIcon image={item.url}/>
                        <div className="rightnext">
                            <a onClick={'#'} className="btn-floating btn-small amber darken-1">
                                <i className="material-icons">edit</i></a>
                        </div>
                </div>
                </div>);
        }

        return(
            <div>
                    <div className="card">
                    <div className="card-content">
                        {listItems}
                    </div>
                    </div>

                {/*<a className='dropdown-button' href='#' data-activates='dropdown1'>Drop Me!</a>*/}

                {/*<ul id="dropdown" className="dropdown-content">*/}
                    {/*<li><a href="#">Inbox<span className="badge">12</span></a></li>*/}
                    {/*<li><a href="#!">Unread<span className="new badge">4</span></a></li>*/}
                    {/*<li><a href="#">Sent</a></li>*/}
                    {/*<li className="divider"></li>*/}
                    {/*<li><a href="#">Outbox<span className="badge">14</span></a></li>*/}
                {/*</ul>*/}


            </div>
        )
    }
}







