// import {StackNavigator, SwitchNavigator, TabNavigator} from 'react-navigation';
// import Login from "./components/LoginScreen/Login";
// import LandingScreen from "./components/LandingScreen/LandingScreen";
//
// export const Navigator = StackNavigator({
//     LoginForm: {
//         screen: LoginForm,
//         navigationOptions: {
//             title: "LoginForm",
//         }
//     },
// });
//
// export const SignedIn = TabNavigator ({
//     LandingScreen: {
//         screen: LandingScreen,
//         navigationOptions: {
//             title: "LandingScreen",
//         }
//     }
// });
//
// export const createRootNavigator = (signedIn = false) => {
//     return SwitchNavigator (
//         {
//             SignedIn: {
//                 screen: LandingScreen
//             },
//             SignedOut: {
//                 screen: LoginForm
//             }
//         },
//         {
//             initialRouteName: signedIn ? "SignedIn": "SignedOut"
//         }
//     );
// };
//
