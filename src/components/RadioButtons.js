import React, { useState } from 'react';
import {TouchableOpacity,StyleSheet, View, Image, Text} from 'react-native';
import Images from '../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';

dp = (size) => EStyleSheet.value(size+'rem')

const RadioButtons = (props) => {

    const { options, row, label, onChange, value,disabled } = props;
    
      return (
        <View style={{marginBottom:dp(10)}} >
            <Text style={styles.label} >{label.toUpperCase()}</Text>
            
            <View style={{flexDirection:row?'row': 'column', flexWrap:'wrap'}}>
            {options.map((item, index)=>
                <TouchableOpacity key={`option${index}`} style={styles.radioButton} onPress={()=> {
                    onChange(index)
                }} 
                disabled={disabled}>
                    <Image 
                    source={value==index? Images.radioSelected : Images.radioUnSelected} 
                    style={{marginRight: dp(10)}} />
                    <Text>{item}</Text>
                </TouchableOpacity>
            )}
            </View>
        </View>
      );
};

const styles = EStyleSheet.create({
    label: {
        fontSize:'13rem', 
        color: '$theme', 
        fontWeight:'500'
    },
    radioButton: {
        flexDirection:'row', 
        marginTop:'10rem', 
        marginRight:'15rem'
    }
})

export default RadioButtons;