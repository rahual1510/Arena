/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Styles from './EventDetailStyles';
import strings from '../../util/strings';
import Images from '../../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button';
import WebApi from '../../WebApi/index';
import * as Storage from '../../APIs/AsyncStore';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
const dp = size => EStyleSheet.value(size + 'rem');
export class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participant_id: '',
            event_id: '',
            config: '',
            event: [],
            reqsted: false,
        };
        this.state.event = this.props.navigation.state.params.evendetail;
        console.log('evvvvvvvvvvvvveeeeennnnnt======>', this.state.event);
        // this.setState({event:json});

        const config = { event_id: this.state.event.id };
        console.log('eventttttttttttttttttttttt====>', config);
    }

    componentDidMount = async () => { };

    Participant = async () => {
        const userId = await AsyncStorage.getItem('userId');
        await WebApi.Participant(userId, this.state.event.id)
            .then(response => {
                if (response.code == 200) {
                    alert('Your request has been submited sucessfully');
                    this.setState({ reqsted: true });
                }
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log('errorrrrrrrrrrrr==>', error);
                alert('Something Went Wrong!');
            });
    };

    render() {
        return (
            <Header
                title={'EVENT DETAILS'}
                search
                back
                goBack={() => this.props.navigation.goBack()}>
                <View style={Styles.maincontainer}>
                    <View style={Styles.innercontainer}>
                        <Text style={Styles.heading}>{this.state.event.name}</Text>
                        {this.state.event.image ? (
                            <Image
                                source={
                                    this.state.event.image ? { uri: this.state.event.image } : null
                                }
                                style={Styles.profilePic}
                            />
                        ) : null}
                        {this.props.navigation.state.params.request ? (
                            <View style={{ flexDirection: 'row', marginTop: dp(8) }}>
                                <Text style={Styles.des}>{strings.created} &nbsp;</Text>
                                <Text
                                    style={{
                                        color: '#0D3447',
                                        fontSize: dp(12),
                                        fontWeight: '500',
                                    }}>
                                    {this.state.event.organiser}
                                </Text>
                            </View>
                        ) : null}

                        <View style={Styles.commonSpace}>
                            <Text style={Styles.boldTheme}>{strings.location}</Text>
                            {!this.props.navigation.state.params.request ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('CreateEvent', {
                                            data: this.state.event,
                                            false: false,
                                        });
                                    }}>
                                    <Image style={{ marginTop: dp(10) }} source={Images.edit} />
                                </TouchableOpacity>
                            ) : null}
                        </View>

                        <View style={[Styles.commonSpace, Styles.wrap]}>
                            <View
                                style={{ flexWrap: 'wrap', flexDirection: 'row', width: '80%' }}>
                                <Text style={Styles.des}>{this.state.event.location}</Text>
                            </View>
                            <Text style={Styles.des}>
                                {strings.age}: {this.state.event.age_range}
                            </Text>
                        </View>

                        <View style={Styles.commonSpace}>
                            <Text style={Styles.boldTheme}>{strings.datetime}</Text>
                            <Text style={Styles.boldTheme}>{this.state.event.gender}</Text>
                        </View>

                        <Text style={Styles.des}>
                            {this.state.event.start_date} - {this.state.event.end_date}
                        </Text>
                        <Text style={Styles.des}>
                            {this.state.event.start_time} - {this.state.event.end_time}
                        </Text>

                        <Text style={Styles.boldTheme}>
                            {this.state.event.total_participants} Participants needed
            </Text>

                        <View style={Styles.commonSpace}>
                            <Text style={Styles.boldTheme}>{strings.sport}</Text>
                            <Text style={Styles.boldTheme}>{strings.level}</Text>
                        </View>

                        <View style={Styles.commonSpace}>
                            <Text style={Styles.des}>{this.state.event.sports[0].name}</Text>
                            <Text style={Styles.des}>{this.state.event.level}</Text>
                        </View>

                        {this.state.event.user_type == 1 ? (
                            <View>
                                <Text style={Styles.boldTheme}>{strings.recur}</Text>
                                <Text style={Styles.des}>
                                    {this.state.event.recurrence} Times
                </Text>
                            </View>
                        ) : null}

                        {this.state.event.user_type == 1 ? (
                            this.state.event.cost ? (
                                <View>
                                    <Text style={Styles.boldTheme}>{strings.price}</Text>
                                    <Text style={Styles.des}>${this.state.event.cost}</Text>
                                </View>
                            ) : (
                                    <View>
                                        <Text style={Styles.boldTheme}>{strings.price}</Text>
                                        <Text style={Styles.des}>$0</Text>
                                    </View>
                                )
                        ) : null}

                        <View
                            style={{
                                height: 150,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}>
                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                region={{
                                    latitude: Number(this.state.event.lat),
                                    longitude: Number(this.state.event.lng),
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.0121,
                                }}>
                                <Marker
                                    coordinate={{
                                        latitude: Number(this.state.event.lat),
                                        longitude: Number(this.state.event.lng),
                                    }}
                                    image={Images.locationicon}
                                // tracksViewChanges={trackChanges}
                                // onLayout={(event)=>{
                                //     const {x, y, width, height} = event.nativeEvent.layout;
                                //     if(height>0) {
                                //         trackChanges=false
                                //     }
                                // }}
                                // onPress={()=>this.setState({markerSelected:index})}
                                />
                            </MapView>
                        </View>
                        {this.props.navigation.state.params.request &&
                            !this.state.reqsted ? (
                                <Button label={strings.join} bold onPress={this.Participant} />
                            ) : null}
                        {this.state.reqsted ? (
                            <Button label={strings.requested} bold disabled />
                        ) : null}

                        {this.props.navigation.state.params.interest ? (
                            <View>
                                <Button
                                    label="INTERESTED PARTIPANTS"
                                    onPress={() => {
                                        this.props.navigation.navigate('Participant', {
                                            config: this.state.event.id,
                                            eventName: this.state.event.name,
                                        });
                                    }}
                                />
                                <Button
                                    label="LEAVE GROUP"
                                    onPress={() => null}
                                    buttonStyle={{
                                        backgroundColor: '#FFF',
                                        borderColor: EStyleSheet.value('$theme2'),
                                        borderWidth: 1,
                                    }}
                                    color={EStyleSheet.value('$theme')}
                                />
                            </View>
                        ) : null}

                        {this.props.navigation.state.params.view ? (
                            <View>
                                <Button
                                    label="VIEW PARTICIPANTS"
                                    onPress={() => {
                                        this.props.navigation.navigate('Participant', {
                                            config: this.state.event.id,
                                            eventName: this.state.event.name,
                                        });
                                    }}
                                />

                                <Button
                                    label="LEAVE GROUP"
                                    onPress={() => null}
                                    buttonStyle={{
                                        backgroundColor: '#FFF',
                                        borderColor: EStyleSheet.value('$theme2'),
                                        borderWidth: 1,
                                    }}
                                    color={EStyleSheet.value('$theme')}
                                />
                            </View>
                        ) : null}
                    </View>
                </View>
            </Header>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventDetail);
