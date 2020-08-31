import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import strings from '../../util/strings';
import Styles from './HomeStyle';
import Images from '../../util/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import Loader from '../../components/Loader';
import types from '../../types';
export class OrdinaryHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lat: '',
            lng: ''
        }

    }
    componentDidMount() {
        Geolocation.getCurrentPosition(info => {
            console.log(info)
            this.state.lat = info.coords.latitude
            this.state.lng = info.coords.longitude
        });
        console.log(this.props.allEvents)
    }

    render() {
        return (
            <Header title={'HOME'} search>
                <View style={Styles.maincontainer}>
                    <View style={Styles.container}>

                        <Text style={Styles.heading}>{strings.explore}</Text>

                        <View style={Styles.picsView}>
                            <View style={Styles.innerPicView}>

                                <TouchableOpacity onPress={() => {
                                    if (this.state.lat && this.state.lng) {
                                        var pars = {
                                            lat: this.state.lat,
                                            lng: this.state.lng,
                                            userid: this.props.userProfile.userid
                                        }
                                    }
                                    if (pars.lat) {
                                        this.props.viewathelete(pars)
                                    }
                                    else{
                                        Geolocation.getCurrentPosition(info => {
                                            console.log(info)
                                            this.state.lat = info.coords.latitude
                                            this.state.lng = info.coords.longitude
                                        });
                                    }
                                }
                                } >
                                    <Image source={Images.tile1} />
                                </TouchableOpacity>

                                <Text style={Styles.textView} onPress={() => {
                                    if (this.state.lat && this.state.lng) {
                                        var pars = {
                                            lat: this.state.lat,
                                            lng: this.state.lng,
                                            userid: this.props.userProfile.userid
                                        }
                                        console.log("params for athelte>>",pars)
                                    }
                                    if (pars.lat) {
                                        this.props.viewathelete(pars)
                                    }
                                }
                                }>{strings.find} </Text>
                            </View>
                            <View style={Styles.innerPicView}>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('ViewEvents')
                                }
                                } >
                                    <Image source={Images.tile2} />
                                </TouchableOpacity>
                                <Text style={Styles.textView} onPress={() => {
                                    this.props.navigation.navigate('ViewEvents')
                                }
                                }>{strings.view} </Text>
                            </View>
                            <View style={Styles.innerPicView}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateEvent')} >
                                    <Image source={Images.tile3} />
                                </TouchableOpacity>
                                <Text style={Styles.textView} onPress={() => this.props.navigation.navigate('CreateEvent')}>{strings.create}  </Text>
                            </View>

                        </View>

                        <View style={Styles.lineView}></View>
                        <View style={{flexDirection:'row',width:'98%', padding : dp(5),justifyContent:'space-between'}}>
                        <Text style={Styles.boldTheme}>MY FAVORITE SPORTS</Text>
                        {
                            this.props.userProfile.sports?
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('EditProfile',{
                                  page : true
                                })
                              }}
                              >
                              <Image style={{ marginTop: dp(10) }} source={Images.edit} /> 
                              </TouchableOpacity>: null
                        }
                     
                        </View>
                        {
                            this.props.userProfile.sports ?
                                this.props.userProfile.sports.length ?
                                    this.props.userProfile.sports.map((item, index) =>
                                        <View key={`sport${index}`} style={{
                                            width: '95%', borderWidth: 1, borderRadius: 5, marginBottom: dp(20), height: '14%',
                                            borderColor: index == 0 ? '#B8FCDA' : index == 1 ? '#ACF9E8' : index == 2 ? '#BAE4F8' : index == 3 ? '#DBCEFD' : index == 4 ? '#aaa2bd' : null,
                                            backgroundColor: index == 0 ? '#B8FCDA' : index == 1 ? '#ACF9E8' : index == 2 ? '#BAE4F8' : index == 3 ? '#DBCEFD' : index == 4 ? '#aaa2bd' : null,
                                            justifyContent: 'center'
                                        }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row', margin: dp(10) }}>
                                                    <Image style={{ width: dp(22), height: dp(22), resizeMode: 'contain', marginEnd: dp(15), borderRadius: dp(22), backgroundColor: 'rgba(153,255,204,0.31)' }} source={item.icon ? { uri: item.icon } : null} />
                                                    <Text style={Styles.tileView}>
                                                        {item.name}
                                                    </Text>

                                                </View>

                                                <TouchableOpacity onPress={() => {
                                                    let values = []
                                                    if (this.props.allEvents.length > 0) {
                                                        for (let i in this.props.allEvents) {
                                                            if (this.props.allEvents[i].sports[0].name == item.name) {
                                                                values.push(this.props.allEvents[i])
                                                            }
                                                        }
                                                    }
                                                    this.props.navigation.navigate('ViewEvents', {
                                                        events: values
                                                    })
                                                }} >
                                                    <Image source={Images.rightArrow} />
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    )
                                    :
                                    <View style={Styles.emptyText}>
                                         <Text style={Styles.emptyTextStyle}> Complete Your Profile</Text>
                                    <Text onPress={() => this.props.navigation.navigate('EditProfile',{
                                        page : true
                                    })} style={Styles.emptyTextStyle1}> Click To Add Your Sports</Text>
                                    </View>
                                :
                                <View style={Styles.emptyText}>
                                    <Text style={Styles.emptyTextStyle}> Complete Your Profile</Text>
                                    <Text onPress={() => this.props.navigation.navigate('EditProfile',{
                                        page : true
                                    })} style={Styles.emptyTextStyle1}> Click To Add Your Sports</Text>
                                </View>

                        }



                    </View>

                </View>

                {/* <Loader show={this.props.loading} /> */}
                {/* <Loader show={this.props.loading1} /> */}
            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
    userProfile: state.profileReducer.userProfile,
    loading1: state.profileReducer.loading,
    loading: state.resourcesReducer.loading,
    allEvents: state.resourcesReducer.allEvents
})

const mapDispatchToProps = (dispatch) => ({
    viewathelete: (pars) => dispatch({
        type: types.FINDATHLETE_START,
        params: pars
    }),
    viewallevent: () => dispatch({
         type: types.ALLEVENT_START,
     })
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdinaryHome)
