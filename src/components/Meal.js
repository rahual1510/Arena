import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Carousel from './Carousel'
import Images from '../util/images';
import strings from '../util/strings';
import commonStyles from '../util/commonStyles';

const {width, height} = Dimensions.get('window')
let images = ["http://admin.gilbertsfresh.com.au/uploads/spanish-chicken-1.jpg", "http://admin.gilbertsfresh.com.au/uploads/spanish-chicken-2.jpg", "http://admin.gilbertsfresh.com.au/uploads/spanish-chicken-3.jpg"]
dp = (size) => EStyleSheet.value(size+'rem')

export default class Product extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { quickInfo, reheat, children, details, meal, type } = this.props

        const product = 
        <View>
            <Text style={{ fontSize:dp(14), fontWeight:'500'}} >{meal.product_name}</Text>

            <Text style={{marginTop:dp(10), fontSize:dp(12), color: '#6D7278'}} numberOfLines={3} >{meal.description}</Text>
        </View>
        
        return(
            <View style={[commonStyles.shadow, Styles.container]} >

                <View style={{height:height*0.3, width:'100%', borderTopLeftRadius:15, borderTopRightRadius:15, overflow:'hidden'}} >
                    <Carousel 
                    images={meal.images?meal.images: []} 
                    onPress={details}
                    width={width*0.9}
                    bottom='10%'
                    />
                    
                </View>

                <View style={{width:'90%', alignSelf:'center', marginVertical:dp(10), height:children? height*0.4 : null }} >
                    {children? null : product}

                    {children? 
                    <View style={{height:'100%'}}>
                        <ScrollView 
                            contentContainerStyle={{ width:'100%'}} 
                            bounces={false} 
                            showsVerticalScrollIndicator={false}
                        >
                        {product}
                        {children} 
                        </ScrollView>
                    </View>
                    : 
                    <View style={{flexDirection:'row', alignItems:'center', marginTop:dp(10), padding:dp(5)}} >

                        <TouchableOpacity onPress={quickInfo} style={[Styles.buttons, {width: '30%'}]} >
                            <Text style={Styles.buttonText} >{strings.whatsInside}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={reheat} style={[ Styles.buttons, {backgroundColor:'#FFF', width:'40%'}]} >
                            <Text style={[Styles.buttonText, {color: '#000', textAlign:'center'}]} >{type==0?strings.reheat:strings.prepTime}:{'\n'+meal.reheating}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={details} style={[Styles.buttons, {width: '30%'}]} >
                            <Text style={Styles.buttonText} >{strings.showMeal}</Text>
                        </TouchableOpacity>
                        
                    </View>
                    }
                </View>
            </View>
        )
    }
}

const Styles = EStyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        width:'90%',
        alignSelf: 'center',
        marginBottom: '20rem',
        borderRadius: 10,
        minHeight: '150rem',
        shadowRadius: 10
    },
    seperator: {
        width: 2,
        backgroundColor:'#D8D8D8'
    },
    buttons: {
        paddingVertical: '5rem', 
        backgroundColor:'$theme',
        alignItems:'center'
    },
    buttonText: {
        fontSize:'13rem', 
        color: '#FFF'
    }
})
