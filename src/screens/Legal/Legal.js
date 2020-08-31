import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/headerLogo'
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button';


dp = (size) => EStyleSheet.value(size + 'rem')

export class Legal extends Component {

    constructor(props) {
        super(props)
    }

    navigate(type) {
        const { navigate } = this.props.navigation
        console.log(type)
        navigate('Info', {type: type==0?'terms': type==1? 'privacy': 'creation'})

    }

    render() {

        return (
            <Header title='Legal' drawer  >
                <View style={{marginTop:dp(40)}} >
                    <Button label='TERMS AND CONDITIONS' onPress={()=>this.navigate(0)} />

                    <Button label='PRIVACY POLICY' onPress={()=>this.navigate(1)}  buttonStyle={{backgroundColor:'#FFF', borderColor:EStyleSheet.value('$theme2'), borderWidth:1}} color={EStyleSheet.value('$theme')} />

                    <Button label='GROUP CREATION POLICY' onPress={()=>this.navigate(2)}  buttonStyle={{backgroundColor:'#FFF', borderColor:EStyleSheet.value('$theme2'), borderWidth:1}} color={EStyleSheet.value('$theme')} />
                </View>
            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Legal)
