import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, Alert, Switch } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Images from '../../util/images';
import Styles from './DrawerStyles'
import strings from '../../util/strings'
import * as Storage from '../../APIs/AsyncStore'
import { connect } from 'react-redux'
import NavigationService from '../../NavigationService';
import NetInfo from "@react-native-community/netinfo";
import LinearGradient from 'react-native-linear-gradient';
import types from '../../types';
import Loader from '../../components/Loader';
import Geolocation from '@react-native-community/geolocation';
import { setOffline } from '../../Firestore/UsersCollection'

dp = (size) => EStyleSheet.value(size + 'rem')

let unsubscribe = undefined

class Drawer extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            pro: '',
            isEnabled: '',
            lat: '',
            lng: ''
        }


    }

    componentWillUnmount() {
        unsubscribe()
    }

    componentDidMount() {
        unsubscribe = NetInfo.addEventListener(state => {
            this.checkUser()
        });
    }

    getData() {
        console.log('getData')
        this.props.getCategories()
        this.props.getProfile()
        this.props.getmyEvent()
    }

    getData1() {
        console.log('getData1')
        var pars
        Geolocation.getCurrentPosition(info => {
            console.log(info)
            this.state.lat = info.coords.latitude
            this.state.lng = info.coords.longitude
            pars = {
                lat: info.coords.latitude,
                lng: info.coords.longitude
            }
            this.props.viewallevent(pars)
        });
        this.props.getCategories()
        this.props.getProfile()

        this.props.getmyEvent()
    }

    checkUser = async () => {
        {
            await Storage.getData('token').then((token) => {
                NetInfo.fetch().then(state => {
                    if (this.props.loggedIn && state.isInternetReachable && state.isConnected) {
                        if (this.props.userProfile.user_type == 1) {
                            this.getData()
                        }
                        else {
                            this.getData1()
                        }

                    }
                })
            })
        }
    }

    logout() {
        Alert.alert(
            'Logout',
            'Are you sure you want to Log out?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        setOffline()
                        Storage.removeData('userId')
                        // this.props.logout()
                        NavigationService.navigate('Authloading')
                        this.props.logout()
                    }
                },
            ],
            { cancelable: false },
        );

    }

    navigate(route, params) {

        NavigationService.navigate(route, params)
        NavigationService.closeDrawer()
    }

    renderTitle = (text, icon, route, params, logout) =>
        <TouchableOpacity style={Styles.titles} onPress={() => {
            if (logout)
                this.logout()
            else
                this.navigate(route, params)
        }} >
            <View style={{ width: '12%' }} >
                <Image source={icon} />
            </View>

            <Text style={{ fontSize: dp(14), top: -3, color: '#FFF', width: '88%' }} >{text.toUpperCase()}</Text>
        </TouchableOpacity>


    render() {

        const { first_name, last_name, email, image, user_type, user_status } = this.props.userProfile
        if (user_type == 1) {
            this.state.pro = true
        }
        else {
            this.state.pro = false
        }
        if (user_status == 0) {
            this.state.isEnabled = false
        }
        else {
            this.state.isEnabled = true
        }
        const toggleSwitch = () => {
            var pars
            if (this.state.isEnabled == true) {
                this.setState({ isEnabled: false })
                pars = {
                    user_status: 0,
                    userid: this.props.userProfile.userid
                }
                console.log(pars)
                this.props.updatestatus(pars, this.callback)


            }
            else {
                this.setState({ isEnabled: true })
                pars = {
                    user_status: 1,
                    userid: this.props.userProfile.userid
                }
                console.log(pars)
                this.props.updatestatus(pars, this.callback)

            }
        }
        return (
            <LinearGradient colors={['#0E3648', '#397471', '#63B199']} style={{ flex: 1 }} >
                <View style={{ width: '85%', alignSelf: 'center' }} >
                    {
                        !this.state.pro ?
                            <View style={{ flexDirection: 'row', marginTop: dp(20), justifyContent: 'flex-end' }}>
                                {
                                    this.state.isEnabled ?
                                        <Text style={{ color: '#DDE2FF', marginRight: 12, marginTop: 6 }}>Available</Text>
                                        :
                                        <Text style={{ color: '#DDE2FF', marginRight: 12, marginTop: 6 }}>Unavailable</Text>
                                }


                                <Switch
                                    trackColor={{ false: "#DDE2FF", true: "#DDE2FF" }}
                                    thumbColor={this.state.isEnabled ? "#6D7278" : "#f4f3f4"}
                                    ios_backgroundColor="#6D7278"
                                    onValueChange={toggleSwitch}
                                    value={this.state.isEnabled}
                                // style={{ transform: [{ scaleX: 1.2 }, { scaleY: .5 }] }}
                                />
                            </View> : null
                    }


                    {/* Profile Info Section */}
                    <View style={{ flexDirection: 'row', marginTop: this.state.pro ? dp(25) : dp(1), alignItems: 'center' }} >
                        {/* User Image */}

                        <View>
                            <Image source={this.props.userProfile ? { uri: this.props.userProfile.image != null ? this.props.userProfile.image : '' } : Images.dummyPic} style={{ borderRadius: dp(50), width: dp(60), height: dp(60), marginRight: dp(10) }} />
                            <Image source={Images.yellowBadge} style={{ position: 'absolute', bottom: 0, right: dp(10) }} />
                        </View>
                        {/* User Details  */}
                        <View style={Styles.infoView} >
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: '500', color: '#FFF' }} >{first_name} {last_name}</Text>
                            </View>
                            {/* <View style={{flexDirection:'row'}}>
                            <Text style={{ color: '#FFF', fontSize: dp(13) }} >{email}</Text>
                            </View> */}



                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', marginLeft: '32%', marginTop: dp(-10) }}>
                        <View style={{ borderBottomWidth: 1, borderColor: '#99FFCC', flexDirection: 'row' }}>
                            <Image source={Images.verify} style={{ marginRight: 6, marginTop: 2 }} />
                            <Text style={{ color: '#6ABF0F', fontSize: dp(10), marginBottom: 6 }} >Verified</Text>
                        </View>
                        {
                            this.state.pro ?
                                <Text style={{ color: '#99FFCC', fontSize: dp(10), alignSelf: 'flex-end', fontWeight: '600' }} >PRO</Text>
                                : null
                        }
                    </View>
                    {this.renderTitle('Profile', Images.profile, 'Profile')}
                    {this.state.pro ? null : this.renderTitle('Home', Images.home, 'OrdinaryHome')}
                    {this.state.pro ? this.renderTitle('My Events', Images.myEvent, 'Proevent') : null}
                    {this.state.pro ? null : this.renderTitle('My Events', Images.myEvent, 'OrdinaryEvent')}
                    {this.renderTitle('Awards', Images.award, 'CreateEventView')}
                    {this.state.pro ? null : this.renderTitle('Chat', Images.chat, 'Chat')}
                    {this.renderTitle('Change Password', Images.change, 'GroupChat')}
                    {this.renderTitle('Support', Images.support, 'Chat')}
                    {this.renderTitle('Legal', Images.legal, 'PublicAccepted')}
                    {this.renderTitle('Sign Out', Images.logout, '', '', true)}
                </View>
                <Loader show={this.props.loading} />
            </LinearGradient>
        )


    }
    callback = (err, response) => {
        if (response.data) {
            if (response.data[0].user_status == 0) {
                // this.setState({ isEnabled: false })
            }
            else {
                // this.setState({ isEnabled: true})
            }

        }
        else {
            alert(response.message)
        }

        console.log(this.state.isEnabled)
    }
}

const mapStateToProps = (state) => ({
    userProfile: state.profileReducer.userProfile,
    loggedIn: state.authReducer.loggedIn,
    loading: state.profileReducer.loading
})

mapDispatchToProps = (dispatch) => ({
    getProfile: () => dispatch({
        type: types.GET_PROFILE
    }),
    getCategories: () => dispatch({
        type: types.GET_CATEGORIES
    }),
    getmyEvent: () => dispatch({
        type: types.GET_MYEVENYTS
    }),
    logout: () => dispatch({
        type: types.LOGOUT
    }),
    viewallevent: (pars) => dispatch({
        type: types.ALLEVENT_START,
        param: pars,
    }),
    updatestatus: (pars, cb) => dispatch({
        type: types.UPDATE_STATUS,
        params: pars,
        callback: cb,
    }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)