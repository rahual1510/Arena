import React, { Component } from 'react'
import { Text, Image, ImageBackground, TouchableOpacity, Dimensions, View, ScrollView, KeyboardAvoidingView } from 'react-native'
import Images from '../util/images'
import EStyleSheet from 'react-native-extended-stylesheet';
import NavigationService from '../NavigationService';


dp = (size) => EStyleSheet.value(size+'rem')

const {height, width} = Dimensions.get('window')

const image = [
    Images.getstartedimg1,
]

class pages extends Component {
    render() {

        const { icon, title, back,  noLogo, onBackPress, drawer,} = this.props

        return (
            <KeyboardAvoidingView style={{flexGrow: 1, height: '100%', }} behavior={Platform.OS=='ios'?'padding':'height'} enabled keyboardVerticalOffset={Platform.OS=='android'?80:20} >
                <ScrollView bounces={false} ref={refs=> this.scroll = refs} keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scroll} >
                    
                    <ImageBackground source={Images.header} style={{width:'100%', height:dp(170), alignItems:'center', paddingTop:dp(30), marginBottom:dp(40)}}  >
                        <View style={{
                               flexDirection: 'row', 
                               width:'92%', 
                               justifyContent:'center', 
                               alignItems:'center',
                        }} >
                            {back || drawer?
                                <TouchableOpacity style={styles.backButton} onPress={()=>{
                                    if(drawer) 
                                        NavigationService.toggleDrawer()
                                    else {
                                        if(onBackPress)
                                            onBackPress()
                                        else
                                            goBack()
                                        }
                                        }
                                    }
                                    hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }} >
                                    <Image style={{}} source={drawer? Images.menu : Images.leftarrow} />
                                </TouchableOpacity>
                            : null
                            }

                            <Text style={styles.title} >{title.toUpperCase()}</Text>
                           
                        </View>

                    </ImageBackground>

                    <View style={{alignSelf:'center', top: image? dp(90) : dp(75), position:'absolute'}} >
                        {noLogo? 
                        null : 
                        image?
                            <View>
                                <Image source={image} style={styles.profilePic} />
                                <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={()=>onImagePress()} >
                                    <Image source={icon} />
                                </TouchableOpacity>
                            </View>
                                
                            :
                            <Image source={Images.headerImage} style={{}} />
                        }
                        </View>
                    
                    <View style={[styles.container, {top: noLogo? -dp(130): null}]} >
                        {this.props.children}
                    </View>
                </ScrollView>
                
            </KeyboardAvoidingView>
        )
    }
}

const styles = EStyleSheet.create({
    scroll: {
        flexGrow: 1, 
        width: '100%', 
        paddingBottom: '50rem', 
    },
    backButton: {
        position:'absolute', 
        left:0, 
        paddingLeft:'12rem', 
        zIndex:10
    },
    title: {
        fontSize:'15rem', 
        fontWeight:'600', 
        color:'#FFF',
        alignSelf:'center',
        textAlign : 'center' 
    },
    headerView: {
        flexDirection: 'row', 
        width:'92%', 
        justifyContent:'center', 
        alignItems:'center',
    },
    container: {
        paddingHorizontal:'20rem', 
        width:'100%',
        alignSelf: 'center',
    },
    profilePic: {
        borderRadius: 10, 
        borderWidth: 2, 
        borderColor: '$theme2',
        marginHorizontal: '20rem',
        height:'100rem',
        width:'100rem',
        resizeMode: 'cover'
    },
    multiline: {
        borderColor: '#FFFFFF', 
        borderWidth:0.5,
        minHeight: '35rem',
        minWidth: '100%',
        position:'absolute',
        paddingLeft:'35rem',
        color: '#FFFFFF',
    }
})

export default pages