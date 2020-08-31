import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Styles from './ParticipantStyles';
import Images from '../../util/images';
import strings from '../../util/strings';
import EStyleSheet from 'react-native-extended-stylesheet';



class Category extends Component {
    render() {
        return (
                  <View style={Styles.maincontainer}>
                        <View style={Styles.Box}>
                            <View style={Styles.imageUriView}>
                               <Image source={this.props.imageUri} style={Styles.imageUri}/>
                            </View>
                            
                            <View style={Styles.itemDetails}>
                                <View style={[Styles.commonSpace, Styles.wrap, {width:262}]}>
                                    <Text style={Styles.itemName}>{this.props.name}</Text>
                                  <View style={Styles.navigationButton}>
                                    <TouchableOpacity onPress={''} >
                                        <Image style={{ alignSelf: 'flex-end' }} source={Images.rightArrow} />
                                    </TouchableOpacity>
                                  </View>
                               
                                </View>
                                <Text style={Styles.itemMessage}>{this.props.message}</Text>

                                <View style={[Styles.commonSpace, Styles.wrap,{ height:20,width:252}]}>
                            <Text style={Styles.itemSport}>{this.props.sport}</Text>
                            <Text style={Styles.itemSport}>{strings.beginner}</Text>       
                         </View>
                                <Text style={Styles.itemStatus}>{this.props.status}</Text>
                      </View>


                            
                    </View>
                  <Image style={{width:'95%',alignSelf:'center' , backgroundColor:'lightgrey', height:1, }}/>
            </View>
                    
             
                  
        );
    }
}
export default Category;
