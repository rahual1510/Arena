import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Images from '../util/images'
import DateTimePicker from '@react-native-community/datetimepicker';
import strings from '../util/strings';
import moment from "moment";
dp = (size) => EStyleSheet.value(size+'rem')

export default class DatePick extends Component {

    constructor(props) {
        super(props)
        this.state = {
            focused:false,
            show: false,
            date: new Date(),
            dateSelected: false
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
        
        if(event.type=='set' || Platform.OS=='ios' ) {
        
            this.setState({
                show: Platform.OS=='ios'? true : false,
                date: data,
                dateSelected: true
            })
            this.props.onSelect( this.dateFormat1(data), `${data.getHours()}-${data.getMinutes()}}`)
        } else {
            this.setState({show: false})
        }
    }

    dateFormat1 = (data) => `${moment(`${data.getHours()}:${data.getMinutes()}`,'HH:mm').format('h:mm A')}`

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
                        this.dateFormat1(date) 
                        : 
                        label
                    }
                    </Text>
                    <Image source={Images.clockicon} style={{width:dp(15),  height:dp(15), resizeMode:'contain', marginRight:dp(5)}} />
                </TouchableOpacity>

                    {this.state.show && 
                    <View>
                        <DateTimePicker
                            value={date}
                            is24Hour={false}
                            onChange={this.setDate}
                            onCancel={()=>this.setState({show:false})}
                            mode='time'
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
