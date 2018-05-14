import React, {Component} from 'react';
import './App.css';
import Friends from "../friends/Friends";

class App extends Component {
    render() {
        return (
            <div>
                <Friends friends={[' Dit is Piet', 'Henk', 'Klaas', 'Kees', 'Tom', 'Nick', 'Henk2', "Piet3", "Klaas", "Gijs", "Annelies"]}/>
            </div>
        );
    }
}

export default App;
