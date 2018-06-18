// source: https://hackernoon.com/how-to-use-the-new-react-context-api-fce011e7d87
import React from 'react';
import EditProfilePage from "./editInformation/EditProfilePage";


export const UserContext = React.createContext();

class UserProvider extends React.Component {
    state = {
        loggedInUsername: 'hallo ik ben een aap',
        loginState: true,
    };


    render() {
        return <UserContext.Provider value={this.state}>
            {this.props.children}
        </UserContext.Provider>
    }
}

export default UserProvider;