import React, { Component } from 'react'
import { View, Image, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Images from '../../util/images'
import Styles from './ResetPasswordStyle'
import EStyleSheet from 'react-native-extended-stylesheet';
import strings from '../../util/strings';
import Button from '../../components/Button'
// import {resetPassword} from '../../actions/auth_action'
// import {getProfile} from '../../actions/profile_action'
import Input from '../../components/Input'
import HeaderLogo from '../../components/headerLogo'
import * as Validations from '../../util/Validations'
import Loader from '../../components/Loader'
import CustomAlert from '../../components/CustomAlert'
import NavigationService from '../../NavigationService';
import types from '../../types';

dp = (size) => EStyleSheet.value(size + 'rem')

class ResetPassword extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            user: '',
            password: '',
            confirmPassword: '',
        }
    }

    callback(err, response) {
        if(err) {
            alert(response)
        } else {
            console.log(response)
            
        }
    }

    reset() {

        const { password, confirmPassword } = this.state

        if (Validations.isFieldEmpty(password) || Validations.isFieldEmpty(confirmPassword)) {
            alert(strings.fillFields)
        } else if (password != confirmPassword) {
            alert(strings.passwordMatch)
        } else if (!Validations.validatePassword(password)) {
            alert(strings.passwordRequirements)
        } else {

            var pars ={
                newpassword: password,
                confirmpassword: confirmPassword,
                userid: this.props.navigation.state.params.user
            }
            console.log(pars)
            this.props.resetPass(pars, this.callback)
        }
    }

    render() {

        return (

            <HeaderLogo title={strings.resetPassword} back={this.props.navigation} onBackPress={() => this.props.navigation.goBack()} >
                
                <View style={{ marginTop:dp(40) }} >

                    <Input label={strings.password} value={this.state.password} fnc={(password) => this.setState({ password })} prefix={strings.enter} pass />

                    <Input label={strings.confirmPassword} value={this.state.confirmPassword} fnc={(confirmPassword) => this.setState({ confirmPassword })} prefix='' pass />

                    <Button label={strings.submit} onPress={() => this.reset()} />

                </View>
                <CustomAlert
                    onButtonPress={() => {
                        NavigationService.navigate('App')
                    }}
                    ref={refs => this.alert = refs} />
                <Loader show={this.props.loading} />
            </HeaderLogo>

        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.authReducer.loading
})

const mapDispatchToProps = (dispatch) => ({
    resetPass: (pars, cb) => dispatch({
        type: types.RESET_START,
        params: pars,
        callback: cb
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
