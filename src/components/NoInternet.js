import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Modal } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Images from '../util/images';
import Button from './Button';


dp = (size) => EStyleSheet.value(size+'rem')

export default class NoInternet extends Component {

    render() {

        return(
            <View style={Styles.container} >
               <Image source={Images.nointernet} style={Styles.image} />

               <Text style={Styles.labelText} >Whoops !!</Text>

               <Text style={Styles.message} >No Internet Connectivity</Text>

               <Button label={'Try again'} onPress={()=>console.log('No Internet')} />
            </View>
        )
    }
}

const Styles = EStyleSheet.create({
    container: {
        height:'100%', 
        width:'100%', 
        backgroundColor:'#FFF', 
        paddingTop: '50rem', 
        alignItems:'center'
    },
    labelText: {
        marginTop:'20rem', 
        fontSize:'18rem', 
        fontWeight:'500'
    },
    message: {
        marginTop:'10rem', 
        fontSize:'15rem', 
        marginBottom:'15rem'
    },
    image: {
        width:'80%', 
        resizeMode: 'cover'
    }
})
