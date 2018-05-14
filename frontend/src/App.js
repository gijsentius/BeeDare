import React, {Component} from 'react';
import './App.css';
import {Icon, Friends} from './components/components.js'

class App extends Component {
    render() {
        return (
            <div>
                <table width="100%">
                    <tbody>
                    <tr>
                        <td align="center"><Icon online={true}/></td>
                        <td align="center"><Icon action={() => alert('This value has been changed.')}/></td>
                    </tr>
                    </tbody>
                </table>
                <Friends friends={[' Dit is Piet', 'Henk', 'Klaas', 'Kees', 'Tom', 'Nick', 'Henk2', "Piet3"]}/>
            </div>
        );
    }
}

export default App;
