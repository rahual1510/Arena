import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Styles from './ChatStyles';
import Images from '../../util/images';
import strings from '../../util/strings';
import EStyleSheet from 'react-native-extended-stylesheet';
import NavigationService from '../../NavigationService';
dp = (size) => EStyleSheet.value(size + 'rem')

class Category extends Component {

constructor(props) {
        super(props)
        
           
        }
        

    render() {
        return ( 
                  <View style={Styles.maincontainer}>
                       
                        <View style={Styles.Box}>
                            <View style={Styles.imageUriView}>
                               <Image source={this.props.imageUri} style={Styles.imageUri}/>
                            </View>
                            <View style={Styles.itemDetails}>
                                <View style={[Styles.commonSpace, Styles.wrap, {width:262, height:30}]}>
                                    <Text style={Styles.itemName}>{this.props.name}</Text>
                                    <Image style={{ alignSelf: 'flex-end',  height:30}} source={this.props.onlineStus} />
                                </View>
                                <Text style={Styles.itemMessage}>{this.props.message}</Text>
                                <Text style={Styles.itemSport}>{this.props.sport}</Text>
                           </View>
                        </View>
                      
                     <Image style={{width:'95%',alignSelf:'center' ,marginTop:-5, backgroundColor:'lightgrey', height:1, }}/>
                   </View>
                    
             
                  
        );
    }
}
export default Category;
