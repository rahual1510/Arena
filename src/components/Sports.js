import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../util/commonStyles'
import Images from '../util/images';
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class Sports extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { sportdata, eventdetails,stat } = this.props
        const { user_type, sports, miles, name, level, start_date, end_date, start_time, end_time, cost, location,status,block_status } = sportdata
        return (
            <View style={[Styles.container, commonStyles.shadow]} >
                {
                    user_type == 1 ?
                        <Image source={Images.protag} style={{ position: 'absolute', }} />
                        : null
                }

                <View style={Styles.innnerContainer}>

                    <View style={Styles.innerColoumn}>
                        <View style={Styles.sideLog}>
                        <Image source={sports[0].icon ? { uri: sports[0].icon } : null} style={{ width:40, marginTop:10, height:50, alignSelf:'center'}} />
                        </View>
                        <Text style={{ fontSize: dp(10), color: '#0D3447', fontWeight: '500' }} >{miles} miles away</Text>
                    </View>

                    <View style={{ flex: 2.5, flexDirection: 'column', }}>

                        <View style={{ flexDirection: 'row', marginBottom: dp(5), flexWrap: 'wrap' }}>
                            <Text style={Styles.heading} >{name} &nbsp;</Text>

                            <Text style={{ color: '#A585F6', fontSize: 12, fontWeight: '600' }}>
                                ({level})
    </Text>
                        </View>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                            <Text style={Styles.des}>{start_date} - {end_date} </Text>
                        </View>

                        <Text style={Styles.des}>{start_time} - {end_time} </Text>

                        <View style={{ flexDirection: 'row', marginBottom: dp(5) }}>
                            <Image source={Images.locationicon} style={{ marginRight: 3, marginTop: 2 }} />
                            <Text style={Styles.des}>{location}</Text>
                        </View>
                        {
                            user_type == 1 ?
                                <View style={{ flexDirection: 'row',justifyContent:'space-between',width:'120%'}}>
                                    {
                                    !cost ?
                                    <Text style={{ fontSize: dp(10), fontWeight: '700' }}>$0 
                                    </Text> :
                                    <Text style={{ fontSize: dp(10), fontWeight: '700' }}>${cost} </Text>
                                    }
                                    {
                                        stat?
                                    <View>
                                    {
                                        status == 1 ?
                                            <Text style={{ color: '#4893F1' }}>Published</Text> : null

                                    }
                                    {
                                        status == 0 ?
                                            <Text style={{ color: 'green' }}>Under Review</Text> : null
                                    }
                                    {
                                        block_status == 1 ?
                                            <Text style={{ color: 'red'}}>Rejected</Text> : null
                                    }
                                    </View> :null
                                        }
                                </View> : null
                        }


                    </View>
                    <View style={Styles.navigationButton}>
                        <TouchableOpacity onPress={eventdetails} >
                            <Image style={{ alignSelf: 'flex-end' }} source={Images.rightArrow} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const Styles = EStyleSheet.create({
    heading: {
        fontWeight: '500',
        color: '#000',
        fontSize: '15rem',
    },
    container: {
        marginTop: '5rem',
        marginBottom: '10rem',
        backgroundColor: '#FFF',
        padding: '10rem',
        width: '100%',
        position: 'relative',
        // paddingHorizontal :'5%'
        borderRadius: '5rem'
    },
    sideLog: {
        marginTop:'7rem',
        marginBottom: '5rem',
        width: '60rem',
        height: '60rem',
        overflow: 'hidden',
        backgroundColor: 'rgba(153,255,204,0.31)',
        borderRadius: '30rem',
        // backgroundColor:'yellow'
    },
    innnerContainer: {
        flex: 1,
        flexDirection: 'row',

    },
    innerColoumn: {
        flex: 1.1,
        flexDirection: 'column',
    },
    des: {
        flex: 1, flexWrap: 'wrap',
        fontSize: '10rem',

    },
    commonPadding: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textstyle: {
        fontSize: '11rem',

    },
    navigationButton: {
        flex: 0.8,
        marginTop: '-10rem',
        marginRight: '-10rem'
    }
})