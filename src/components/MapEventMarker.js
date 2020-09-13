/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../util/commonStyles';
import Images from '../util/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
const dp = (size) => EStyleSheet.value(size + 'rem');

export default class Sports extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { sportdata } = this.props;
        const { user_type, sports, miles, name, level, start_date, end_date, start_time, end_time, cost, location, status, block_status } = sportdata;
        return (
            <View style={{ alignItems: 'center' }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', minWidth: 200, borderColor: '#99FFCC', borderWidth: 1 }}>

                    <View style={{ flexDirection: 'row' }}>
                        {
                            user_type == 1 ?
                                <Image source={Images.protag} style={{ height: 14, width: 14 }} resizeMode={'contain'} />
                                : null
                        }
                        <View >

                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Text style={{ fontSize: 12, marginLeft: 8, fontWeight: '500' }} >{name}</Text>
                                <Text style={{ color: '#A585F6', fontSize: 12, fontWeight: '600' }}>
                                    ({level}) </Text>
                            </View>
                            <Text style={{ marginLeft: 8, fontSize: dp(10), fontWeight: '500' }} >{miles} miles away</Text>

                            <View style={{ marginLeft: 8, flexDirection: 'row', marginBottom: dp(5) }}>
                                <Image source={Images.locationicon} style={{ marginRight: 3, marginTop: 2 }} />
                                <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ fontSize: dp(10), color: '#0D3447' }}>{location}</Text>
                            </View>
                            <View style={{ marginLeft: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Text style={Styles.des}>{start_date} </Text>
                            </View>
                        </View>
                    </View>
                    {
                        user_type == 1 &&
                        <Text style={{ fontSize: 12, fontWeight: '500', marginRight: 8 }}>${cost ? cost : 0} </Text>
                    }

                </View>

                <View style={{
                    width: 0,
                    height: 0,
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderLeftWidth: 6,
                    borderRightWidth: 6,
                    borderBottomWidth: 12,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: '#99FFCC', transform: [
                        { rotate: '180deg' }
                    ]
                }} />
                <View style={{
                    width: 0,
                    height: 0,
                    position: 'absolute',
                    bottom: 4,
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderLeftWidth: 5,
                    borderRightWidth: 5,
                    borderBottomWidth: 10,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: 'white', transform: [
                        { rotate: '180deg' }
                    ]
                }} />
            </View>
        );
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
        borderRadius: '5rem',
    },
    sideLog: {
        marginTop: '7rem',
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
        marginRight: '-10rem',
    },
});
