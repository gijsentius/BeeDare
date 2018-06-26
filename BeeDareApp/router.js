import {StackNavigator, SwitchNavigator, TabNavigator} from 'react-navigation';
import Login from "./components/LoginScreen/Login";
import LandingScreen from "./components/LandingScreen/LandingScreen";

export const Navigator = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: "Login",
        }
    },
    LandingScreen: {
        screen: LandingScreen,
        navigationOptions: {
            title: "LandingScreen",
        }
    }
});


