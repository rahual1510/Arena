import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Images from '../util/images'
import DateTimePicker from '@react-native-community/datetimepicker';
import strings from '../util/strings';
dp = (size) => EStyleSheet.value(size+'rem')
import moment from "moment";
export default class DatePick extends Component {

    constructor(props) {
        super(props)
        this.state = {
            focused:false,
            show: false,
            date: new Date(),
            dateSelected: false,
            days : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        }
    }

    setSplitDate = (data) => {
        // let arr = data.split('-')

        // this.state.date.setFullYear(arr[2], arr[1]-1, arr[0])

        this.setState({
            dateSelected: true
        })

    }

    setDate = (event, data) => {
        // let a = `${this.state.days[data.getDay()]} ${data.getMonth()+1}-${data.getDate()}-${data.getFullYear()}`
        // console.log(a)
        // var b = a.split(' ')
        // var c = b[1].split('-')
        // console.log(b)
        // console.log(c)
        // var d =moment(new Date()).format('M-D-YYYY');
        // var years = moment().diff(a, 'years');
        // console.log(years)
        // console.log(d)
        
        if(event.type=='set' || Platform.OS=='ios' ) {
        
            this.setState({
                show: Platform.OS=='ios'? true : false,
                date: data,
                dateSelected: true
            })
            this.props.onSelect( this.dateFormat(data), data)
        } else {
            this.setState({show: false})
        }
    }

    dateFormat = (data) => `${this.state.days[data.getDay()]} ${data.getMonth()+1}-${data.getDate()}-${data.getFullYear()}`


    render() {

        const { label, min, max, value } = this.props

        const { dateSelected, date } = this.state


        return (
            <View style={{marginBottom:dp(15),borderBottomColor: dateSelected?EStyleSheet.value('$theme'): '#E1E3E3', borderBottomWidth:1,width:'100%'}}onLayout={()=>{
                if(value)
                    this.setSplitDate(value)
            }} >
            {dateSelected?<Text style={Styles.inputLabel} >{label}</Text>:null}
                
                <TouchableOpacity activeOpacity={1} style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} onPress={()=> {
                    this.setState({show:true})
                    }} >
                    <Text style={Styles.textInput} >
                    {this.state.dateSelected?
                        this.dateFormat(date) 
                        : 
                        label
                    }
                    </Text>
                    <Image source={Images.greycalendar} style={{width:dp(15), height:dp(15), resizeMode:'contain', marginRight:dp(5)}} />
                </TouchableOpacity>

                    {this.state.show && 
                    <View>
                        <DateTimePicker
                            value={date}
                            is24Hour={false}
                            onChange={this.setDate}
                            onCancel={()=>this.setState({show:false})}
                            mode='date'
                            minimumDate={min}
                            maximumDate={max}
                        />

                        {Platform.OS=='ios' ?
                            <TouchableOpacity style={{width:'100%', alignItems:'center'}} onPress={()=>this.setState({show: false})} >
                                <Text style={{color:EStyleSheet.value('$theme'), fontSize:dp(15)}} >{strings.select}</Text>
                            </TouchableOpacity>
                            : null
                        }

                    </View>
                    
                    }
            </View>
        )
    }
}

const Styles = EStyleSheet.create({
    textInput: {
        marginTop:'5rem',
        paddingVertical:'4rem',
        fontSize:'12rem'
    },
    inputLabel: {
        color:'$theme', 
        fontSize:'13rem',
        fontWeight:'500'
    },
    borderBottom: {
        borderBottomColor: '#E1E3E3', 
        borderBottomWidth:1
    }
})
