import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import Styles from './CreateEventStyle';
import strings from '../../util/strings';
import Images from '../../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Picker from '../../components/Picker';
import RadioButtons from '../../components/RadioButtons';
import ImagePick from '../../components/ImagePick';
import DatePick from '../../components/DatePick';
import TimePick from '../../components//TimePick';
import RangeSlider from 'rn-range-slider';
import types from '../../types';
import * as Validations from '../../util/Validations';
import countryList from '../../util/countrycodes';
import Loader from '../../components/Loader';
import moment from "moment";
import LinearGradient from 'react-native-linear-gradient';
import { thisExpression } from '@babel/types';
import DatePicker from 'react-native-datepicker'
dp = (size) => EStyleSheet.value(size + 'rem')
let sport = { id: -1, level: -1 }
export class CreateEvent extends Component {

    navigate(type) {

        this.props.navigation.navigate('Info', { type: type == 0 ? 'terms' : type == 1 ? 'privacy' : 'creation' })
    }


    constructor(props) {
        super(props)
        this.state = {
            name: '',
            lat: '',
            lng: '',
            sport_id: '',
            level: '',
            total_participants: '',
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: '',
            gender: undefined,
            age_range: '',
            user_type: '',
            image: '',
            picChange: false,
            cost: 0,
            recurrence: 0,
            sport_value: '',
            sports: [
                { id: -1, level: -1 }
            ],
            sportValues: [-1],
            abilityInfo: '',
            termsCheck: false,
            usertype: '',
            age_range: '',
            location: '',
            low: 18,
            high: 100,
            recur: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            show: ''
        }
        this.state.user_type = this.props.userProfile.user_type
        if (this.props.userProfile.user_type == 1) {
            this.state.usertype = true
        }
        this.state.age_range = this.state.low + '-' + this.state.high
    }

    componentDidMount() {
        const { sports } = this.props.userProfile
        let values = []
        if (this.props.userProfile.length > 0) {
            sports.map(item => {
                let x = this.props.categories.findIndex(obj => obj.id != item.id)
                values.push(x)
            })
        }
        if (this.props.navigation.state.params) {
            console.log(this.props.navigation.state.params.data)
            this.getdata();
            console.log(this.state.sportValues)
        }

    }
    getdata = () => {
        const { name, lat, lng, sports, level, total_participants, start_date, end_date, start_time, end_time, gender, age_range, image, cost, recurrence, user_type, location } = this.props.navigation.state.params.data
        console.log(total_participants)
        if (gender == "male") {
            this.setState({
                gender: 0,
            })
        } else if (gender == "female") {
            this.setState({
                gender: 1,
            })
        } else if (gender == "Other") {
            this.setState({
                gender: 2,
            })
        } else {
            this.setState({
                gender: 3,
            })
        }
        if (level == "Beginner") {
            this.state.sports[0].level = 0
        } else if (level == "Intermediate") {
            this.state.sports[0].level = 1
        } else if (level == "Advanced") {
            this.state.sports[0].level = 2
        } else {
            this.state.sports[0].level = 3
        }
        this.setState({
            user_type: user_type,
            name: name,
            lat: lat,
            lng: lng,
            sport_id: sports[0].id,
            level: level,
            total_participants: total_participants.toString(),
            start_date: start_date,
            end_date: end_date,
            start_time: start_time,
            end_time: end_time,

            age_range: age_range,
            image: image,
            cost: cost,
            recurrence: recurrence,
            location: location,
            low: age_range.split('-')[0],
            high: age_range.split('-')[1],
        })
        this.state.sportValues = []
        sports.map(item => {
            for (let i in this.props.categories) {
                if (this.props.categories[i].id == item.id) {
                    this.state.sportValues.push(i)
                }
            }
        })
        console.log(this.state.sportValues)
    }




    onSportChange1(index, name, value) {
        this.state.level = value
        this.setState((prevState) => ({
            sports: prevState.sports.map((item, i) => {
                if (index == i) {
                    return {
                        ...item,
                        [name]: value
                    }
                }
                return item
            })
        }))
    }

    onSportChange(index, name, value) {
        this.state.sport_id = value
    }
    callback = (err, response) => {
        if (err) {
            alert(response)
        } else if (response) {
            //    this.state.show = true

        }
        this.setState({ show: true });
    }
    async signup() {
        const { name, lat, lng, sport_id, level, total_participants, start_date, end_date, start_time, end_time, gender, age_range, image, cost, recurrence, termsCheck, user_type, location } = this.state

        if (termsCheck == true) {

            // const diffTime = Math.abs(new Date(end_date.split(' ')[1].replace(/-/g, '/')) - new Date(start_date.split(' ')[1].replace(/-/g, '/')));
            // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // var s, e, status
            // if (diffDays == 0) {
            //     if (start_time.split(' ')[1] == 'PM') {
            //         s = parseInt(start_time.split(':')[0]) + 12
            //     }
            //     else {
            //         s = start_time.split(':')[0]
            //     }
            //     if (end_time.split(' ')[1] == 'PM') {
            //         e = parseInt(end_time.split(':')[0]) + 12
            //     }
            //     else {
            //         e = end_time.split(':')[0]
            //     }
            //     if (e > s) {
            //         status = true
            //     }
            //     else if (e == s) {
            //         if (parseInt(end_time.split(':')[1].split(' ')[0]) > parseInt(start_time.split(':')[1].split(' ')[0])) {
            //             status = true
            //         }
            //     }
            // }
            if (!name || !total_participants || !start_date || !end_date || !start_time || !end_time || !age_range || !location) {
                if (!name) {
                    alert('Please fill event name field')
                }
                else if (!total_participants) {
                    alert('Please fill number of participants')
                }
                else if (!start_date) {
                    alert('Please fill start_date field')
                }
                else if (!end_date) {
                    alert('Please fill end_date field')
                }
                else if (!start_time) {
                    alert('Please fill start_time field')
                }
                else if (!end_time) {
                    alert('Please fill end_time field')
                }
                else if (!age_range) {
                    alert('Please select age range')
                }
                else if (!location) {
                    alert('Please fill address field')
                }
                // alert(strings.fillFields)
            }
            else if (!Validations.isMinLength(total_participants, 1)) {
                alert(strings.validInput)
            }
            else {

                var pars = {
                    user_type: user_type,
                    name: name,
                    lat: lat,
                    lng: lng,
                    sport_id: sport_id,
                    level: level,
                    total_participants: total_participants,
                    start_date: start_date,
                    end_date: end_date,
                    start_time: start_time,
                    end_time: end_time,
                    gender: gender,
                    age_range: age_range,
                    image: image,
                    cost: parseInt(cost),
                    recurrence: recurrence,
                    location: location
                }
                console.log(pars)
                this.props.createEvent(pars, this.props.navigation, this.callback)
            }
        }
        else {
            alert('Please accept Group Creation Policy')
        }

    }

    async update() {
        const { name, lat, lng, sports, level, total_participants, start_date, end_date, start_time, end_time, gender, age_range, image, cost, recurrence, user_type, location, userid, id } = this.props.navigation.state.params.data
        var gender1
        var level1
        if (gender == "male") {
            gender1 = 0;
        } else if (gender == "female") {
            gender1 = 1;
        } else if (gender == "other") {
            gender1 = 2;
        } else {
            gender1 = 3;
        }

        if (level == "Beginner") {
            level1 = 0;
        } else if (level == "Intermediate") {
            level1 = 1;
        } else if (level == "Advanced") {
            level1 = 2;
        } else {
            level1 = 3;
        }

        if (this.state.termsCheck == true) {
            var pars = {
                user_type: user_type,
                name: name,
                lat: lat,
                lng: lng,
                sport_id: sports[0].id,
                level: level1,
                total_participants: total_participants,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
                gender: gender1,
                age_range: age_range,
                cost: cost,
                recurrence: this.state.recurrence,
                location: location,
                userid: userid,
                id: id
            }
            console.log(pars)
            this.props.updateEvent(pars, this.props.navigation)
        }
        else {
            alert('Please accept Group Creation Policy')
        }

    }


    render() {
        const { gender, sports, sportValues, termsCheck } = this.state
        const { categories } = this.props
        if (categories.length > 0) {
            this.setState.slected_sport = categories[0].name
        }

        return (
            <Header title={this.props.navigation.state.params ? 'EDIT EVENT(DATE AND TIME)' : 'CREATE EVENT'} search back goBack={() => this.props.navigation.goBack()} >
                <View style={Styles.maincontainer}>
                    <View style={Styles.innercontainer}>
                        {
                            this.state.image ?
                                <Image source={{ uri: this.state.image }} style={{ width: '100%', height: '30%', resizeMode: 'cover' }} />
                                :
                                <TouchableOpacity style={{ height: '25%' }} onPress={() => this.imagePicker.showPicker()}>
                                    <Text style={Styles.heading}>{strings.featureimage}</Text>
                                    <View style={{ height: '75%', borderWidth: 1, borderColor: '#99FFCC', marginTop: 15, marginBottom: dp(15), backgroundColor: '#EEEEEE' }}>
                                        {
                                            !this.props.navigation.state.params ?
                                                <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', top: 45 }} onPress={() => this.imagePicker.showPicker()} >
                                                    <Image source={Images.upload_icon} />
                                                </TouchableOpacity>
                                                : null
                                        }


                                    </View>
                                </TouchableOpacity>

                        }

                        <View style={{ marginTop: dp(15) }}>
                            <Text style={Styles.label} >{strings.eventname}</Text>
                        </View>

                        <Input
                            value={this.state.name}
                            fnc={(name) => this.setState({ name })}
                            prefix=''
                            label=''
                            edit={this.props.navigation.state.params ? false : true}
                        />

                        <Text style={Styles.label} >{strings.eventlocation}</Text>
                        {/* <Input
                            value={this.state.location}
                            fnc={(location) => this.setState({ location })}
                            prefix=''
                            label=''
                            showLabel=''
                            edit={this.props.navigation.state.params? false : true}
                        /> */}

                        <Input
                            value={this.state.location}
                            fnc={(location) => this.setState({ location })}
                            fnc1={(loc) => {
                                this.setState({ location: loc.description })
                            }}
                            fnc1={(loc) => {
                                this.setState({ location: loc.description })
                            }}
                            label={strings.location}
                            prefix=''
                            comp
                            showLabel=''
                            multiline
                            location
                            loc
                            edit={this.props.navigation.state.params ? false : true}
                            getLocation={(location, city, country, zip, lat, lng) => {
                                let i = countryList.findIndex(obj => obj.name == country)

                                this.setState({
                                    location,
                                    city,
                                    zip,
                                    country: i != -1 ? i : 0,
                                    lat,
                                    lng
                                })

                            }}
                            getLocation1={(location, city, country, zip, lat, lng) => {
                                let i = countryList.findIndex(obj => obj.name == country)

                                this.setState({
                                    location,
                                    city,
                                    zip,
                                    country: i != -1 ? i : 0,
                                    lat,
                                    lng
                                })
                            }}
                        />


                        <View >
                            <Text style={Styles.label} >{strings.selectsport}
                            </Text>
                            {
                                sports.map((item, index) => {
                                    return (
                                        <View key={`sport${index}`} style={{ marginTop: dp(15) }} >

                                            <Picker
                                                list={categories}
                                                fnc={(sport) => {
                                                    let arr = sportValues
                                                    arr[index] = sport
                                                    this.setState({ sportValues: [] })
                                                    this.setState({ sportValues: arr })

                                                    this.onSportChange(index, 'id', categories[sport].id)
                                                }}
                                                value={sportValues[index]}
                                                placeholder={strings.sports}
                                                sport
                                                disabled={this.props.navigation.state.params ? true : false}

                                            />

                                            <RadioButtons
                                                options={[strings.beginner, strings.intermediate, strings.advanced, strings.all]}
                                                label={strings.abilityLevel}
                                                row
                                                onChange={(level) => this.onSportChange1(index, 'level', level)}
                                                value={sports[index].level}
                                                disabled={this.props.navigation.state.params ? true : false}
                                            />
                                        </View>
                                    )
                                })
                            }
                        </View>

                        <Text style={Styles.label} >{strings.max_part}</Text>
                        <Input
                            value={this.state.total_participants}
                            fnc={(total_participants) => this.setState({ total_participants })}
                            prefix=''
                            label=''
                            num={true}
                            edit={this.props.navigation.state.params ? false : true}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '45%', }}>
                                <Text style={Styles.label} >START DATE</Text>
                                <DatePick
                                    value={this.state.start_date}
                                    onSelect={(start_date) => {
                                        this.setState({ start_date: start_date })
                                    }}
                                    ref={refs => this.start_datePicker = refs}
                                    label=''
                                    min={new Date()}
                                />
                                  </View>
                            <View style={{ width: '45%', }}>
                                <Text style={Styles.label} >END DATE</Text>
                                <DatePick
                                    value={this.state.end_date}
                                    onSelect={(end_date) => {
                                        this.setState({ end_date: end_date })
                                    }}
                                    ref={refs => this.end_datePicker = refs}
                                    label=''
                                    min={new Date()}
                                    customStyles={{
                                      dateIcon: {
                                        marginLeft: 0,
                                        iconColor : 'red'
                                      },
                                     
                                    }}
                                />
                            </View>
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '45%', }}>
                                <Text style={Styles.label} >START TIME</Text>
                                <TimePick
                                    value={this.state.start_time}
                                    onSelect={(start_time) => {
                                        this.setState({ start_time: start_time })
                                    }}
                                    ref={refs => this.start_timePicker = refs}
                                    label=''
                                    min={new Date()}
                                />
                            </View>
                            <View style={{ width: '45%', }}>
                                <Text style={Styles.label} >END TIME</Text>
                                <TimePick
                                    value={this.state.end_time}
                                    onSelect={(end_time) => this.setState({ end_time: end_time })}
                                    ref={refs => this.end_timePicker = refs}
                                    label=''
                                />
                            </View>
                        </View>
                        {
                            this.state.usertype ?
                                <View>
                                    <Text style={{ fontSize: dp(13), color: '#0D3447', fontWeight: '500', marginBottom: dp(10) }} >{strings.recur.toUpperCase()}</Text>
                                    <Picker
                                        fnc={(recurrence) => {
                                            console.log(recurrence)
                                            this.setState({ recurrence })
                                        }}
                                        value={this.state.recurrence}
                                        list={this.state.recur}
                                    // disabled={this.props.navigation.state.params? true : false}
                                    />
                                    {/* <Input
                                        value={this.state.recurrence}
                                        fnc={(recurrence) => this.setState({ recurrence })}
                                        prefix=''
                                        label=''
                                    /> */}
                                </View>
                                : null
                        }
                        {
                            this.state.user_type ?
                                <View>
                                    <Text style={Styles.label} >{strings.cost_event}</Text>
                                    <View style={{flexDirection:'row',alignItems:'center',height:40, marginTop:dp(5)}}>
                                    <Text style={{fontSize:15,marginTop:dp(-7), marginRight:dp(8)}}>$</Text>
                                    <Input
                                        value={this.state.cost}
                                        fnc={(cost) => this.setState({ cost })}
                                        prefix=''
                                        label=''
                                        num
                                        edit={this.props.navigation.state.params ? false : true}
                                    />
                                    </View>
                                </View> : null

               

                        }

                        <View style={{ marginTop: dp(15) }} >

                            <RadioButtons
                                options={[strings.male, strings.female, strings.others, 'All']}
                                row
                                label={strings.Gendr}
                                value={gender}
                                onChange={(gender) => this.setState({ gender })}
                                disabled={this.props.navigation.state.params ? true : false}
                            />
                        </View>
                        <View style={{marginTop: dp(5)}}>
                            <Text style={[Styles.label, {top:20, fontWeight:'bold'}]} >{strings.range}</Text>
                            <RangeSlider
                                style={{ width: '90%', height: 60, }}
                                gravity={'top'}
                                min={18}
                                max={100}
                                step={1}
                                selectionColor="#114D54"
                                blankColor="#D8D8D8"
                                labelTextColor="#ffffff"
                                labelBackgroundColor="#114D54"
                                labelBorderColor="#114D54"
                                onValueChanged={(low, high, fromUser) => {
                                    this.setState({ low: low })
                                    this.setState({ high: high })
                                    this.state.age_range = low + '-' + high
                                }}
                                disabled={this.props.navigation.state.params ? true : false} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                                <Text style={{ color: '#0D3447', }}>{this.state.low}</Text>
                                <Text style={{ color: '#0D3447', }}>{this.state.high}</Text>
                            </View>
                        </View>

                        <View style={Styles.termsView}>

                            <TouchableOpacity onPress={() => this.setState({ termsCheck: !termsCheck })} >
                                <Image source={termsCheck ? Images.check : Images.uncheck} style={{ marginRight: dp(15) }} />
                            </TouchableOpacity>

                            <Text>{strings.termsAgree}
                                <Text style={Styles.links} onPress={() => this.navigate(2)}  >{strings.group_creation}</Text>
                            </Text>

                        </View>
                        {
                            this.props.navigation.state.params ?
                                <Button label={strings.update} onPress={() => this.update()} />
                                :
                                <Button label={strings.submit} onPress={() => this.signup()} />
                        }




                    </View>
                </View>
                <ImagePick
                    ref={refs => this.imagePicker = refs}
                    onSelectImage={(image) => {
                        this.setState({
                            picChange: true,
                            image: image.toString()
                        })
                    }}
                />
                <Loader show={this.props.loading} />


                <Modal
                    visible={this.state.show}
                    transparent={true}
                    animated
                    animationType='fade'
                >
                    <TouchableOpacity style={{ height: '100%', widht: '90%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }} activeOpacity={1} onPressOut={() => {
                        this.setState({ show: false })
                        this.props.navigation.goBack()
                    }}
                    >
                        <View style={{ borderWidth: 0.1, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, width: '90%', alignItems: 'center' }}>

                            <LinearGradient colors={['#63B199', '#397471', '#0E3648']} start={{ x: 0.1, y: 0 }} style={{
                                width: '100%',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: dp(15)
                            }} >
                                <Text style={{ fontWeight: '700', fontSize: dp(14), color: 'white' }}>CONFIRMATION</Text>

                            </LinearGradient>
                            <View style={{ width: '100%', backgroundColor: 'white', padding: dp(30) }}>
                                <Text style={{ textAlign: 'center', paddingVertical: dp(10), fontSize: dp(13) }}>Your event is under review please wait
for the admin’s approval.</Text>
                            </View>
                        </View>


                    </TouchableOpacity>
                </Modal>

            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
    userProfile: state.profileReducer.userProfile,
    categories: state.resourcesReducer.categories,
    loading: state.profileReducer.loading,
})

const mapDispatchToProps = (dispatch) => ({
    createEvent: (pars, navigation, cb) => dispatch({
        type: types.CREATE_EVENT_START,
        params: pars,
        navigation: navigation,
        callback: cb
    }),
    updateEvent: (pars, navigation, ) => dispatch({
        type: types.UPDATE_EVENT_START,
        params: pars,
        navigation: navigation,
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)
