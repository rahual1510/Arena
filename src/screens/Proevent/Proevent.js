/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/headerLogo';
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../../util/commonStyles';
import strings from '../../util/strings';
import Styles from './PreventStyles';
import Sports from '../../components/Sports';
import Loader from '../../components/Loader';

const dp = size => EStyleSheet.value(size + 'rem');

export class Proevent extends Component {
    componentDidMount() { }
    constructor(props) {
        super(props);
        this.state = {
            view: 'areana',
            All: [],
            Areans: [],
            Pro: [],
        };
    }

    callback(err, response) {
        if (err) {
            console.log(err);
        } else {
            this.state.myEvents = response.data;
        }
    }

    render() {
        return (
            <View style={Styles.maincontainer}>
                <Header
                    title="MY EVENTS"
                    noLogo={true}
                    nomap={true}
                    noAdd={true}
                    onImageClick={() => this.props.navigation.navigate('CreateEvent')}
                    drawer>
                    <ScrollView>
                        <View style={[Styles.container1, commonStyles.shadow]}>
                            <View
                                style={{
                                    borderBottomWidth: 5,
                                    borderBottomColor:
                                        this.state.view == 'areana' ? '#99FFCC' : 'white',
                                    marginBottom: -10,
                                }}>
                                <Text
                                    onPress={() => {
                                        this.setState({ view: 'areana' });
                                    }}
                                    style={{
                                        fontSize: dp(13),
                                        color: this.state.view == 'areana' ? '#0D3447' : '#333333',
                                        fontWeight: '700',
                                        paddingBottom: 10,
                                    }}>
                                    {strings.arena} {strings.events}
                                </Text>
                            </View>

                            <View
                                style={{
                                    borderBottomWidth: 5,
                                    borderBottomColor:
                                        this.state.view == 'pro' ? '#99FFCC' : 'white',
                                    marginBottom: -10,
                                }}>
                                <Text
                                    onPress={() => {
                                        this.setState({ view: 'pro' });
                                    }}
                                    style={{
                                        fontSize: dp(13),
                                        color: this.state.view == 'pro' ? '#0D3447' : '#333333',
                                        fontWeight: '700',
                                        paddingBottom: 10,
                                    }}>
                                    {strings.pro} {strings.events}
                                </Text>
                            </View>

                            <View
                                style={{
                                    borderBottomWidth: 5,
                                    borderBottomColor:
                                        this.state.view == 'all' ? '#99FFCC' : 'white',
                                    marginBottom: -10,
                                }}>
                                <Text
                                    onPress={() => {
                                        this.setState({ view: 'all' });
                                    }}
                                    style={{
                                        fontSize: dp(13),
                                        color: this.state.view == 'all' ? '#0D3447' : '#333333',
                                        fontWeight: '700',
                                        paddingBottom: 10,
                                    }}>
                                    {' '}
                                    {strings.eventHis}
                                </Text>
                            </View>
                        </View>

                        {this.props.userEvents.length ? (
                            this.props.userEvents.map((item, index) => (
                                <Sports
                                    sportdata={item}
                                    stat
                                    eventdetails={() => {
                                        this.props.navigation.navigate('EventDetail', {
                                            evendetail: item,
                                            view: 'view',
                                        });
                                    }}
                                />
                            ))
                        ) : (
                                <View
                                    style={{
                                        marginTop: '50%',
                                        alignItems: 'center',
                                        jystifyContent: 'center',
                                    }}>
                                    <Text style={{ fontWeight: '500' }}>No Event Added Yet</Text>
                                </View>
                            )}

                        <Loader show={this.props.loading} />
                    </ScrollView>
                </Header>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    userEvents: state.profileReducer.userEvents,
    userProfile: state.profileReducer.userProfile,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Proevent);
