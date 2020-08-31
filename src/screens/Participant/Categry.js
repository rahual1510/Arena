import React, { Component } from "react";
import { View, Text, Image,route } from "react-native";
import Styles from './ParticipantStyles';
import Images from '../../util/images';
import strings from '../../util/strings';
import { connect } from 'react-redux';
import WebApi from '../../WebApi/index';
import AsyncStore from '../../APIs/AsyncStore'
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Storage from '../../APIs/AsyncStore';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button';



class Categry extends Component {
 constructor(props) {
        super(props)
        this.state = {
         

        }
         
    }
        
    componentDidMount=async()=>{
                   
                         
                    }

         

    render() {
        return (
                  <View style={Styles.maincontainer}>
                        <View style={Styles.Box}>
                            <View style={Styles.imageUriView}>
                               <Image source={this.props.imageUri} style={Styles.imageUri}/>
                            </View>
                            
                            <View style={Styles.itemDetails}>
                                <View style={[Styles.commonSpace, Styles.wrap]}>
                                    <View style={{flexDirection:'row'}}>
                                    <Text style={Styles.FirstName}>{this.props.FirstName}</Text>
                                    <Text style={Styles.lastName}>{this.props.lastName}</Text>
                                    </View>
                                  <View style={Styles.navigationButton}>
                                  </View>
                               
                                </View>
                                <Text style={Styles.itemMessage}>{this.props.message}</Text>

                                <View style={[Styles.commonSpace, Styles.wrap]}>
                                    <Text style={Styles.itemSport}>{this.props.sport}</Text>
                                </View>
                              </View>


                            
                    </View>
                  <Image style={{width:'100%',alignSelf:'center',left:20 , marginTop:-10, backgroundColor:'lightgrey', height:1, }}/>
            </View>
                    
                                 
                  
        );
    }
}
export default Categry;
