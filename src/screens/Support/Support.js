import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/headerLogo'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../../util/commonStyles';
import { Api } from '../../APIs/Api';
import ApiConfig from '../../APIs/ApiConfig';


dp = (size) => EStyleSheet.value(size + 'rem')

export class Support extends Component {

    constructor(props) {
        super(props)

        this.state={
            address: '',
            phone: '',
            email: ''
        }
    }

    getSupport() {
        new Api().getJSON(ApiConfig.supportAddress)
        .then(response=>{
            this.setState({
                address: response.data.address,
                phone: response.data.phone,
                email: response.data.email
            })
        })
    }

    componentDidMount() { 
        this.getSupport()
    }

    render() {

        const { address, phone, email } = this.state

        return (
            <Header title='Support' drawer  >
                <View style={[{marginTop:dp(40), backgroundColor:'#FFF', padding:dp(15), borderWidth:0.5, borderColor:EStyleSheet.value('$theme2'),borderRadius:7}, commonStyles.shadow]} >

                    <Text style={{color: EStyleSheet.value('$theme'), fontSize:dp(12), fontWeight:'500', marginBottom: dp(10)}} >Address</Text>
                    
                    <Text style={{color: '#000', fontSize:dp(12), marginBottom:dp(10)}} >{address}</Text>

                    <View style={commonStyles.seperator} />

                    <Text style={{color: EStyleSheet.value('$theme'), fontSize:dp(12), fontWeight:'500', marginVertical: dp(10)}} >Email Address</Text>
                    
                    <Text style={{color: '#000', fontSize:dp(12), marginBottom:dp(10)}} >{email}</Text>

                    <View style={commonStyles.seperator} />

                    <Text style={{color: EStyleSheet.value('$theme'), fontSize:dp(12), fontWeight:'500', marginVertical: dp(10)}} >Phone Number</Text>
                    
                    <Text style={{color: '#000', fontSize:dp(12), marginBottom:dp(10)}} >{phone}</Text>
                    
                </View>
            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Support)
