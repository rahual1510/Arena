import React, { Component } from 'react'
import { Text, View, TextInput, Animated, Image, TouchableOpacity,Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Images from '../util/images'
import Geolocation from '@react-native-community/geolocation';
dp = (size) => EStyleSheet.value(size+'rem')

let underline = undefined

const key = 'AIzaSyBWQ6tsitoNAWbg8p8BolWGGi41JIalv2Q'

class Input extends Component {

    constructor(props) {
        super(props)
        this.anim = new Animated.Value(0)
        this.state = {
            focused:false,
            secure:true,
            suggestions:[]
        }
    }

    async getCities(input) {
        try {
            await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${key}&input=${input}`)
            .then((res)=>res.json())
            .then((response)=> {
                this.setState({suggestions: response.predictions})
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getlat(text){
        try{
          await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${text},+myLat+myLon&key=${key}`)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.results.length) {
                const { address_components, formatted_address,geometry } = responseJson.results[0]

                let name = formatted_address
                let city = address_components.findIndex((obj)=>obj.types.includes('locality'))
                let country = address_components.findIndex((obj)=>obj.types.includes('country'))
                let zip = address_components.findIndex((obj)=>obj.types.includes('postal_code'))
                let lat = geometry.location.lat
                let lng = geometry.location.lng

                this.props.getLocation1(
                    name, 
                    city!=-1?address_components[city].long_name: '', 
                    country!=-1?address_components[country].long_name: '', 
                    zip!=-1?address_components[zip].long_name: '',
                    lat,
                    lng
                )
            }
})
        }
        catch(error){
            console.log(error)
        }
    }

    async getAddress(lat, lng) {
        try {
            await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&location_type=ROOFTOP&result_type=street_address&key=${key}`)
            .then((res)=>res.json())
            .then((response)=> {
                // console.log(response)
                if(response.results.length) {
                    const { address_components, formatted_address } = response.results[0]

                    let name = formatted_address
                    let city = address_components.findIndex((obj)=>obj.types.includes('locality'))
                    let country = address_components.findIndex((obj)=>obj.types.includes('country'))
                    let zip = address_components.findIndex((obj)=>obj.types.includes('postal_code'))

                    this.props.getLocation(
                        name, 
                        city!=-1?address_components[city].long_name: '', 
                        country!=-1?address_components[country].long_name: '', 
                        zip!=-1?address_components[zip].long_name: '',
                        lat,
                        lng 
                    )
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    getLocation() {
        Geolocation.getCurrentPosition(info => {
            this.getAddress(info.coords.latitude, info.coords.longitude)
        });
    }


    underLine() {
        Animated.timing(this.anim,{
            toValue:1,
            duration:300,
            delay:200
        }).start()
    }
    
    render() {

        underline = this.anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
        });

        const eye = 
        <TouchableOpacity style={Styles.eyeButton} onPress={()=>this.setState({secure:!this.state.secure})} > 
            <Image source={this.state.secure?Images.hide:Images.view} />
        </TouchableOpacity>

        const { label, prefix, value, fnc, pass, comp, showLabel, edit = true, location, height,fnc1,loc } = this.props

        return (
            <View style={[Styles.borderBottom,{marginBottom:dp(10),}]} >
            {this.state.focused||(showLabel && value!='' )?<Text style={Styles.inputLabel} >{label}</Text>:null}
                <View style={{flexDirection:pass||comp?'row':'column', justifyContent:'space-between', alignItems:pass||comp?'center':null }} >
                    <TextInput 
                        placeholder={`${prefix?prefix+' ':''}${label}`} 
                        ref={refs=>this.input=refs}  
                        value={value} 
                        onChangeText={(text)=>{
                            fnc(text)
                            if(loc){
                                this.getCities(text)
                            }
                            
                        }} 
                        style={[Styles.textInput,{width:pass||comp?'90%':'100%',fontSize:this.state.focused?dp(14):dp(13), fontFamily: 'NotoSans', color:edit?'#000':'#909090', height: height? height : null }, Platform.OS=='android'? {paddingVertical:0, paddingHorizontal:0} : null ]} 
                        onFocus={()=>{this.setState({focused:true});this.underLine();}} 
                        placeholderTextColor='#6D7278' 
                        onBlur={()=>{this.setState({focused:false});this.anim.setValue(0) }} 
                        maxLength={pass?15:this.props.max} 
                        keyboardType={this.props.num?'number-pad':'ascii-capable'} 
                        secureTextEntry={pass||this.props.secure?this.state.secure:false}
                        editable={edit}
                        multiline={this.props.multiline?true:false}
                    />

                    {pass?eye:null}
                    {comp?
                        <TouchableOpacity onPress={()=>{
                            if(location)
                                this.getLocation()
                            else 
                                this.props.onCompPress()
                        }} >
                            <Image source={location? Images.location : comp} style={{width:dp(15), height:dp(15), resizeMode:'contain'}} />
                        </TouchableOpacity>
                    :null}
                </View>

                <Animated.View style={{zIndex:10, position:'absolute', bottom:-1, height:1, width:underline,backgroundColor:EStyleSheet.value('$theme') }} />
                {
                    this.state.suggestions.length?
                    this.state.suggestions.map((item,index)=>
                        <View key={`address${index}`}>
                            <Text style={{fontWeight:'500',fontSize:14,paddingVertical:5}}
                            onPress={()=>{
                                fnc1(item)
                                this.getlat(item.description)
                                this.setState({text: item.description,
                                suggestions: ''})
                            }} 
                                >{item.description}</Text>
                        </View>
                    )
                   : null
                }
            </View>
        )
    }
}

const Styles = EStyleSheet.create({
    textInput: {
        marginTop:'4rem',
        paddingVertical:'4rem',
    },
    inputLabel: {
        color:'$theme', 
        fontSize:'13rem',
        fontWeight:'500'
    },
    borderBottom: {
        borderBottomColor: '#E1E3E3', 
        borderBottomWidth:1
    },
    eyeButton: {
        width:'10%', 
        alignItems:'center', 
        justifyContent:'center', 
        alignSelf:'center' 
    }
})

export default Input
