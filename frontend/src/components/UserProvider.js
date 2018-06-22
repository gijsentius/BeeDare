// source: https://hackernoon.com/how-to-use-the-new-react-context-api-fce011e7d87
import React from 'react';


export const UserContext = React.createContext();

class UserProvider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedInUsername: '',
            isAuthenticated: false,
            toke: null,

            authenticate: (data) => {
                console.log(data);
                fetch('http://localhost:5000/auth/login', {
                    method: 'POST',
                    body: data,
                })
                    .then(response => response.json())
                    .then(data => this.setState({isAuthenticated: data['login'],
                        loggedInUsername: data['username'], token: data['token']}))
                    .catch(error => console.log(error));
            },

            signout: () => {

                fetch('http://localhost:5000/auth/logout/' +this.state.loggedInUsername + "/" + this.state.token)
                    .then(response => response.json())
                    .then(data => this.setState({isAuthenticated: data['login'],
                        loggedInUsername: data['username']}))
                    .catch(error => console.log(error));
            },
        };
    }


    render() {
        return <UserContext.Provider value={this.state}>
            {this.props.children}
        </UserContext.Provider>
    }
}

export default UserProvider;