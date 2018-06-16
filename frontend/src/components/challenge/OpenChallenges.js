import React from 'react';
import './Challenge.css';
import ChallengeIcon from "./ChallengeIcon";


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// source code = https://github.com/reactjs/react-modal
// source code = https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe


export default class OpenChallenges extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showMenu: false,
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {

        if (!this.dropdownMenu.contains(event.target)) {

            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });

        }
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
                    <div className="center" id='imgCH'>
                        <ChallengeIcon image={item.image}/>

                        <div className="rightnext">
                            <a onClick={this.showMenu} className="btn-floating btn-small amber darken-1">
                                <i className="material-icons">edit</i></a>
                            {
                                this.state.showMenu
                                    ? (
                                        <div id={item.id}
                                             ref={(element) => {
                                            this.dropdownMenu = element;
                                        }}>
                                            <button onClick={()=>alert("HOI!!")}> Delete Dare </button>
                                        </div>
                                    )
                                    : (
                                        null
                                    )
                            }

                        </div>
                </div>
                </div>);
        }

        return(
            <div>
                    <div className="card">
                    <div className="card-content overflow-scroll-box">
                        {listItems}
                    </div>
                    </div>

            </div>
        )
    }
}







