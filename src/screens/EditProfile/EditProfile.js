import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/headerLogo'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../../util/commonStyles';
import Styles from './EditProfileStyles';
import Images from '../../util/images';
import countryList from '../../util/countrycodes';
import strings from '../../util/strings';
import RadioButtons from '../../components/RadioButtons';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Picker from '../../components/Picker';
import DatePick from '../../components/DatePick';
import ImagePick from '../../components/ImagePick';
import * as Validations from '../../util/Validations';
import types from '../../types';
import Loader from '../../components/Loader';

dp = (size) => EStyleSheet.value(size + 'rem')

let sport = {id: -1, level:-1}

let sportList = [
    'Football',
    'Cricket',
    'Baseball'
]

export class EditProfile extends Component {

    constructor(props) {
        super(props) 
        this.callback = this.callback.bind(this)
        this.state ={
            fName: '',
            lName: '',
            userType: undefined,
            gender: undefined,
            dob: '',
            location: '',
            country: 0,
            city: '',
            zip: '',
            page: 0,
            profilePic: '',
            picChange: false,
            lat:'',
            lng:'',
            about: '',
            page: 0,
            sports: [
                {id: -1, level:-1}
            ],
            sportValues: [-1],
            abilityInfo:''
        }
        if(this.props.navigation.state.params){
            this.state.page = 1
        }
    }

    componentDidMount() {
        const { image, first_name, last_name, gender, location, date_birth, city, country, zipcode, about, ability_info, lat, lng, sports,profilePic } = this.props.userProfile

        let i = countryList.findIndex(obj=>obj.name==country)
        
        let values = []
        sports.map(item=>{
            for(let i in this.props.categories){
                if(this.props.categories[i].id==item.id){
                    values.push(i)
                }
            }
            // let x = this.props.categories.findIndex(obj=>{
            //     if(obj.id==item.sport_id){
            //         console.log(obj)
            //         console.log(item)
            //         values.push(obj)
            //     }}
            //     )
        })

        this.setState({
            fName: first_name,
            lName: last_name,
            gender,
            location,
            dob: date_birth,
            city,
            zip: zipcode,
            country: i!=-1? i : 0,
            about,
            abilityInfo: ability_info,
            lat,
            lng,
            sports,
            sportValues: values,
            profilePic: image
        })

    }

    onSportChange(index, name, value) {
        const{sports} =this.state
        console.log(index)
        console.log(value)
        console.log(name)
        console.log(this.state.sports)
        if(sports.length > 0){
            if(name == 'level'){
                console.log('if')
                sports[index].level = value  
            }
            else{
                sports[index].id = value  
            }
            console.log(sports)
             
        }
      
        this.setState((prevState) => ({
            sports: prevState.sports.map((item, i)=>{
                if(index==i) {
                    return {
                        ...item,
                        [name] : value
                    }
                }
                return item
            })
        }))
    }

    callback(err, response) {
        if(err) {
            alert(response)
        } else {
            this.props.navigation.goBack()
            
        }
    }

    submit() {
        const { fName, lName, gender, dob, location, country, city, zip, profilePic, lat, lng, about, page, sports, sportValues, abilityInfo, } = this.state

        // if(Validations.isAnyFieldEmpty([fName, dob, location])) {
        //     alert(strings.fillFields)
        // }
        if(!fName || !zip || !country || !city || !dob) {
            if(!fName ){
                alert('Please fill name field') 
            }
            else if(!zip ){
                alert('Please fill zipcode field') 
            }
            else if(!country ){
                alert('Please fill country field') 
            }
            else if(!city ){
                alert('Please fill city field') 
            }
            else if(!dob ){
                alert('Please fill date of birth field') 
            }

            // alert(strings.fillFields)
        } 
        else if(!Validations.isMinLength(zip,4)) {
            alert(strings.validPostal)
        } else {

            var pars = {
                first_name:fName,
                last_name:lName,
                gender:gender,
                date_birth:dob,
                location,
                country:countryList[country].name,
                city,
                zipcode:zip,
                about,
                ability_info:abilityInfo,
                lat,
                lng,
                image: this.state.profilePic,
            }
            
            let sportsdata = {}
            sports.map((item, index)=>{
                if(item.id != -1 && item.level != -1){
                Object.keys(item).map(key => {
                    Object.assign(sportsdata,{[`sports[${index}][${key}]`]:item[key]})
                })
            }
            })
            console.log(sportsdata)
            if(sports.length > 0){
                if(sports[0].id){
                    pars = {
                        ...pars,
                        ...sportsdata
                    }
                   }
                   else{
                    pars = {
                        ...pars
                    }
                   }
            }
            else{
                pars = {
                    ...pars
                }
            }
          
           
            console.log(pars)

            this.props.update(pars, this.callback)
            // this.props.getProfile()
        }
    }


    render() {

        // const { image, first_name, last_name, gender, location } = this.props.userProfile
        
        const { fName, lName, gender, dob, location, country, city, zip, profilePic, lat, lng, about, page, sports, sportValues, abilityInfo } = this.state

        const {categories} = this.props

        const basic = 
            <View >
                <Text style={Styles.heading} >({strings.basicInfo})</Text>
                {
                    this.props.userProfile.user_type?
                    <Input
                    value={fName}
                    fnc={(fName)=>this.setState({fName})}
                    label= {strings.firstName}
                    prefix= ''
                />:
                <View>
             <Input
                    value={fName}
                    fnc={(fName)=>this.setState({fName})}
                    label= {strings.name}
                    prefix= ''
                />
                <Input
                    value={lName}
                    fnc={(lName)=>this.setState({lName})}
                    label= {strings.lastName}
                    prefix= ''
                /> 
           </View>
                }

                {
                    this.props.userProfile.user_type?
                    <RadioButtons 
                    options={[strings.individual, strings.company]} 
                    row 
                    label={strings.gender} 
                    value={gender}
                    onChange={(gender)=>this.setState({gender})} 
                />
                :
                <RadioButtons 
                options={[strings.male, strings.female, strings.others]} 
                row 
                label={strings.gender} 
                value={gender}
                onChange={(gender)=>this.setState({gender})} 
            />
                }

             
                
                <DatePick 
                    value={dob}
                    onSelect={(dob)=>this.setState({dob})}
                    ref={refs=>this.dobPicker=refs}
                    label={strings.dob}
                />

                <Text style={Styles.label} >{strings.address}</Text>

                <Input
                    value={location}
                    fnc={(location)=>this.setState({location})}
                    fnc1={(loc) => {
                        this.setState({location : loc.description})}}
                    label= {strings.location}
                    prefix= ''
                    comp
                    multiline
                    location
                    loc
                    getLocation={(location, city, country, zip, lat, lng)=>{
                        let i = countryList.findIndex(obj=>obj.name==country)

                        this.setState({
                            location,
                            city,
                            zip,
                            country: i!=-1? i: 0,
                            lat,
                            lng
                        })

                    }}
                    getLocation1={(location, city, country, zip, lat, lng)=>{
                        let i = countryList.findIndex(obj=>obj.name==country)

                        this.setState({
                            location,
                            city,
                            zip,
                            country: i!=-1? i: 0,
                            lat,
                            lng
                        })
                    }}
                />

                <Picker 
                    fnc={(country)=>this.setState({ country })} 
                    value={country} 
                    country
                />

                <Input
                    value={city}
                    fnc={(city)=>this.setState({city})}
                    label= {strings.city}
                    prefix= ''
                />

                <Input
                    value={zip}
                    fnc={(zip)=>this.setState({zip})}
                    label= {strings.zip}
                    prefix= ''
                />

                <Text style={Styles.label} >{strings.about_me}</Text>
                
                <TextInput 
                    value={about}
                    onChangeText={(about)=>this.setState({about})}
                    style={Styles.multiline}
                    multiline={true}
                    maxLength = {100}
                    placeholder= "I am from Minnesota but recently moved to Miami for work." 
                />

                <TouchableOpacity style={{alignSelf:'flex-end',marginTop:dp(15)}} onPress={()=>this.setState({page:1})} >
                    <Image source={Images.rightArrowButton} />
                </TouchableOpacity>

                {/* <Button label='' Style={{height:dp(40), width:dp(40), borderRadius:dp(25), paddingVertical: null, alignSelf: 'flex-end'}} icon={Images.leftarrow} /> */}
                
            </View>

        const interests = 
            <View >
                <Text style={Styles.label} >{strings.favSports.toUpperCase()}
                    <Text style={Styles.select} > (Select any 5)</Text>
                </Text>

                    {
                        sports.map((item, index)=>{
                            return (
                                <View key={`sport${index}`} style={{marginTop:dp(15)}} >

                                    <Picker 
                                        list={categories}
                                        fnc={(sport)=>{
                                            console.log(sport)
                                            let arr = sportValues
                                            console.log(sportValues)
                                            arr[index] = sport
                                            this.setState({sportValues:[]})
                                            this.setState({sportValues:arr})

                                            this.onSportChange(index, 'id', categories[sport].id)
                                        }}
                                        value={sportValues[index]}
                                        placeholder={strings.sports}
                                        sport
                                    />

                                    <RadioButtons 
                                        options={[strings.beginner, strings.intermediate, strings.advanced]}
                                        label={strings.abilityLevel} 
                                        row
                                        onChange={(level)=>this.onSportChange(index, 'level', level)} 
                                        value={sports[index].level}
                                    />
                                </View>
                            )
                        })
                    }
                    {
                        sports.length < 5 ?
                        <TouchableOpacity style={{alignSelf:'flex-end'}} 
                        onPress={()=>{
                            this.state.sports.push(sport)
                            this.state.sportValues.push(-1)
                            this.setState({sports: sports})
                        }} >
                            <Image source={Images.addMore} />
                        </TouchableOpacity> :null
                    }

               
                <Text style={Styles.label} >{strings.moreInfo}</Text>
                <TextInput 
                    value={abilityInfo}
                    onChangeText={(abilityInfo)=>this.setState({abilityInfo})}
                    style={[Styles.multiline, {marginTop: dp(10)}]}
                    multiline={true}
                    placeholder= "I played college soccer and hockey, but now just trying to get some exercise."
                />

                <Button label={strings.saveChanges} onPress={()=>this.submit()} />
                    
            </View>

        return (
            <Header title='Edit Profile' icon={Images.camera} onImagePress={()=>this.imagePicker.showPicker()} back goBack={() => this.props.navigation.goBack()}  
            image={profilePic? {uri : profilePic} : Images.dummyPic} 
             >
                {page==0? basic : interests}
                <ImagePick 
                    ref={refs=>this.imagePicker = refs}
                    onSelectImage={(image)=>this.setState({
                        picChange: true,
                        profilePic: image
                    })}
                />
                <Loader show={this.props.loading} />
            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
    userProfile : state.profileReducer.userProfile,
    loading : state.profileReducer.loading,
    categories : state.resourcesReducer.categories
})

const mapDispatchToProps = (dispatch) =>  ({
    update: (pars, cb) => dispatch({
        type: types.UPDATE_PROFILE,
        params: pars,
        callback: cb
    }),
    getProfile: () => dispatch({
        type: types.GET_PROFILE
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
