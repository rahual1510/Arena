import React, { Component } from 'react'
import { Text, Image, View, TouchableOpacity,ScrollView, Button ,Keyboard} from 'react-native'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../util/images';
dp = (size) => EStyleSheet.value(size+'rem')

class GetStarted extends Component {

    constructor(props) {
        super(props)
        
    }

    inc() {
        // this.props.getData('jasndjs')
        // let data = increment()
        // data.next()
    }


    render() {
        return (
            // <Header header title='Get Started' back > 

            // </Header>
            <LinearGradient colors={['#0E3648', '#397471', '#63B199']} style={{flex:1}} >
            <ScrollView bounces={false} ref={refs=> this.scroll = refs} keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scroll} >
                <View style={{ height:'100%',alignItems:'center',padding: dp(30)}}>
                  <View style={{marginTop:'12%',marginBottom:'7%'}}>
                  <Image source={Images.headerImage} />
                  </View>
                  <View style={{justifyContent:'center', alignItems:'center',padding:dp(15)}}>
                    <Text style={styles.heading}>THE HOME OF EVERYDAY ATHLETES</Text>
                    <View style={{width:'80%',marginTop:dp(4)}}>
                    <Text style={styles.subheading}>Find classes, pick-up games, and other everyday athletes near you.</Text>
                    </View>
                   
                  </View>
                  <View style={{width:'90%', justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity style={{marginTop:'31%', borderWidth:1,borderColor:'#fff', width:'80%', height:'20%',padding:10,borderRadius:5}} 
                onPress={()=>{
                    Keyboard.dismiss()
                    this.props.navigation.navigate('Login')
                    }} 
                    >
                    <Text style={{color:'#FFF', fontSize:dp(14), fontWeight:'500',alignSelf:'center'}} >GET STARTED</Text>
                </TouchableOpacity>
                  </View>
                  <Text style={styles.subheading}> Signup with a social account</Text>
                  <View style={{flexDirection:'row',marginTop:20}}>
                  <Image source={Images.fb} style={{marginRight:5,marginTop:-2}}/>
                  <Image source={Images.google} style={{paddingTop:10}}/>
                  </View>
           
               
                </View>
           
                </ScrollView>
        </LinearGradient>
        )
    }
  
}


const mapStateToProps = (state) => ({
  })
  
const mapDispatchToProps = (dispatch) => ({
  })

  const styles = EStyleSheet.create({
    scroll: {
        flexGrow: 1, 
        width: '100%', 
        paddingBottom: '50rem', 
    },
    heading: {
      fontWeight: '600',
      fontSize: '15rem',
      color: '#fff',
      marginBottom:10
    },
    subheading: {
      fontSize: '16rem',
      color: '#fff',
      textAlign : 'center',
    }
    
})
  
export default connect(mapStateToProps, mapDispatchToProps)(GetStarted)

