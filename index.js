/**
 * @format
 */

import {AppRegistry, Dimensions} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import EStyleSheet from 'react-native-extended-stylesheet';

let {height, width} = Dimensions.get('window');
const wid = width<height? width:height

EStyleSheet.build({
  $rem: wid/360,
  $theme: '#0D3447',
  $theme2: '#99FFCC'
});

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
