import React, { Component } from 'react'
import { View, Text, Image,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/headerLogo'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../../util/commonStyles';
import Images from '../../util/images';
import strings from '../../util/strings';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationService from '../../NavigationService';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import WebApi from '../../WebApi/index';
import moment from 'moment'

dp = (size) => EStyleSheet.value(size + 'rem')

export class PublicAccepted extends Component {
    constructor(props){
        super(props)
        this.state = {
            status:'',
            event_id:'',
            list:[],
            isLoading:true,
            age:0
           
        }
       }
    componentDidMount=async()=> {
        const id = await this.props.navigation.getParam('config', '');
        console.log("itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm=====>", id);
        this.getParticipant(id);
       
    }   

     getParticipant=async(id)=>{
                             await WebApi.getParticipant(id)
                              .then(response =>{
                                    console.log('Response from getParticipant ===>',response);
                                       if(!response){
                                           alert('no data found')
                                         }else if(response.data.length === 0){
                                             alert('no data found')
                                         }else{
                                               this.state.list = response.data
                                               var date = moment(this.state.list.date_birth.split(' ')[1], 'MM-DD-YYYY')
                                                var birthday = moment(date, "YYYYMMDD").fromNow();
                                                console.log("date======",birthday.split(' ')[1])
                                                if(birthday.split(' ')[1] === 'months'){
                                                this.setState({age:0+'.'+birthday.split(' ')[0]})
                                                }else{
                                                this.setState({age:birthday.split(' ')[0]})

                                                }

                                            }
                                            this.setState({isLoading:false})
                                           })
                                   .catch(error => {
                                     this.setState({loading:false});
                                        console.log('errorrrrrrrrrrrr==>' , error)
                                        alert('Something Went Wrong!');
                                   });
                               
                            }


        status=async(event_id,status)=>{
            console.log("status====>", event_id,'======><><',status)
                 await WebApi.status(status, event_id)
                  .then(response =>{
                        console.log('Response from status ===>',response);
                           if(response.code==200){
                               if(status === '1'){
                                   alert('Profile Accepted');
                               }else{
                                   alert('Profile Rejected');
                               }
                               }
                             })
                       .catch(error => {
                         this.setState({loading:false});
                            console.log('errorrrrrrrrrrrr==>' , error)
                            alert('Something Went Wrong!');
                       });
                   
                }












    render() {
          return (
           <View style={{flex: 1}}>
                <LinearGradient colors={['#0E3648', '#397471', '#63B199']} style={{flex:1}} >
                <ScrollView bounces={false} ref={refs=> this.scroll = refs} keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scroll} >
                    <View style={{ flex: 1,padding:20}}>

                        <View style={{flexDirection:'row', width:'100%',justifyContent:'space-between'}}>
                            <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                            <Image source={Images.leftarrow} />
                            </TouchableOpacity>
                      
                    <Text style={{fontWeight:'600',color:'#ffffff',fontSize:15}}>PROFILE</Text>
                        <TouchableOpacity>
                            <Image source={Images.mapIcon} />
                        </TouchableOpacity>
                        </View>

                        <View style={{justifyContent:'center', alignItems:'center',marginTop:'15%',marginBottom:-20}}>

                        <Image source={{uri:this.state.list.image}} style={styles.profilePic}/>

                        <Image style={styles.badge} source={Images.yellowBadge} />

                        <View style={styles.outerBox}>
                            <Text style={styles.text}>
                                {strings.firstName.toUpperCase()}
                            </Text>
                           
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row'}}>
                            <Text style={styles.textName}>
                               {this.state.list.first_name}
                            </Text>
                             <Text style={styles.textName}>
                               {this.state.list.last_name}
                            </Text>
                            </View>
                            <Text style={styles.Simpletext}>
                                Age : {this.state.age}
                            </Text>
                            </View>
                           
                            <Text style={styles.Simpletext}>
                               {this.state.list.gender}
                            </Text>
                            <Text style={styles.Simpletext}>
                                {this.state.list.location}
                            </Text>

                            <View style={styles.innerline}>
                                </View>
                               <Text style={styles.text}>
                                {strings.ABOUT_ME}
                               </Text>

                            <Text style={[styles.Simpletext,{marginTop:3}]}>
                              {this.state.list.about} 
                            </Text>

                           
                          
                            <Text style={[styles.text,{fontSize:16,  fontWeight:'bold'}]}>
                            {strings.FavSprt}
                            </Text>
                            
                            <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:5}}> 
                                    <Text style={styles.text}>
                                FOOTBALL
                                </Text>
                                <Text style={styles.level}>
                                {this.state.list.beginner_sports}
                                </Text>
                            </View>
                            
                                <View style={[styles.innerline, {marginTop:10}]}>
                                    </View>

                            <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:-5}}> 
                                    <Text style={styles.text}>
                                BASEBALL
                                </Text>
                                <Text style={styles.level}>
                                {this.state.list.advance_sports}
                                </Text>
                            </View>
                                
                               <View style={[styles.innerline, {marginTop:10}]}>
                                    </View>

                          
                            <Text style={[styles.text,{fontSize:15, fontWeight:'bold', marginTop:-5}]}>
                            {strings.MoreAbility}
                            </Text>
                            <Text style={styles.ability}>
                                {this.state.list.ability_info}
                            </Text>
                           
                            </View>
                            </View>
                            <Button label={strings.Accept} bold  onPress={() =>{this.status (this.state.list.id,'1')}} />
                              <TouchableOpacity onPress={() =>{this.status (this.state.list.id,'0')}} >
                                 <Text style={styles.reject}> {strings.Reject} </Text>
                              </TouchableOpacity>
                    </View>
               
                    </ScrollView>
            </LinearGradient>

           </View>
        )
    }

}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {

}


const styles = EStyleSheet.create({
    scroll: {
        flexGrow: 1, 
        width: '100%', 
        paddingBottom: '50rem', 
    },
    profilePic: {
        borderRadius: 20, 
        borderWidth: 2, 
        borderColor: '$theme2',
        marginHorizontal: '20rem',
        height:'110rem',
        width:'110rem',
        resizeMode: 'cover',
        marginBottom: 30,
    },
    badge: {
        marginLeft: '122rem',
        marginTop:'-35rem',
        marginBottom: '30rem'
    },
    text: {
        fontWeight:'500',
        color:'#ffffff',
        fontSize: '12rem',
        marginTop:'5rem',
        marginLeft:'5rem'

    },
    reject:{
        fontWeight:'500',
        color:'red',
        fontSize: '15rem',
        marginTop:'10rem',
        alignSelf:'center',
        width:'100rem',
        height:'50rem',
        paddingTop:'10rem',
        textAlign:'center',
        marginTop:'-5rem'
    },
    textName:{
        fontWeight:'500',
        color:'#ffffff',
        fontSize: '11.5rem',
        marginTop:'5rem',
        marginLeft:'5rem',
        textTransform: 'uppercase'
    },
    dulltext: {
        fontWeight:'500',
        color:'#ffffff',
        fontSize: '12rem',
        marginBottom:'10rem',
        marginLeft:'5rem'
    },
    dullAge:{
        fontWeight:'500',
        color:'#ffffff',
        fontSize: '12rem',
        marginBottom:'10rem',
        marginRight:'10rem'
    },
    Simpletext:{
        color:'#ffffff',
        fontSize: '12rem',
        marginBottom:'10rem',
        marginRight:'10rem',
        marginLeft:'5rem'
    },
    ability:{
        color:'#ffffff',
        fontSize: '12rem',
        marginBottom:'10rem',
        marginRight:'10rem',
        marginLeft:'5rem',
        marginTop:'3rem'
    },
    outerBox: {
        flex:1,
        borderWidth:1.5,
        borderRadius: 6,
         borderColor:'#99FFCC',
         width:'100%',
         padding:5
    },
    innerline:{
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderWidth:0.6,
         borderColor:'#99FFCC',
         width:'95%',
         marginBottom:10,
         
    },
    level: {
        color:'#99FFCC',
        marginRight:'10rem',
        marginTop:'3rem'
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(PublicAccepted)
