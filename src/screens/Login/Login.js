import React, { Component } from 'react'
import { Text, StyleSheet, View, Image,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from '../../components/headerLogo';
import Input from '../../components/Input';
import Button from '../../components/Button';

import strings from '../../util/strings';
import Styles from './LoginStyles';
import Loader from '../../components/Loader';
import types from '../../types';
import NavigationService from '../../NavigationService';
import {
    ToastAndroid,
    Platform,
    AlertIOS,
  } from 'react-native';

import Images from '../../util/images';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;
dp = (size) => EStyleSheet.value(size+'rem')
let that
class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state ={
            email: '',
            password: '',
            social_id: '',
            social_type: 'facebook',
            user_type: '0',
            phone: ''
        }
        that=this
    
        
    }
    
    handleFacebookLogin () {
        LoginManager.logInWithPermissions(['email']).then(
          function (result) {
            if (result.isCancelled) {
              console.log('Login cancelled')
            } else {
              console.log('Login success with permissions: ' + result.grantedPermissions.toString())
              FBSDK.AccessToken.getCurrentAccessToken().then(
                (data) => {
                    console.log('Acces Token>>>>',data.accessToken.toString())
                that.setState({social_id:data.accessToken.toString()},()=>{that.initUser(that.state.social_id)})
                })
               

            }
          }.bind(this),
          function (error) {
            console.log('Login fail with error: ' + error)  
          }
        )
      }
      initUser(token) {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
        .then((response) => response.json())
        .then((json) => {
          // Some user object has been set up somewhere, build that user here
        
          that.setState({email:json.email,phone:json.emailphone},()=>{
            if (Platform.OS === 'android') {
                ToastAndroid.show('Logging IN...', ToastAndroid.SHORT)
              } 
            that.socialLogin()})    
          console.log('Graph Request>>','Success')
        })
        .catch(() => {
          reject('ERROR GETTING DATA FROM FACEBOOK')
        })
      }
    callback(err, response) {
        if(err) {
            alert(response)
        } else {
            console.log(response)
            
        }
    }
    socialCallback(err, response) {
        if(err) {
            alert(response)
        } else {
            console.log(response)
            
        }
    }
    socialLogin(){
        var pars={
            social_id: this.state.social_id,
            social_type:this.state.social_type,
            user_type: this.state.user_type,
            email: this.state.email,
            phone: this.state.phone,
        }
        console.log("PArans",pars)
        that.props.socialLogin(pars,this.socialCallback)
    }
    login() {
        var pars = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.login(pars, this.callback)
    }


    render() {

        const {navigate} = this.props.navigation

        return (
            <Header header title={strings.signIn}  > 
                <View style={{marginTop:dp(40)}} >
                    <Input
                        value={this.state.email}
                        fnc={(email)=>this.setState({email})}
                        label= {strings.emailphone}
                        prefix= ''
                    />

                    <Input
                        value={this.state.password}
                        fnc={(password)=>this.setState({password})}
                        label= {strings.password}
                        prefix= ''
                        pass
                    />

                    <Text onPress={()=>navigate('Forgot')} style={Styles.forgot} >{strings.forgot}?</Text>

                    <Button label={strings.signIn.toUpperCase()} bold onPress={()=> this.login()}/>

                    <Text style={Styles.newUser} >{strings.newUser}<Text onPress={()=>navigate('SignUp')} style={Styles.signupText} >{strings.signUp}</Text></Text>

                    <View style={{flexDirection:'row',marginTop:20,justifyContent:'center'}}>
                    <TouchableOpacity onPress={this.handleFacebookLogin}> 
                        <Image source={Images.fb} style={{marginRight:5,marginTop:-2} }/>
                        </TouchableOpacity>

                  </View>
                
                </View>
                <Loader show={this.props.loading} />
            </Header>
        )
    }
}


const mapStateToProps = (state) => ({
    loading: state.authReducer.loading
  })

const mapDispatchToProps = (dispatch) => ({
    login: (pars, cb) => dispatch({
        type: types.LOGIN_START,
        params: pars,
        callback: cb
    }),
    socialLogin: (pars,cb) => dispatch({
        type: types.SOCIAL_LOGIN_START, 
        params: pars,
        callback: cb
        
    })

})


  
export default connect(mapStateToProps, mapDispatchToProps)(Login)

