/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from '../../components/headerLogo';
import Input from '../../components/Input';
import Picker from '../../components/Picker';
import ImagePick from '../../components/ImagePick';
import Button from '../../components/Button';
import countryList from '../../util/countrycodes';
import RadioButtons from '../../components/RadioButtons';
import strings from '../../util/strings';
import Styles from './SignUpStyles';
import Images from '../../util/images';
import * as Validations from '../../util/Validations';
import DatePick from '../../components/DatePick';
import Loader from '../../components/Loader';
import types from '../../types';
import messaging from '@react-native-firebase/messaging';

const dp = (size) => EStyleSheet.value(size + 'rem');
const key = 'AIzaSyBWQ6tsitoNAWbg8p8BolWGGi41JIalv2Q';
class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            userType: 0,
            gender: undefined,
            dob: '',
            location: '',
            country: +231,
            city: '',
            zip: '',
            page: 0,
            email: '',
            pass: '',
            cPass: '',
            phone: '',
            termsCheck: false,
            profilePic: '',
            picChange: false,
            lat: '',
            lng: '',
        };
    }

    callback(err, response) {
        if (err) {
            alert(response);
        } else {
            console.log(response);

        }
    }

    async signup() {

        const fcmToken = await messaging().getToken();

        const { userType, fName, lName, gender, phone, dob, location, country, city, zip, email, pass, cPass, profilePic, lat, lng, termsCheck } = this.state;

        var pars = {
            user_type: userType,
            first_name: fName,
            last_name: lName,
            gender,
            date_birth: dob,
            location,
            country: countryList[country].name,
            city,
            zipcode: zip,
            image: profilePic,
            email,
            phone: countryList[country].dial_code + phone,
            password: pass,
            c_password: cPass,
            lat,
            lng,
            firebase_id: fcmToken,
        };
        console.log(pars);

        if (!fName || !email || !pass || !cPass || !zip || !country || !city || !dob) {
            if (!fName) {
                alert('Please fill name field');
            }
            else if (!email) {
                alert('Please fill email field');
            }
            else if (!pass) {
                alert('Please fill password field');
            }
            else if (!cPass) {
                alert('Please fill confirm password field');
            }
            else if (!zip) {
                alert('Please fill zipcode field');
            }
            else if (!country) {
                alert('Please fill country field');
            }
            else if (!city) {
                alert('Please fill city field');
            }
            else if (!dob) {
                alert('Please fill date of birth field');
            }

            // alert(strings.fillFields)
        } else if (gender == undefined || userType == undefined) {

            if (gender == undefined) {
                alert('Please select gender');
            }
            else if (userType == undefined) {
                alert('Please select type of user');
            }
            // alert(strings.fillFields)
        } else if (!Validations.validateEmail(email)) {
            alert(strings.validEmail);
        } else if (!Validations.isMinLength(pass, 6)) {
            alert(strings.validPassword);
        } else if (pass != cPass) {
            alert(strings.passwordMatch);
        } else if (!termsCheck) {
            alert(strings.termsCheck);
        } else if (!Validations.isMinLength(zip, 4)) {
            alert(strings.validPostal);
        } else {
            this.props.register(pars, this.callback);
        }


    }

    render() {

        const { termsCheck, page, picChange, profilePic, gender, userType, dob } = this.state;

        const { navigate } = this.props.navigation;


        return (
            <Header
                header
                image={picChange ? { uri: profilePic } : Images.dummyPic}
                title={strings.signUp}
                back
                icon={Images.camera}
                onBackPress={() => {
                    if (page) { this.setState({ page: 0 }); }
                    else { this.props.navigation.goBack(); }
                }}
                onImagePress={() => {
                    this.imagePicker.showPicker();
                }}
            >

                <Text style={Styles.heading} >({page ? 'Account Details' : 'Basic Info'})</Text>

                {page == 0 ?
                    <View>

                        <RadioButtons
                            options={['Standard', 'Pro']}
                            row
                            label="USER TYPE"
                            value={userType}
                            onChange={(userType) => this.setState({ userType })}
                        />
                        {
                            this.state.userType ?
                                <Input
                                    value={this.state.fName}
                                    fnc={(fName) => this.setState({ fName })}
                                    label={strings.firstName}
                                    prefix=""
                                />
                                :
                                <View>
                                    <Input
                                        value={this.state.fName}
                                        fnc={(fName) => this.setState({ fName })}
                                        label={strings.name}
                                        prefix=""
                                    />

                                    <Input
                                        value={this.state.lName}
                                        fnc={(lName) => this.setState({ lName })}
                                        label={strings.lastName}
                                        prefix=""
                                    />
                                </View>
                        }

                        {
                            this.state.userType ?
                                <RadioButtons
                                    options={[strings.individual, strings.company]}
                                    row
                                    label={strings.gender}
                                    value={gender}
                                    onChange={(gender) => this.setState({ gender })}
                                />
                                :
                                <RadioButtons
                                    options={[strings.male, strings.female, strings.others]}
                                    row
                                    label={strings.gender}
                                    value={gender}
                                    onChange={(gender) => this.setState({ gender })}
                                />

                        }

                        {/* <RadioButtons
                    options={[strings.male, strings.female, strings.others]}
                    row
                    label={strings.gender}
                    value={gender}
                    onChange={(gender)=>this.setState({gender})}
                /> */}

                        <DatePick
                            value={dob}
                            onSelect={(dob) => this.setState({ dob })}
                            ref={refs => this.dobPicker = refs}
                            label={strings.dob}
                            max={new Date()}
                        />

                        <Text style={Styles.label} >{'Address'}</Text>

                        <Input
                            value={this.state.location}
                            fnc={(location) => this.setState({ location })}
                            fnc1={(loc) => {
                                this.setState({ location: loc.description });
                            }}
                            label={strings.location}
                            prefix=""
                            comp
                            multiline
                            location
                            loc
                            getLocation={(location, city, country, zip, lat, lng) => {
                                let i = countryList.findIndex(obj => obj.name == country);

                                this.setState({
                                    location,
                                    city,
                                    zip,
                                    country: i != -1 ? i : 0,
                                    lat,
                                    lng,
                                });

                            }}
                            getLocation1={(location, city, country, zip, lat, lng) => {
                                let i = countryList.findIndex(obj => obj.name == country);

                                this.setState({
                                    location,
                                    city,
                                    zip,
                                    country: i != -1 ? i : 0,
                                    lat,
                                    lng,
                                });
                            }}
                        />

                        <Picker
                            fnc={(country) => this.setState({ country })}
                            value={this.state.country}
                            country
                        />

                        <Input
                            value={this.state.city}
                            fnc={(city) => this.setState({ city })}
                            label={strings.city}
                            prefix=""
                        />

                        <Input
                            value={this.state.zip}
                            fnc={(zip) => this.setState({ zip })}
                            label={strings.zip}
                            prefix=""
                        />

                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: dp(15) }} onPress={() => this.setState({ page: 1 })} >
                            <Image source={Images.rightArrowButton} />
                        </TouchableOpacity>

                        {/* <Button label='' Style={{height:dp(40), width:dp(40), borderRadius:dp(25), paddingVertical: null, alignSelf: 'flex-end'}} icon={Images.leftarrow} /> */}

                    </View>
                    :
                    <View>
                        <Input
                            value={this.state.email}
                            fnc={(email) => this.setState({ email })}
                            label={strings.email}
                            prefix=""
                        />

                        <Picker
                            fnc={(country) => this.setState({ country })}
                            value={this.state.country}
                            label={strings.mobile}
                            valueInput={this.state.phone}
                            onChange={(phone) => this.setState({ phone })}
                            phone
                        />

                        <Input
                            value={this.state.pass}
                            fnc={(pass) => this.setState({ pass })}
                            label={strings.password}
                            prefix=""
                            pass
                        />

                        <Input
                            value={this.state.cPass}
                            fnc={(cPass) => this.setState({ cPass })}
                            label={strings.confirmPassword}
                            prefix=""
                            pass
                        />

                        <View style={Styles.termsView}>

                            <TouchableOpacity onPress={() => this.setState({ termsCheck: !termsCheck })} >
                                <Image source={termsCheck ? Images.check : Images.uncheck} style={{ marginRight: dp(15) }} />
                            </TouchableOpacity>

                            <Text>{strings.termsAgree}
                                <Text style={Styles.links} onPress={() => navigate('Info', { type: 'terms' })} >{strings.terms.toUpperCase()}</Text>
                                {' and '}
                                <Text style={Styles.links} onPress={() => navigate('Info', { type: 'privacy' })}  >{strings.privacy.toUpperCase()}</Text>
                            </Text>

                        </View>

                        <Button label={strings.signUp} onPress={() => this.signup()} />

                        <Text style={Styles.newUser} >{strings.alreadyUser}<Text onPress={() => navigate('Login')} style={Styles.signupText} >{strings.signIn}</Text></Text>

                    </View>

                }

                <ImagePick
                    ref={refs => this.imagePicker = refs}
                    onSelectImage={(image) => this.setState({
                        picChange: true,
                        profilePic: image,
                    })}
                />
                <Loader show={this.props.loading} />

            </Header>
        );
    }
    async getCities(input) {
        try {
            await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${key}&input=${input}`)
                .then((res) => res.json())
                .then((response) => {
                    console.log(response);
                    this.setState({ suggestions: response.predictions });
                });
        } catch (error) {
            console.log(error);
        }
    }
    async getlat(text) {
        try {
            await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${text},+myLat+myLon&key=${key}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
                });
        }
        catch (error) {
            console.log(error);
        }
    }
}


const mapStateToProps = (state) => ({
    loading: state.authReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
    register: (pars, cb) => dispatch({
        type: types.REGISTER_START,
        params: pars,
        callback: cb,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

