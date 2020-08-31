import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Modal } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import strings from '../util/strings';

dp = (size) => EStyleSheet.value(size+'rem')

export default class Otp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            otp: ['','','',''],
            error: false,
            focus: undefined
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
        otp.map((item)=> {
                otpString=otpString+item
        })
 
        return otpString
    }

    submitOTP() {
        if(this.isComplete(this.state.otp)) {
            let otp = this.getOtp(this.state.otp)
            this.props.onSubmit(otp)
            this.setState({
                otp: ['','','',''],
                error: false,
                focus: undefined
            })
        } else {
            this.setState({error: true})
        }
    }

    render() {

        const {show, onClose, reSend} = this.props

        const { focus, error } = this.state

        return(
        <Modal
            visible={show}
            transparent={true}
            animated
            animationType='fade'
            onRequestClose={()=>onClose()}
        >
            <TouchableOpacity activeOpacity={1} style={Styles.container} onPress={()=>onClose()} >
                <TouchableOpacity activeOpacity={1}  style={Styles.innerContainer} >

                    <Text style={Styles.heading} >Please Enter OTP sent to the registered Email Address </Text>

                    <View style={Styles.otpView} >
                        {this.state.otp.map((item, index)=>{
                            let otp = this.state.otp
                            return(
                                <TextInput key={`otp${index}`} style={[Styles.otpField,{borderColor: focus==index?EStyleSheet.value('$theme'): error && this.state.otp[index]==''? 'red' :'#D0D0D0'} ]} maxLength={1} keyboardType='number-pad' value={item} placeholder='*' placeholderTextColor='#757575' underlineColorAndroid='transparent' ref={(ref) =>  this['otp'+index] = ref } 
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
                                        this.setState({error: false})
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

                        {this.state.error? <Text style={{color:'red'}} >Please Enter Complete OTP</Text> : null}

                        <TouchableOpacity onPress={()=>reSend()} >
                            <Text style={{fontSize:dp(14), color:EStyleSheet.value('$theme'),  }} >Resend Otp</Text>
                        </TouchableOpacity>
                        

                        <TouchableOpacity onPress={()=>this.submitOTP()} activeOpacity={0.6} style={Styles.submit} >
                            <Text style={{color:EStyleSheet.value('$theme2'), fontWeight:'500'}} >{strings.submit}</Text>
                        </TouchableOpacity>

                    </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
        )
    }
}

const Styles = EStyleSheet.create({
    container: {
        height:'100%', 
        width:'100%', 
        backgroundColor:'rgba(0,0,0,0.7)', 
        justifyContent:'center', 
        alignItems:'center',
        zIndex:0
    },
    innerContainer : {
        backgroundColor:'#FFF', 
        width:'90%',
        borderRadius:10 ,
        alignItems:'center',
        zIndex: 5
    },
    otpField: {
        height:'40rem', 
        width:'40rem', 
        backgroundColor:'#FFF', 
        textAlign:'center', 
        fontSize:'15rem',
        borderWidth:1,
        borderColor:'#D8D8D8'
    },
    otpView: {
        flexDirection:'row', 
        justifyContent:'space-evenly', 
        width: '100%',
        alignItems:'center', 
        marginTop:'30rem',
        marginBottom: '10rem'
    },
    submit: { 
        borderTopWidth:1, 
        width:'100%', 
        paddingVertical:'10rem', 
        alignItems:'center', 
        marginTop:'30rem',
        borderColor:'#D8D8D8'
    },
    heading: {
        marginTop:'20rem', 
        fontSize:'14rem', 
        width:'80%', 
        textAlign:'center'
    }
})