import React from 'react';
import './Challenge.css';
import ChallengeIcon from "./ChallengeIcon";
import {UserContext} from "../UserProvider";


// source code = https://github.com/reactjs/react-modal
// source code = https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe


export default class OpenChallenges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            currentId: "",
            returnAfterDelete: true,
            username: null,
            token: null,
            renderOnce: true,
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event, id) {
        event.preventDefault();

        this.setState({showMenu: true, currentId: id}, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {

        if (this.dropdownMenu !== null && !this.dropdownMenu.contains(event.target)) {
            this.setState({showMenu: false, currentId: ""}, () => {
                document.removeEventListener('click', this.closeMenu);
            });
        }
    }

    deleteDare(id, event) {
        event.preventDefault();
        fetch('http://localhost:5000/dares/delete/' + id + "/" + this.state.username + "/" + this.state.token);

        this.setState({showMenu: false, currentId: ""}, () => {
            document.removeEventListener('click', this.closeMenu);
        });
        this.props.fetch();
    }
    dareIsAchieved(event, id) {
        event.preventDefault();
        fetch('http://localhost:5000/dares/achieved/' + id + "/" + this.state.username + "/" + this.state.token);
        this.setState({showMenu: false, currentId: ""}, () => {
            document.removeEventListener('click', this.closeMenu);
        });
        this.props.fetch();
    }


    render() {

        if (this.state.renderOnce) {
            return (
                <UserContext.Consumer>{
                    (context) => {
                        this.setState({
                            username: context.loggedInUsername,
                            token: context.token
                        });
                        this.setState({renderOnce: false});
                    }
                }
                </UserContext.Consumer>
            )
        }

        let openChallenges;
        let listItems;
        if (this.props.openChallenges !== undefined) {
            openChallenges = this.props.openChallenges;
            // .map is eigenlijk al een forloop. Het zorgt ervoor dat listItems een nieuwe
            // array wordt, maar hij loop dus over openChallenges en stopt er vervolgens listItems in.
            // div met de className center wordt gebruikt om de image in het midden te zetten
            listItems = openChallenges.map((item) =>
                <div className="section" key={item.id}>
                    <div className="center" id='imgCH'>
                        <ChallengeIcon/>
                        {/*Hierboven moet image nog toegevoegd worden als deze klaar is!!!!!*/}
                        <div className="rightnext">
                            {/*Gebruik van arrow functie om event en item.id mee te kunnen geven*/}
                            <a id={item.id} onClick={(e) => this.showMenu(e, item.id)}
                               className="btn-floating btn-small amber darken-1">
                                <i className="material-icons">edit</i></a>
                            {
                                // onderstaande vergelijking is van essentieel belang, zodat er niet meerdere menu's
                                // aangemaakt worden.
                                this.state.showMenu && this.state.currentId === item.id
                                    ? (
                                        <div>
                                            <div id={item.id}
                                                 ref={(element) => {
                                                     this.dropdownMenu = element;
                                                 }}>
                                                <button className="btn-small waves-effect red buttonMargin"
                                                        id={item.id} onClick={(e) => this.deleteDare(item.id, e)}>
                                                    <i className="material-icons">delete</i></button>
                                            </div>
                                            < div id={item.id}
                                                  ref={(element) => {
                                                      this.dropdownMenu = element;
                                                  }}>
                                                <button className="btn-small waves-effect green buttonMargin"
                                                        id={item.id} onClick={(e) => this.dareIsAchieved(e, item.id)}>
                                                    <i className="material-icons">check</i></button>
                                            </div>
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

        return (
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







