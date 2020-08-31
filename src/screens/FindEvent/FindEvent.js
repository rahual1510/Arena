import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/headerLogo'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../../util/commonStyles';
import Images from '../../util/images';
import Styles from './FindEventStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
dp = (size) => EStyleSheet.value(size + 'rem')

export class FindEvent extends Component {
    constructor(props){
        super(props)
        this.state={
            sval: '',
            athleteList: [],
        }
        this.state.athleteList =this.props.athleteList;
        this.state.filterList =this.props.athleteList
    }
    render() {
        return (
            <Header title='Find ATHLETES' noLogo={true} nomap={true} filter={true} onPressFilter={() => ''} back onBackPress={() => this.props.navigation.goBack() } search placeholderText={'Search'}  fnc={(sval)=>this.filter(sval)}  >
                <View style={Styles.maincontainer}>
                    {
                        this.state.athleteList.length ?
                            this.state.athleteList.map((item, index) =>
                                <View key={`athlete${index}`}  style={[Styles.container, commonStyles.shadow]} >

                                    <View style={Styles.innnerContainer}>
                                        <View style={{ flex: 2.5, }}>
                                            <View style={{ flexDirection: 'row' }}>

                                            <Image source={item.image ? { uri: item.image } : Images.dummyPic} style={{ borderRadius: dp(50), width: dp(60), height: dp(60), marginRight: dp(10) }} />

                                                
                                                <View style={{ flexDirection: 'column', marginLeft: dp(10), flexWrap: 'wrap' }}>
                                    
                                                        <Text style={Styles.heading} >{item.first_name}</Text>
                                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                                        <Text style={{ fontSize: dp(12) }} >{item.miles} miles away</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                                        <Text style={{ fontSize: dp(12) }} >{item.sports}</Text>
                                                    </View>
                                                </View>
                                            </View>



                                        </View>
                                        <View style={{ flex: 0.8, marginTop: dp(-10), marginRight: dp(-10) }}>
                                            <TouchableOpacity onPress={() =>{
                                                this.props.navigation.navigate('Profileinfo',{
                                                    Profileinfo : item
                                                })
                                            } 
                                            } >
                                                <Image style={{ alignSelf: 'flex-end' }} source={Images.rightArrow} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                            :
                            <View style={{ marginTop: '50%', alignItems: 'center', jystifyContent: 'center', }}>
                                <Text style={{ fontWeight: '500' }}>No Nearby Athlete Found</Text>
                            </View>
                    }


                </View>
            </Header>
        )
    }
    filter(val){
        console.log(val)
        val = val.trim().toLowerCase()
        this.state.athleteList  = this.props.athleteList 
        this.state.athleteList  = this.state.athleteList.filter(l => {
            if(l.first_name.toLowerCase().match(val)){
                console.log(l)
                return l
            }
           });
           this.setState({
            athleteList : this.state.athleteList 
            });
    }

}

const mapStateToProps = (state) => ({
    athleteList: state.profileReducer.athleteList,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(FindEvent)
