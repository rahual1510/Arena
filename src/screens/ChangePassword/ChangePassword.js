import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/headerLogo'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../../util/commonStyles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import strings from '../../util/strings';
import types from '../../types';
import * as Validations from '../../util/Validations';
import Loader from '../../components/Loader';


dp = (size) => EStyleSheet.value(size + 'rem')

export class ChangePassword extends Component {

    constructor(props) {
        super(props)
        this.callback = this.callback.bind(this)
        this.state= {
            oldPass: '',
            pass: '',
            cPass: ''
        }
    }

    callback(err, response) {
        if(err) {
            alert(response)
        } else {
            alert('Your password has been changed successfully')
            // this.props.navigation.goBack()
        }
    }

    submit() {

        const { oldPass, pass, cPass } = this.state

        if(Validations.isAnyFieldEmpty([oldPass, pass, cPass])) {
            alert(strings.fillFields)
        } else if(!Validations.isMinLength(pass, 6)) {
            alert(strings.validPassword)
        } else if(pass != cPass) {
            alert(strings.passwordMatch)
        } else {

            var pars = {
                oldpassword: oldPass,
                newpassword: pass,
                confirmpassword: cPass
            }

            this.props.changePass(pars, this.callback)
        }
    }

    render() {

        return (
            <Header title={strings.changePassword} drawer  >
                <View style={{marginTop:dp(50)}} >
                    <Input
                        value={this.state.oldPass}
                        fnc={(oldPass)=>this.setState({oldPass})}
                        label= {strings.password}
                        prefix= ''
                        pass
                    />

                    <Input
                        value={this.state.pass}
                        fnc={(pass)=>this.setState({pass})}
                        label= {strings.newPassword}
                        prefix= ''
                        pass
                    />

                    <Input
                        value={this.state.cPass}
                        fnc={(cPass)=>this.setState({cPass})}
                        label= {strings.confirmPassword}
                        prefix= ''
                        pass
                    />

                    <Button label={strings.changePassword.toUpperCase()} onPress={()=>this.submit()} />
                </View>
                <Loader show={this.props.loading} />
            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
    loading : state.profileReducer.loading
})

const mapDispatchToProps = (dispatch) => ({
    changePass: (pars, cb) => dispatch({
        type: types.CHANGE_PASS,
        params: pars,
        callback: cb
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
