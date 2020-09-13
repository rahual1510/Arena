/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/headerLogo';
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../../util/commonStyles';
import strings from '../../util/strings';
import Styles from './ViewEventsStyle';
import Sports from '../../components/Sports';
import MapEventMarker from '../../components/MapEventMarker';
const dp = size => EStyleSheet.value(size + 'rem');

export class ViewEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'all',
            All: [],
            Areans: [],
            filterAreana: [],
            Pro: [],
            filterPro: [],
            sval: '',
        };
        if (this.props.navigation.state.params && this.props.navigation.state.params.events) {
            this.state.All = this.props.navigation.state.params.events;
            if (this.state.All.length > 0) {
                for (let i in this.state.All) {
                    if (this.state.All[i].user_type == 1) {
                        this.state.Pro.push(this.state.All[i]);
                        this.state.filterPro.push(this.state.All[i]);
                    } else {
                        this.state.Areans.push(this.state.All[i]);
                        this.state.filterAreana.push(this.state.All[i]);
                    }
                }
            }
            console.log(this.state.Pro);
        } else {
            this.state.All = this.props.allEvents;
            for (let i in this.props.allEvents) {
                if (this.props.allEvents[i].user_type == 1) {
                    this.state.Pro.push(this.props.allEvents[i]);
                    this.state.filterPro.push(this.props.allEvents[i]);
                } else {
                    this.state.Areans.push(this.props.allEvents[i]);
                    this.state.filterAreana.push(this.props.allEvents[i]);
                }
            }
        }
    }

    render() {
        return (
            <Header
                title="VIEW EVENTS"
                noLogo={true}
                nomap={true}
                filter={true}
                onPressFilter={() => this.props.navigation.navigate('Filter')}
                back={true}
                onMapPress={() => this.props.navigation.navigate('Mapview', { events: this.props.allEvents })}
                onBackPress={() => this.props.navigation.goBack()}
                search
                placeholderText={'Search'}
                fnc={sval => this.filter(sval)}
            >
                <View style={Styles.maincontainer}>
                    <View style={[Styles.container1, commonStyles.shadow]}>
                        <View
                            style={{
                                borderBottomWidth: 5,
                                borderBottomColor: this.state.view == 'all' ? '#99FFCC' : 'white',
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
                                {strings.all} {strings.events}
                            </Text>
                        </View>

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
                    </View>
                    {this.state.view == 'all' ? (
                        this.state.All.length ? (
                            this.state.All.map((item, index) => (
                                <Sports
                                    sportdata={item}
                                    eventdetails={() => {
                                        this.props.navigation.navigate('EventDetail', {
                                            evendetail: item,
                                            request: 'request',
                                        });
                                    }}
                                />
                            ))
                        ) : (
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '50%',
                                    }}>
                                    <Text style={{ fontWeight: '700' }}>No Event Found</Text>
                                </View>
                            )
                    ) : this.state.view == 'areana' ? (
                        this.state.Areans.length ? (
                            this.state.Areans.map((item, index) => (
                                <Sports
                                    sportdata={item}
                                    eventdetails={() => {
                                        this.props.navigation.navigate('EventDetail', {
                                            evendetail: item,
                                            request: 'request',
                                        });
                                    }}
                                />
                            ))
                        ) : (
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '50%',
                                    }}>
                                    <Text style={{ fontWeight: '700' }}>No Event Found</Text>
                                </View>
                            )
                    ) : this.state.view == 'pro' ? (
                        this.state.Pro.length ? (
                            this.state.Pro.map((item, index) => (
                                <Sports
                                    sportdata={item}
                                    eventdetails={() => {
                                        this.props.navigation.navigate('EventDetail', {
                                            evendetail: item,
                                            request: 'request',
                                        });
                                    }}
                                />
                            ))
                        ) : (
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '50%',
                                    }}>
                                    <Text style={{ fontWeight: '700' }}>No Event Found</Text>
                                </View>
                            )
                    ) : null}
                </View>
            </Header>
        );
    }
    filter(val) {
        val = val.trim().toLowerCase();
        if (this.state.view == 'all') {
            this.state.All = this.props.allEvents;
            this.state.All = this.state.All.filter(l => {
                if (l.name.toLowerCase().match(val)) {
                    console.log(l);
                    return l;
                }
            });
            this.setState({
                All: this.state.All,
            });
        } else if (this.state.view == 'areana') {
            this.state.Areans = this.state.filterAreana;
            this.state.Areans = this.state.Areans.filter(l => {
                if (l.name.toLowerCase().match(val)) {
                    return l;
                }
            });
            this.setState({
                Areans: this.state.Areans,
            });
        } else {
            this.state.Pro = this.state.filterPro;
            this.state.Pro = this.state.Pro.filter(l => {
                if (l.name.toLowerCase().match(val)) {
                    return l;
                }
            });
            this.setState({
                Pro: this.state.Pro,
            });
        }
    }
}

const mapStateToProps = state => ({
    allEvents: state.resourcesReducer.allEvents,
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ViewEvents);
