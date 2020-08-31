import React, { Component } from 'react'
import { View, } from 'react-native'
import strings from '../../util/strings';
import countryList from '../../util/countrycodes';
import Button from '../../components/Button'
import { connect } from 'react-redux'
import Picker from '../../components/Picker'
import * as Validations from '../../util/Validations'
import Header from '../../components/headerLogo'
import Loader from '../../components/Loader'
import EStyleSheet from 'react-native-extended-stylesheet';
import types from '../../types';

dp = (size) => EStyleSheet.value(size+'rem')

class ForgotPassword extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props) 
        this.callback = this.callback.bind(this)
        this.state = {
            phone:'',
            country:+231,
            loading:false
        }
    }

    callback(err, response) {
        if(err) {
            alert('Phone number is not registered')
        } else {
            const { phone, country } = this.state
            
            console.log(response)
            this.props.navigation.navigate('OtpVerify', {phone: countryList[country].dial_code+phone})
        }
    }

    submit() {

        const { phone, country } = this.state
       

        if(Validations.isMinLength(phone, 10)) {
            
            var pars = {
                phone: countryList[country].dial_code+phone
            }
            console.log(pars)
            this.props.forgot(pars, this.callback)
        } else {
            alert(strings.validNumber)
        }
    }

    render() {
        return (
           
            <Header title={strings.forgot} back={this.props.navigation} onBackPress={() => this.props.navigation.goBack()}> 
            
                <View style={{marginTop:dp(50)}} >
                        {/* Text input for Mobile Number */}
                        
                        <Picker 
                            fnc={(country)=>this.setState({country})} 
                            value={this.state.country} 
                            label={strings.phone} 
                            valueInput={this.state.phone} 
                            onChange={(phone)=>this.setState({phone})} 
                            phone
                        />
                        <Button label={strings.submit} onPress={()=>this.submit()} />

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
    forgot: (pars, cb) => dispatch({
        type: types.FORGOT_START,
        params: pars,
        callback: cb
    })
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
