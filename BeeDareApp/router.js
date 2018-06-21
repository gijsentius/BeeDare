import {StackNavigator, SwitchNavigator, TabNavigator} from 'react-navigation';
import LoginForm from "./components/LoginScreen/LoginForm";
import LandingScreen from "./components/LandingScreen/LandingScreen";

export const SignedOut = StackNavigator({
    LoginForm: {
        screen: LoginForm,
        navigationOptions: {
        title: "LoginForm",
        }
    },
});

export const SignedIn = TabNavigator ({
    LandingScreen: {
        screen: LandingScreen,
        navigationOptions: {
            title: "LandingScreen",
        }
    }
});

export const createRootNavigator = (signedIn = false) => {
    return SwitchNavigator (
        {
            SignedIn: {
                screen: LandingScreen
            },
            SignedOut: {
                screen: LoginForm
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn": "SignedOut"
        }
    );
};

