import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import Styles from './CreateEventViewStyles';
import strings from '../../util/strings';
import Images from '../../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
dp = (size) => EStyleSheet.value(size + 'rem')
export class CreateEventView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            event: '',
            join: ''
        }
        
    }

    componentDidMount() {

    }

    render() {
        return (

            <Header title={'CREATE EVENT'} search back goBack={() => this.props.navigation.goBack()}  >
                <View style={Styles.maincontainer}>
                    <View style={Styles.innercontainer}>
                        <Text style={Styles.heading}>Basketball World Cup 2020</Text>
                           <View style={Styles.profilePic} >
                            <Image source={Images.tile1} style={{width:'100%', height:'100%', marginTop:-5, borderRadius:5}} />
                           </View>

                         <View style={[Styles.commonSpace, Styles.wrap]}>
                            <Text style={Styles.boldTheme}>{strings.location}</Text>
                            <Text style={[Styles.des,{fontWeight:'bold'}]}>{strings.age}: 18-50</Text>       
                         </View>


                        <View style={[Styles.commonSpace, Styles.wrap]}>
                                 <Text style={Styles.add}>134 Rock Maple Road Bridgeton, NJ 08302</Text>
                                <Text style={Styles.boldTheme}>Male</Text>
                        </View>

                        <View style={[Styles.commonSpace, Styles.wrap]}>
                            <Text style={Styles.des}>Thu 07-23-2020 - Thu 07-30-2020</Text>
                            <Text style={Styles.dess}>11:00 am - 02:00 pm</Text>
                        </View>


                        <Text style={Styles.boldTheme}>6/12 Participants needed</Text>

                        
                        <View style={[Styles.commonSpace,{marginTop:10}]}>
                            <Text style={Styles.des}>Basketball</Text>
                            <Text style={Styles.des}>Beginner</Text>
                        </View>


                        <View style={{
                            height: 150,
                            marginTop:10,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>
                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                region={{
                                    latitude: 28.7040592,
                                    longitude: 77.10249019999999,
                                    latitudeDelta: 0.5,
                                    longitudeDelta: 0.5,
                                 }}
                            >
                                 <Marker
                                        coordinate={{latitude: Number("28.7040592") , longitude: Number("77.10249019999999")}}
                                        image={Images.locationicon}
                                        // tracksViewChanges={trackChanges}
                                        // onLayout={(event)=>{
                                        //     const {x, y, width, height} = event.nativeEvent.layout;
                                        //     if(height>0) {
                                        //         trackChanges=false
                                        //     }
                                        // }}
                                        // onPress={()=>this.setState({markerSelected:index})}
                                    >
                                    </Marker>
                            </MapView>
                        </View>
                      
                                <Button label={strings.join} bold onPress={() => 'Participant'} /> 
                        
                            




                    </View>
                </View>

            </Header>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventView)
