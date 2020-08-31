import React, { Component } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import Button from '../../components/Button';
import EStyleSheet from 'react-native-extended-stylesheet';
import Images from '../../util/images';
import strings from '../../util/strings';
import { TouchableOpacity } from 'react-native-gesture-handler';
import commonStyles from '../../util/commonStyles';
import LinearGradient from 'react-native-linear-gradient';
import RangeSlider from 'rn-range-slider';
import { connect } from 'react-redux'
import Picker from '../../components/Picker';
import RadioButtons from '../../components/RadioButtons';


const colored = ['#63B199', '#397471', '#0E3648']
const whitecol = ['#fff', '#fff', '#fff']
export class Profileinfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            male: true,
            female: '',
            other: '',
            all: '',
            sports: [
                { id: -1, level: -1 }
            ],
            sportValues: [-1],
        }
    }


    block(data) {
        return (
            <View style={{ flexDirection: 'row',marginTop: dp(35) }}>

                <View style={styles.linewidth}></View>

                <View elevation={5} style={[styles.centerbox,]}>
                    <Text style={{ color: '#0D3447', fontWeight: '600' }}>{data}</Text>
                </View>

                <View style={styles.linewidth}></View>

            </View>
        )
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
    render() {
        const { male, female, other, all,sports,sportValues } = this.state
        const { categories } = this.props
        return (
            <View style={{ flex: 1, }}>
                <ScrollView bounces={false} ref={refs => this.scroll = refs} keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scroll} >
                    <View style={[styles.header, commonStyles.shadow]}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Text style={{ color: '#0D3447', fontWeight: '600' }}>Reset</Text>
                        </TouchableOpacity>

                        <Text style={{ fontWeight: '600', color: '#000000', fontSize: 15 }}>FILTERS</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}> 
                            <Image source={Images.cross} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                        <View style={{ width: '90%', alignItems: 'center'}}>
                            {this.block('GENDER')}
                                <View style={{  marginTop: dp(35) ,flexDirection: 'row', flexWrap: 'wrap',  justifyContent: 'space-between' }}>

                                    <LinearGradient colors={male ? colored : whitecol} start={{ x: 0.1, y: 0 }} style={[styles.gradient]} >
                                        <TouchableOpacity style={{}}
                                            onPress={() => {
                                                this.setState({
                                                    male: true,
                                                    female: false,
                                                    other: false,
                                                    all: false
                                                })
                                            }}
                                        >
                                            <Text style={{ color: male ? '#FFF' : '#0D3447', fontSize: dp(14), fontWeight: '400' }} >Male</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>

                                    <LinearGradient colors={female ? colored : whitecol} start={{ x: 0.1, y: 0 }} style={[styles.gradient]} >
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    male: false,
                                                    female: true,
                                                    other: false,
                                                    all: false
                                                })
                                            }}
                                        >
                                            <Text style={{ color: female ? '#FFF' : '#0D3447', fontSize: dp(14), fontWeight: '400' }} >Female</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>

                                    <LinearGradient colors={other ? colored : whitecol} start={{ x: 0.1, y: 0 }} style={[styles.gradient]} >
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    male: false,
                                                    female: false,
                                                    other: true,
                                                    all: false
                                                })
                                            }}
                                        >
                                            <Text style={{ color: other ? '#FFF' : '#0D3447', fontSize: dp(14), fontWeight: '400' }} >Other</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>

                                    <LinearGradient colors={all ? colored : whitecol} start={{ x: 0.1, y: 0 }} style={[styles.gradient]} >
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    male: false,
                                                    female: false,
                                                    other: false,
                                                    all: true
                                                })
                                            }}
                                        >
                                            <Text style={{ color: all ? '#FFF' : '#0D3447', fontSize: dp(14), fontWeight: '400' }} >All</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>

                                </View>

                            {this.block('AGE RANGE')}
                             <RangeSlider
                                style={{ width: '90%', height: 60, }}
                                gravity={'top'}
                                min={'18'}
                                max={'100'}
                                step={'1'}
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
                                <Text style={{ color: '#0D3447' }}>{this.state.low}</Text>
                                <Text style={{ color: '#0D3447' }}>{this.state.high}</Text>
                            </View> 
                            
                       
                        {this.block('SPORTS')}
                        <View style={{ marginTop: dp(35) }}>
                        <View >
                            <Text style={styles.label} >{strings.sport_cat}
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
                        </View>
                        {this.block('TIME RANGE')}
                           <View style={{ marginTop: dp(35) }}>
                        <View >
                            
                           
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
                                                placeholder={strings.time}
                                                sport
                                                disabled={this.props.navigation.state.params ? true : false}

                                            />
                                           
                                        </View>
                                    )
                                })
                            }
                        </View>
                        </View>

                        </View>
                        <View style={{ width: '90%' }}>
                        <Button label={strings.apply} Style={{width:'100%'}} bold onPress={() => ''} />
                    </View>
                    </View>
                  


                </ScrollView>

            </View>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Profileinfo)

const styles = EStyleSheet.create({
    scroll: {
        flexGrow: 1,
        width: '100%',
        paddingBottom: '50rem',
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        backgroundColor: '#FFF',
    },
    centerbox: {
        width: '36%',
        borderWidth: 4,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderRadius: 10,
        borderColor: '#ffffff',
        backgroundColor:'#fff'
    },
    linewidth: {
        width: '33%',
        borderBottomWidth: 4,
        borderBottomColor: '#99FFCC',
        height: 17
    },
    gradient: {
        margin:3.5,
        width: '23%',
        height: '42rem',
        // marginTop: '25rem',
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20rem',
        elevation: 7,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
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
        marginLeft: '110rem',
        marginTop: '-30rem',
        marginBottom: '30rem'
    },
    text: {
        fontWeight: '500',
        color: '#ffffff',
        fontSize: 15
    },
    label: {
        fontSize:'13rem', 
        color: '$theme', 
        fontWeight:'500', 
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
        padding: 5
    },
    innerline: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.8,
        borderColor: '#99FFCC',
        width: '100%',
        marginBottom: '10rem',
        marginTop: '10rem'
    },
    label: {
        fontSize:'13rem', 
        color: '$theme', 
        fontWeight:'500',

    },
})