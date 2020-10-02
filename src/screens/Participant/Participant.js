/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ParticipantsHeader from '../../components/ParticipantsHeader';
import Styles from './ParticipantStyles';
import strings from '../../util/strings';
import Images from '../../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button';
import WebApi from '../../WebApi/index';
import Categry from './Categry';
import Geolocation from '@react-native-community/geolocation';
import Sports from '../../components/Sports';
import { getDistance, getPreciseDistance } from 'geolib';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
const dp = (size) => EStyleSheet.value(size + 'rem');
let that;
const key = 'AIzaSyBWQ6tsitoNAWbg8p8BolWGGi41JIalv2Q';

export class Participant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      id: '',
      list: [],
      isLoading: true,
      lat: '',
      long: '',
      eventUser: [],


    };
    console.log('current Location start>>>>', 'location');
    that = this;

  }
  getDistance = (lat, long) => {
    console.log('lat lng>>>>', this.state.lat + ',' + this.state.long);
    var dis = getDistance(
      { latitude: this.state.lat, longitude: this.state.long },
      { latitude: lat, longitude: long }
    );
    return `${(dis / 1600).toFixed(1)} Miles away`;
  };
  _requestLocation = () => {
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      this.state.lat = info.coords.latitude;
      this.state.lng = info.coords.longitude;
    });
    Geolocation.getCurrentPosition(
      (info) => {
        console.log('location>>>>', info);

        this.state.lat = info.coords.latitude;
        this.state.long = info.coords.longitude;
        console.log('Lat long>>>>', this.state.lat, this.state.long);
      },
      (error) => {
        // See error code charts below.

        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 100000,
      }
    );
  }


  componentDidMount = async () => {
    this._requestLocation();

    const id = await this.props.navigation.getParam('config', '');
    await this.participants(id);
  }

  participants = async (id) => {
    await WebApi.participants(id)
      .then(response => {
        console.log('Participant Listtttttt===>', response);

        if (!response) {
          // alert('no data found');
        } else if (response.data.length === 0) {
          // alert('no data found');
        } else {
          this.setState({ list: response.data })
          let eventUser = [];
          response.data.map((item, index) => {
            eventUser.push({
              fName: item.first_name,
              lName: item.last_name,
              image: item.image,
              id: item.id,
            })
          })
          this.setState({ eventUser: eventUser })
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log('errorrrrrrrrrrrr==>', error);
        alert('Something Went Wrong!');
      });

  }


  render() {

    if (this.state.isLoading) {
      return (
        <View style={{}}>
          <ParticipantsHeader title={'PARTICIPANTS'} search back goBack={() => this.props.navigation.goBack()} />
          <View style={[styles.loading]}>
            <ActivityIndicator size="large" color="gray" animating={that.state.isLoading} />
          </View>
        </View>
      );
    }
    return (
      <View style={{}}>
        <ParticipantsHeader mapPress={() => this.props.navigation.navigate('Conversation', {
          eventID: this.props.navigation.getParam('config', ''),
          eventName: this.props.navigation.getParam('eventName', ''),
          users: this.state.eventUser,
        })} showMessageIcon={true} donshowmap={true} title={'PARTICIPANTS'} search back goBack={() => this.props.navigation.goBack()}  >
          <View>
            {this.state.list.length > 0 && <TouchableOpacity style={{ backgroundColor: '#397471', width: 200, alignSelf: 'center', marginVertical: 20, padding: 8, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 20 }}> Start Group Chat</Text>
            </TouchableOpacity>}

            {this.state.list.length < 1 && <Text style={{ color: '#636363', fontSize: 20, alignSelf: 'center', margin: 20 }}>No participants</Text>}
            {this.state.list.map((item, index) => {
              return (
                <View style={{ flexDirection: 'row' }}>


                  <Categry
                    imageUri={{ uri: item.image }}
                    FirstName={item.first_name}
                    lastName={item.last_name}
                    message={item.city + ', ' + item.zipcode}
                    // sport={item.ability_info}
                  />
                  <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('PublicAccepted', { config: item.id });
                  }} >
                    <Image style={{ alignSelf: 'flex-end' }} source={Images.rightArrow} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

        </ParticipantsHeader>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
});

export default Participant;
