import React, { Component } from 'react'
import { View, KeyboardAvoidingView, ScrollView, Platform, TextInput, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Styles from './OtpVerifyStyles'
import EStyleSheet from 'react-native-extended-stylesheet';
import strings from '../../util/strings';
import Button from '../../components/Button'
// import {verifyOtp, resendOtp} from '../../actions/auth_action'
// import {getProfile} from '../../actions/profile_action'
import Header from '../../components/headerLogo'
import Loader from '../../components/Loader'
import NavigationService from '../../NavigationService'
import CustomAlert from '../../components/CustomAlert'
import Images from '../../util/images';
import types from '../../types';

export class OtpVerify extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props) 
        this.callback = this.callback.bind(this)
        this.state = {
            otp: ['','','','','',''],
            focus:undefined
        }
    }

    isComplete(arr) {
        
        for(var i=0; i<arr.length;i++) {
            if(arr[i]==null || arr[i]=='' ) 
            return false
        }
        return true
    }

    getOtp(otp) {
        let otpString = ''
        // let otp = this.state.otpMobile
        otp.map((item)=> {
                otpString=otpString+item
        })
 
        return otpString
    }

    callback(err, response) {
        if(err) {
            alert(response)
        } else {
            console.log(response)
            this.props.navigation.navigate('ResetPassword', {user: response.userid})
            
        }
    }

    submitOTP() {
        if(this.isComplete(this.state.otp)) {
            var pars = {
                phone: this.props.navigation.state.params.phone,
                otp: this.getOtp(this.state.otp)
            }

            this.props.submitOtp(pars, this.callback)

        } else {
            alert('Please enter Full OTP to proceed')
        }
    }

    resend() {
        var pars = {
            phone: this.props.navigation.state.params.phone,
        }

        this.props.forgot(pars, this.callback,'otp')
    }

    render() {

        const {state} = this.props.navigation

        // const { type } = state.params

        return (
        <Header title={strings.phoneVerify} back={this.props.navigation} onBackPress={() => this.props.navigation.goBack()} >

                <View style={{marginTop:dp(40)}} >
                    {/* Text input for username */}
                    <View style={{justifyContent:'center',alignItems:'center',marginBottom:dp(12),}}>
                    <Text style={{color:'#0D3447',fontWeight:'600',fontSize:dp(13)}}>ENTER CODE HERE</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%' }} >
                       
                    {this.state.otp.map((item, index)=>{
                        let otp = this.state.otp
                        return(
                            <TextInput 
                            key={`otp${index}`} 
                            style={[Styles.otpField,{borderBottomColor: EStyleSheet.value(this.state.focus==index ? '$theme' : '$theme2' )} ]} 
                            maxLength={1} 
                            keyboardType='number-pad' 
                            value={item} 
                            placeholder='*' 
                            placeholderTextColor='#757575' underlineColorAndroid='transparent' 
                            ref={(ref) =>  this['otp'+index] = ref } 
                            onFocus={()=> {
                                this.setState({focus:index})
                                if(otp[index]=='') {
                                    for(var i=0;i<index;i++) {
                                        if(otp[i]=='') {
                                            this['otp'+i].focus()
                                            break;
                                        }
                                    }
                                } else {
                                    for(var i=otp.length-1;i>index;i--) {
                                        if(otp[i]!='') {
                                            if(i==otp.length-1)
                                                this['otp'+i].focus()
                                            else 
                                                this['otp'+(i+1)].focus()
                                            break;
                                        }
                                    }
                                }
                            }}
                            onChangeText={(value)=> {
                                otp[index] = value
                                if(index<this.state.otp.length-1 && value!='' )
                                    this['otp'+(index+1)].focus()
                                else if(this.isComplete(otp))
                                    // alert('Done')
                                this.setState({otp:[]})
                                this.setState({otp:otp})
                                }}
                            onKeyPress={event => {
                                if (event.nativeEvent.key === 'Backspace' && otp[index] == '' ) 
                                    if(index>0) {
                                        otp[index-1]=''
                                        this.setState({otp:[]})
                                        this.setState({otp:otp})
                                        this['otp'+(index-1)].focus()
                                    }
                                }}
                            onBlur={()=>this.setState({focus:undefined})}
                            />
                        )
                    })}
                    </View>
                    
                    <Button label={strings.submit} onPress={()=>this.submitOTP()} />

                    <Text onPress={()=>this.resend()} style={{color:EStyleSheet.value('$theme'), marginTop:dp(10), alignSelf:'center', fontWeight:'500',fontSize:dp(14)}} >Resend OTP</Text>
                    
                </View>

            <CustomAlert 
                onButtonPress={()=>{
                    this.props.navigation.navigate('ResetPassword')
                }} 
                ref={refs=>this.alert=refs} />
            
            <Loader show={this.props.loading} />
        </Header>
        )
    }
}

const mapStateToProps = (state) => ({
    
    loading: state.authReducer.loading
})

const mapDispatchToProps = (dispatch) => ({
    submitOtp: (pars, cb) => dispatch({
        type: types.OTP_START,
        params: pars,
        callback: cb
    }),
    forgot: (pars, cb,otp) => dispatch({
        type: types.FORGOT_START,
        params: pars,
        callback: cb,
        otp: otp
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(OtpVerify)
