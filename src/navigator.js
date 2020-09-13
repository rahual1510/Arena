/* eslint-disable prettier/prettier */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import AuthLoadingScreen from './screens/AuthLoadingScreen/AuthLoadingScreen';

import DrawerComponent from './screens/DrawerComponent/DrawerComponent';

import GetStarted from './screens/GetStarted/GetStarted';
import Login from './screens/Login/Login';
import SignUp from './screens/SignUp/SignUp';
import Forgot from './screens/ForgotPassword/ForgotPassword';
import ResetPassword from './screens/ResetPassword/ResetPassword';
import OtpVerify from './screens/OtpVerify/OtpVerify';


import OrdinaryHome from './screens/Home/OrdinaryHome';
import Profile from './screens/Profile/Profile';
import EditProfile from './screens/EditProfile/EditProfile';
import Support from './screens/Support/Support';
import Legal from './screens/Legal/Legal';
import Info from './screens/Info/Info';
import ChangePassword from './screens/ChangePassword/ChangePassword';
import Proevent from './screens/Proevent/Proevent';
import EventDetail from './screens/EventDetail/EventDetail';
import CreateEvent from './screens/CreateEvent/CreateEvent';
import CreateEventView from './screens/CreateEventView/CreateEventView';
import FindEvent from './screens/FindEvent/FindEvent';
import ViewEvents from './screens/ViewEvents/ViewEvents';
import Profileinfo from './screens/Profileinfo/Profileinfo';
import OrdinaryEvent from './screens/OrdinaryEvent/Ordinaryevent';
import Chat from './screens/Chat/Chat';
import PublicAccepted from './screens/PublicAccepted/PublicAccepted';
import Participant from './screens/Participant/Participant';
import GroupChat from './screens/GroupChat/GroupChat';
import Conversation from './screens/Conversation/Conversation';
import Mapview from './screens/Mapview/Mapview';
import Filter from './screens/Filter/Filter';

const authStack = createStackNavigator({
    GetStarted: GetStarted,
    Login: Login,
    SignUp: SignUp,
    Forgot: Forgot,
    ResetPassword: ResetPassword,
    OtpVerify: OtpVerify,
    Info: Info,
},
    {
        headerMode: 'none',
    }
);

const ProfileStack = createStackNavigator({
    Profile: Profile,
    EditProfile: EditProfile,
},
    {
        headerMode: 'none',
    }
);

const appStack = createStackNavigator({
    OrdinaryHome: OrdinaryHome,
    Profileinfo: Profileinfo,
    // EditProfile: EditProfile,
    EventDetail: EventDetail,
    Support: Support,
    Legal: Legal,
    Info: Info,
    ChangePassword: ChangePassword,
    FindEvent: FindEvent,
    ViewEvents: ViewEvents,
    OrdinaryEvent: OrdinaryEvent,
    CreateEvent: CreateEvent,
    CreateEventView: CreateEventView,
    PublicAccepted: PublicAccepted,
    Participant: Participant,
    Chat: Chat,
    GroupChat: GroupChat,
    Conversation: Conversation,
    Mapview: Mapview,
    Filter: Filter,
},

    {
        headerMode: 'none',
    }
);

const appStack1 = createStackNavigator({
    Proevent: Proevent,
    Profileinfo: Profileinfo,
    // EditProfile: EditProfile,
    EventDetail: EventDetail,
    // Profile: Profile,
    Support: Support,
    Legal: Legal,
    Info: Info,
    ChangePassword: ChangePassword,
    ViewEvents: ViewEvents,
    CreateEvent: CreateEvent,
    CreateEventView: CreateEventView,
    PublicAccepted: PublicAccepted,
    Participant: Participant,
    Chat: Chat,
    GroupChat: GroupChat,
    Conversation: Conversation,
    Mapview: Mapview,
},

    {
        headerMode: 'none',
    }
);


const Drawer = createDrawerNavigator({
    Home1: appStack,
    ProfileStack: ProfileStack,

},
    {
        contentComponent: (props) => (<DrawerComponent />),
    }
);

const Drawer1 = createDrawerNavigator({
    Home2: appStack1,
    ProfileStack: ProfileStack,

},
    {
        contentComponent: (props) => (<DrawerComponent />),
    }
);


const Switch = createSwitchNavigator({
    Authloading: AuthLoadingScreen,
    Auth: authStack,
    App: Drawer,
    App1: Drawer1,
},
    {
        headerMode: 'none',
        navigationOptions: () => ({
            headerVisible: false,
        }),
    }
);


const App = createAppContainer(
    Switch
);

export default App;
