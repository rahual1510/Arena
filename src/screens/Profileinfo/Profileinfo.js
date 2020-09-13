/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';
import Images from '../../util/images';
import strings from '../../util/strings';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import { getUserData } from '../../Firestore/UsersCollection';


export class Profileinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: '',
            age: parseInt(new Date().getFullYear(), 10) -
                parseInt(
                    new Date(
                        this.props.navigation.state.params.Profileinfo.date_birth,
                    ).getFullYear(), 10
                ),
            info: this.props.navigation.state.params.Profileinfo,
        };
    }

    async sendMessage() {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
            let currentUserData = await getUserData(userId);
            let receiverName =
                this.state.info.first_name.toUpperCase() +
                (this.state.info.last_name
                    ? +' ' + this.state.info.last_name.toUpperCase()
                    : null);
            let data = {
                receiverName,
                recieverImage: this.state.info.image,
                receiverPersonId: String(this.state.info.id),
                senderPersonId: String(currentUserData.id),
                senderName: currentUserData.data.name,
                senderImage: currentUserData.data.image,
            };
            this.props.navigation.navigate('GroupChat', data);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#0E3648', '#397471', '#63B199']}
                    style={{ flex: 1 }}>
                    <ScrollView
                        bounces={false}
                        ref={refs => (this.scroll = refs)}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.scroll}>
                        <View style={{ flex: 1, padding: 20 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.goBack()}>
                                    <Image source={Images.leftarrow} />
                                </TouchableOpacity>

                                <Text
                                    style={{ fontWeight: '600', color: '#ffffff', fontSize: 15 }}>
                                    PROFILE
                </Text>
                                <TouchableOpacity>
                                    <Image source={Images.mapIcon} />
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '15%',
                                    marginBottom: -20,
                                }}>
                                <Image
                                    source={
                                        this.state.info.image
                                            ? { uri: this.state.info.image }
                                            : Images.dummyPic
                                    }
                                    style={styles.profilePic}
                                />

                                <Image style={styles.badge} source={Images.yellowBadge} />

                                <View style={styles.outerBox}>
                                    <Text style={styles.text}>
                                        {strings.firstName.toUpperCase()}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                        <Text style={styles.text}>
                                            {this.state.info.first_name.toUpperCase()}{' '}
                                            {this.state.info.last_name
                                                ? this.state.info.last_name.toUpperCase()
                                                : null}
                                        </Text>
                                        <Text style={styles.dulltext}>
                                            Age :{' '}
                                            {2020 -
                                                parseInt(this.state.info.date_birth.split('-')[2], 10)}
                                        </Text>
                                    </View>
                                    <Text style={styles.dulltext}>{this.state.info.gender}</Text>
                                    <Text style={styles.dulltext}>
                                        {this.state.info.miles} miles away
                  </Text>

                                    <View style={styles.innerline} />
                                    <Text style={styles.text}>{strings.about}</Text>

                                    <Text style={styles.dulltext}>{this.state.info.about}</Text>

                                    <Text style={styles.text}>
                                        {strings.favSports.toUpperCase()}
                                    </Text>
                                    {this.state.info.sportsData.length
                                        ? this.state.info.sportsData.map((item, index) => (
                                            <View key={`sport${index}`}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                    }}>
                                                    <Text style={styles.text}>{item.name}</Text>
                                                    <Text style={styles.level}>{item.levelname}</Text>
                                                </View>

                                                <View style={styles.innerline} />
                                            </View>
                                        ))
                                        : null}

                                    <Text
                                        style={{ fontWeight: '600', color: '#ffffff', fontSize: 16 }}>
                                        {strings.moreInfo}
                                    </Text>
                                    <Text style={styles.dulltext}>
                                        {this.state.info.ability_info}
                                    </Text>
                                </View>
                            </View>
                            <Button
                                label={strings.message}
                                bold
                                onPress={() => this.sendMessage()}
                            />
                        </View>
                    </ScrollView>
                </LinearGradient>
            </View>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const styles = EStyleSheet.create({
    scroll: {
        flexGrow: 1,
        width: '100%',
        paddingBottom: '50rem',
    },
    profilePic: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '$theme2',
        marginHorizontal: '20rem',
        height: '100rem',
        width: '100rem',
        resizeMode: 'cover',
        marginBottom: 30,
    },
    badge: {
        marginLeft: '100rem',
        marginTop: '-30rem',
        marginBottom: '30rem',
    },
    text: {
        fontWeight: '500',
        color: '#ffffff',
        fontSize: 15,
    },
    dulltext: {
        fontWeight: '500',
        color: '#ffffff',
        fontSize: 12,
        marginBottom: 10,
    },
    outerBox: {
        flex: 1,
        borderWidth: 1.5,
        borderRadius: 6,
        borderColor: '#99FFCC',
        width: '90%',
        padding: 5,
    },
    innerline: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.8,
        borderColor: '#99FFCC',
        width: '100%',
        marginBottom: 10,
        marginTop: 10,
    },
    level: {
        color: '#99FFCC',
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Profileinfo);
