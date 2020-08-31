import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/headerLogo'
import EStyleSheet from 'react-native-extended-stylesheet';
import Geolocation from '@react-native-community/geolocation';
import Images from '../../util/images';
import Styles from './MapviewStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
dp = (size) => EStyleSheet.value(size + 'rem')

export class Mapview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: '',
            lng: ''
        }
        Geolocation.getCurrentPosition(info => {
            console.log(info)
            this.state.lat = info.coords.latitude
            this.state.lng = info.coords.longitude
        });
        console.log(this.props.allEvents)
    }
    render() {
        return (
            <Header title='MAP VIEW' noLogo={true} filter={true} onPressFilter={() => ''} back onBackPress={() => this.props.navigation.goBack()} search placeholderText={'Search'} fnc={(sval) => this.filter(sval)}  >
                <View style={Styles.maincontainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={{
                            height: '100%',
                            width: '100%',
                            borderRadius: 20
                        }} 
                        region={{
                            latitude: 28.7040592,
                            longitude: 77.10249019999999,
                            latitudeDelta: 0.5,
                            longitudeDelta: 0.5,
                        }}
                    >

                                        <Marker
                                        coordinate={{latitude: Number() , longitude: Number()}}
                                        image={Images.locationicon}
                                        // tracksViewChanges={trackChanges}
                                        // onLayout={(event)=>{
                                        //     const {x, y, width, height} = event.nativeEvent.layout;
                                        //     if(height>0) {
                                        //         trackChanges=false
                                        //     }
                                        // }}
                                        // onPress={()=>this.setState({markerSelected:index})}
                                    >
                                    </Marker>
                                       

                    </MapView>
                </View>
            </Header>
        )
    }

}

const mapStateToProps = (state) => ({
    allEvents: state.resourcesReducer.allEvents
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Mapview)
