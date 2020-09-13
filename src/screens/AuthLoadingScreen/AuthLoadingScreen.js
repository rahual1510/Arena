/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import types from '../../types';
// import {setUser} from '../../actions/auth_action'
import { creatUser } from '../../Firestore/UsersCollection';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  UNSAFE_componentWillMount() {
    // this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const user = await AsyncStorage.getItem('userId');
    console.log(user);
    this.props.setUser(user ? true : false);
    if (user) {
      creatUser(user);
      const role = await AsyncStorage.getItem('role');
      console.log(role);
      if (role == 1) {
        this.props.navigation.navigate('App1');
      } else {
        this.props.navigation.navigate('App');
      }
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setUser: data =>
    dispatch({
      type: types.SET_USER,
      data: data,
    }),
  getmyEvent: () =>
    dispatch({
      type: types.GET_MYEVENYTS,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthLoadingScreen);
