/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import NavigationService from './src/NavigationService';
import Nav from './src/navigator';
import reducer from './src/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/saga/index';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from './PushNotification';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    let oldRender = Text.render;
    Text.render = function (...args) {
      let origin = oldRender.call(this, ...args);
      let style = origin.props.style;
      return React.cloneElement(origin, {
        style: [{ fontFamily: style ? (style.fontWeight >= 500 || style.fontWeight == 'bold') ? 'NotoSans-Bold' : 'NotoSans' : 'NotoSans' }, origin.props.style],
      });
    };
  }

  render() {

    return (
      <SafeAreaView style={{ flex: 1 }} >
        <Provider store={store} >
          <Nav ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }} />
          <PushNotification />
        </Provider>
      </SafeAreaView>
    );
  }
}

export default App;
