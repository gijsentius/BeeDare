// source: https://hackernoon.com/how-to-use-the-new-react-context-api-fce011e7d87
import React from 'react';


export const UserContext = React.createContext();

class UserProvider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedInUsername: 'VyxorAnnelies',
            isAuthenticated: false,
            authenticate: (cb) => {
                this.setState({isAuthenticated: true});
                setTimeout(cb, 100);
                },
            signout: (cb) => {
                this.setState({isAuthenticated: false});
                setTimeout(cb, 100)
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