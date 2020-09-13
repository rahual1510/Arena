/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/headerLogo';
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../../util/commonStyles';
import Styles from './ProfileStyles';
import Images from '../../util/images';
import strings from '../../util/strings';
import { StackActions, NavigationActions } from 'react-navigation';
const dp = size => EStyleSheet.value(size + 'rem');

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: '',
        };
        StackActions.reset({
            index: 0,
        });
    }

    render() {
        const {
            image,
            first_name,
            last_name,
            gender,
            location,
            date_birth,
            ability_info,
            about,
            user_type,
        } = this.props.userProfile;
        // if (date_birth) {
        //     this.state.age = 2020 - parseInt(new Date(date_birth).getFullYear());
        // }
        return (
            <Header
                title="Profile"
                image={
                    this.props.userProfile
                        ? { uri: this.props.userProfile.image }
                        : Images.dummyPic
                }
                icon={Images.edit}
                onImagePress={() => this.props.navigation.navigate('EditProfile')}
                drawer>
                <View style={[Styles.container, commonStyles.shadow]}>
                    <Text style={Styles.heading}>{strings.basicInfo}</Text>

                    <View style={Styles.details}>
                        <Text style={Styles.boldTheme}>
                            {first_name} {last_name}
                        </Text>
                        <Text style={Styles.valueText}>
                            {strings.age}: {2020 - parseInt(date_birth.split('-')[2], 10)}
                        </Text>
                    </View>
                    {user_type ? (
                        <Text style={{ color: '#000', fontSize: dp(12) }}>
                            {gender == 0 ? 'Individual' : 'Company'}
                        </Text>
                    ) : (
                            <Text style={{ color: '#000', fontSize: dp(12) }}>
                                {gender == 0 ? 'Male' : gender == 1 ? 'Female' : 'Other'}
                            </Text>
                        )}

                    <Text style={Styles.boldTheme}>{strings.address}</Text>

                    <Text style={{ color: '#000', fontSize: dp(12) }}>{location}</Text>

                    <Text style={Styles.boldTheme}>{strings.about_me}</Text>
                    {about != 'undefined' ? (
                        <Text style={{ color: '#000', fontSize: dp(12), marginBottom: 8 }}>
                            {about}
                        </Text>
                    ) : null}

                    <View style={commonStyles.seperator} />

                    <Text
                        style={{
                            marginTop: dp(10),
                            fontWeight: '500',
                            color: '#000',
                            fontSize: dp(15),
                        }}>
                        {strings.sportsDetails}
                    </Text>
                    {this.props.userProfile.sports
                        ? this.props.userProfile.sports.length > 0
                            ? this.props.userProfile.sports.map((value, index) => (
                                <View key={`sport${index}`}>
                                    <View style={Styles.details}>
                                        <Text style={Styles.boldTheme}>
                                            {value.name.toUpperCase()}
                                        </Text>
                                        <Text style={Styles.valueText}>{value.level_name}</Text>
                                    </View>
                                    <View
                                        style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#D8D8D8',
                                        }}
                                    />
                                </View>
                            ))
                            : null
                        : null}
                    <Text style={Styles.boldTheme}>{strings.moreInfo}</Text>
                    {ability_info != 'undefined' ? (
                        <Text style={{ color: '#000', fontSize: dp(12) }}>
                            {ability_info}
                        </Text>
                    ) : null}
                </View>
            </Header>
        );
    }
}

const mapStateToProps = state => ({
    userProfile: state.profileReducer.userProfile,
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Profile);
