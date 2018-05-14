import React, {Component} from 'react';
import './App.css';
import logo from './logo.svg';
import Icon from './components/components.js'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <table width="100%">
                    <tbody>
                    <tr>
                        <td align="center"><Icon/></td>
                        <td align="center"><Icon action={() => alert('This value has been changed.')}/></td>
                        <td align="center"><Icon image='https://i.redd.it/g5fz99po32u01.png'
                                                 action={() => alert('THIS ... IS ... SPARTA !!!.')}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
