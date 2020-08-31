import React, { Component } from 'react'
import { Text, Image, View, TouchableOpacity, Keyboard } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

dp = (size) => EStyleSheet.value(size+'rem')

export default class Button extends Component {
    render() {

        const { bordered, Style, label, onPress, color, bold, icon, disabled, buttonStyle } = this.props

        return (
            <LinearGradient colors={['#63B199', '#397471', '#0E3648']} start={{x:0.1,y:0}} style={[styles.gradient, Style?Style:null]} >
                <TouchableOpacity style={[styles.button, {flexDirection:icon?'row':'column' }, buttonStyle]} 
                disabled={disabled}
                onPress={()=>{
                    Keyboard.dismiss()
                    onPress()
                    }} 
                >
                    {icon?<Image source={icon} style={styles.icon} />: null}
                    <Text style={{color:color?color:'#FFF', fontSize:dp(14), fontWeight:bold?'500':'400' }} >{label}</Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }
}

const styles = EStyleSheet.create({
    gradient: {
        width:'80%', 
        marginTop:'25rem', 
        borderRadius: 5, 
        alignSelf:'center',
        justifyContent:'center', 
        alignItems:'center', 
    },
    button: {
        justifyContent:'center', 
        alignItems:'center', 
        width:'100%',
        paddingVertical:'10rem', 
    },
    icon: {
        height:'18rem', 
        width:'18rem', 
        resizeMode:'contain', 
    }
  })