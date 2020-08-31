import React, { Component } from 'react'
import { View, Text, Image,ScrollView, TouchableOpacity ,ActivityIndicator,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import Styles from './ParticipantStyles';
import strings from '../../util/strings';
import Images from '../../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button';
import WebApi from '../../WebApi/index';
import Categry from './Categry';
import Geolocation from '@react-native-community/geolocation';
import Sports from '../../components/Sports'
import { getDistance, getPreciseDistance } from 'geolib';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
dp = (size) => EStyleSheet.value(size + 'rem')
let that
const key = 'AIzaSyBWQ6tsitoNAWbg8p8BolWGGi41JIalv2Q'

export class Participant extends Component {

constructor(props) {
        super(props)
        this.state = {
          userId: '',
            id:'',
            list:[],
            isLoading:true,
            lat:'',
            long:''


        
        }
        console.log("current Location start>>>>","location")
        that=this   
        
    }
    getDistance = (lat,long) => {
      console.log("lat lng>>>>",this.state.lat+','+this.state.long)
      var dis = getDistance(
        { latitude: this.state.lat, longitude: this.state.long},
        { latitude: lat, longitude: long }
      );
        return `${(dis/1600).toFixed(1)} Miles away`;
   };
    _requestLocation = () => {
      Geolocation.getCurrentPosition(info => {
        console.log(info)
        this.state.lat = info.coords.latitude
        this.state.lng = info.coords.longitude
    });
      Geolocation.getCurrentPosition(
                    (info) => {
                      console.log("location>>>>",info)

                      this.state.lat = info.coords.latitude
                      this.state.long = info.coords.longitude
                      console.log("Lat long>>>>",this.state.lat,this.state.long)
                    },
                    (error) => {
                        // See error code charts below.
                
                            console.log(error.code, error.message);
                    },
                    {
                        enableHighAccuracy: false,
                        timeout: 10000,
                        maximumAge: 100000
                    }
                );
  }
      

      componentDidMount=async()=>{
        this._requestLocation()

                    const id = await this.props.navigation.getParam('config', '');
                    console.log("itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm=====>",id); 
                    await this.participants(id)
                    }


        //  getParticipant=async(id)=>{
        //                       console.log("Iddddddddddddddddd====>", id)
        //                       await WebApi.getParticipant(id)
        //                       .then(response =>{
        //                             console.log('Response from getParticipant ===>',response);
        //                                if(response.code==200){
        //                                     alert(response.message);
        //                                     }
        //                            })
        //                            .catch(error => {
        //                              this.setState({loading:false});
        //                                 console.log('errorrrrrrrrrrrr==>' , error)
        //                                 alert('Something Went Wrong!');
        //                            });
                               
        //                     }
        participants=async(id)=>{
          await WebApi.participants(id)
          .then(response =>{
           console.log('Participant Listtttttt===>',response);
           
           if(!response){
               alert('no data found')
             }else if(response.data.length === 0){
                 alert('no data found')
             }else{
                   this.state.list = response.data
                   console.log('Detailsssssssssssssssssss===>',this.state.list);
                }
                this.setState({isLoading:false})
               })
               .catch(error => {
                 this.setState({loading:false});
                    console.log('errorrrrrrrrrrrr==>' , error)
                    alert('Something Went Wrong!');
               });
           
        }
      
                   
    render() {
          
        if (this.state.isLoading) {
            return(
              <View style={{}}>
            <Header title={'PARTICIPANTS'} search back goBack={() => this.props.navigation.goBack()}  ></Header>
                <View style={[styles.loading]}>
                  <ActivityIndicator size="large" color="gray"  animating={that.state.isLoading}/>
                </View>
                </View>
              );
          }
        return (
           <View style={{}}>
            <Header title={'PARTICIPANTS'} search back goBack={() => this.props.navigation.goBack()}  >
          <View>
            {this.state.list.map((item, index)=>{
              console.log("lisstttttttttttt===>" , item)
              return(
                <View style={{flexDirection:'row'}}>
                

            <Categry 
            imageUri={{uri:item.image}}
            FirstName={item.first_name}
            lastName={item.last_name}
            message={that.getDistance(item.lat,item.lng)}
            sport= {item.ability_info}
        />
  <TouchableOpacity onPress={() =>{
                   this.props.navigation.navigate('PublicAccepted',{config:item.id})}} >
                  <Image style={{alignSelf: 'flex-end'}} source={Images.rightArrow} />
               </TouchableOpacity>
         </View> 
                              )
                             })}
                          </View> 
            
              </Header>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex:10,
      elevation: 10
    }
})

export default Participant;
