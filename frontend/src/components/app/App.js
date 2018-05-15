import React, {Component} from 'react';
import './App.css';
import Friends from "../friends/Friends";

class App extends Component {
    render() {
        return (
            <div>
                <Friends friends={["Piet", "Klaas", "Gijs"]}/>
            </div>
        );
    }
}

export default App;
