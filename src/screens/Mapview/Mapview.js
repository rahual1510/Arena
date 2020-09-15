/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/headerLogo';
import EStyleSheet from 'react-native-extended-stylesheet';
import Geolocation from '@react-native-community/geolocation';
import Images from '../../util/images';
import Styles from './MapviewStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapEventMarker from '../../components/MapEventMarker';

const dp = (size) => EStyleSheet.value(size + 'rem');

export class Mapview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: '',
            lng: '',
            atheletList: [],
            eventList: [],
        };

    }
    componentDidMount() {
        Geolocation.getCurrentPosition(info => {
            this.setState({ lat: info.coords.latitude, lng: info.coords.longitude });
        });
        if (this.props.navigation.state.params && this.props.navigation.state.params.events) {
            this.setState({ eventList: this.props.navigation.state.params.events });
        }

        if (this.props.navigation.state.params && this.props.navigation.state.params.atheletList) {
            this.setState({ atheletList: this.props.navigation.state.params.atheletList });
        }
    }
    render() {
        return (
            <Header title="MAP VIEW" noLogo={true} filter={true} onPressFilter={() => ''} back onBackPress={() => this.props.navigation.goBack()} search placeholderText={'Search'} fnc={(sval) => this.filter(sval)}  >
                <View style={Styles.maincontainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={{
                            height: '100%',
                            width: '100%',
                            borderRadius: 20,
                        }}
                        initialRegion={{
                            latitude: this.state.lat != '' ? this.state.lat : 28.7040592,
                            longitude: this.state.lng != '' ? this.state.lng : 77.10249019999999,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                        region={{
                            latitude: this.state.lat != '' ? this.state.lat : 28.7040592,
                            longitude: this.state.lng != '' ? this.state.lng : 77.10249019999999,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                    >

                        <Marker
                            coordinate={{
                                latitude: this.state.lat != '' ? this.state.lat : 28.7040592,
                                longitude: this.state.lng != '' ? this.state.lng : 77.10249019999999,
                            }}
                            image={Images.locationicon}
                        />


                        {this.state.eventList.map((event, index) => {
                            return <Marker
                                coordinate={{ latitude: JSON.parse(event.lat), longitude: JSON.parse(event.lng) }}
                            >
                                <Image style={{ backgroundColor: event.user_type == 1 ? '#F18B00' : '#0D3447', width: 20, height: 20, borderRadius: 10 }} />
                                <MapView.Callout tooltip onPress={() => this.props.navigation.navigate('EventDetail', {
                                    evendetail: event,
                                    interest: 'interest',
                                })}>
                                    <MapEventMarker sportdata={event} />
                                </MapView.Callout>

                            </Marker>;
                        })}


                    </MapView>
                </View>
            </Header>
        );
    }

}

const mapStateToProps = (state) => ({
    allEvents: state.resourcesReducer.allEvents,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Mapview);
