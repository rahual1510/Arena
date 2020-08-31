import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/headerLogo'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../../util/commonStyles';
import Images from '../../util/images';
import strings from '../../util/strings';
import Styles from './OrdinaryStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Sports from '../../components/Sports'

dp = (size) => EStyleSheet.value(size + 'rem')

export class OrdinaryEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view: "areana",
            All: [],
            Areans: [],
            Pro: [],
        }
    }
    componentDidMount() {
        console.log(this.props.userEvents)
    }

    render() {
        return (
            <Header title='MY EVENTS' noLogo={true} drawer nomap noAdd={true} onImageClick={() => this.props.navigation.navigate('CreateEvent')}>
                <View style={Styles.maincontainer}>
                    <View style={[Styles.container1, commonStyles.shadow]}>

                        <View style={{
                            borderBottomWidth: 5,
                            borderBottomColor: this.state.view == "areana" ? '#99FFCC': 'white',
                             marginBottom: -10
                        }}>
                          <Text onPress={() => {
                            this.setState({ view: "areana" })
                        }} 
                        style={{fontSize :dp(13),
                            color: this.state.view == "areana" ? '#0D3447': '#333333', 
                            fontWeight:'700',paddingBottom:10}}>{strings.arena} {strings.events}</Text>
                        </View>

                        <View style={{
                            borderBottomWidth: 5,
                            borderBottomColor: this.state.view == "pro" ? '#99FFCC': 'white',
                             marginBottom: -10
                        }}>
                          <Text onPress={() => {
                            this.setState({ view: "pro" })
                        }} 
                        style={{fontSize :dp(13),
                            color: this.state.view == "pro" ? '#0D3447': '#333333', 
                            fontWeight:'700',paddingBottom:10}}>{strings.pro} {strings.events}</Text>
                        </View>
 
                        <View style={{
                            borderBottomWidth: 5,
                            borderBottomColor: this.state.view == "all" ? '#99FFCC': 'white', 
                            marginBottom: -10
                        }}>
                            <Text onPress={() => {
                                this.setState({ view: "all" })
                            }} 
                            style={{fontSize :dp(13),
                             color: this.state.view == "all" ? '#0D3447': '#333333', 
                             fontWeight:'700',paddingBottom:10}}
                             > {strings.eventHis}
                             </Text>
                        </View>
                       
                    </View>
                    {
                        this.state.view == "all" ?
                            this.props.userEvents.length ?
                            this.props.userEvents.map((item, index) =>
                            <Sports sportdata={item} eventdetails={() => {
                                this.props.navigation.navigate('EventDetail', {
                                    evendetail: item,
                                    interest: 'interest'
                                })
                               }}></Sports>
                                )
                                : null : this.state.view == "areana" ?
                                <View style={{justifyContent:'center',alignItems:'center',marginTop: '50%',}}>
                                    <Text style={{fontWeight:'700'}}>
                                        No Arena Event
                                    </Text>
                                </View>
                             
                                : this.state.view == "pro" ?
                                <View style={{justifyContent:'center',alignItems:'center',marginTop: '50%',}}>
                                <Text style={{fontWeight:'700'}}>
                                    No Pro Event
                                </Text>
                            </View> : null
                    }


                </View>
            </Header>
        )
    }

}

const mapStateToProps = (state) => ({
    userEvents: state.profileReducer.userEvents
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(OrdinaryEvent)
