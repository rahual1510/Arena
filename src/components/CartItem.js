import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Carousel from './Carousel'
import Images from '../util/images';
import strings from '../util/strings';
import commonStyles from '../util/commonStyles';

const width = Dimensions.get('window').width

dp = (size) => EStyleSheet.value(size+'rem')

const sizes = ['small', 'recommended', 'large']

export default class CartItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productImages : [
                Images.productImg,
            ]
        }
    }

    getSides(arr) {
        let str = ''

        arr.map((item, index)=>str+=item.selected==1? `${item.dish_name}${index!=arr.length-1?', ': ''}` : '')

        return str
    }

    getSelected(ingredient, sides) {

        let arr = [...ingredient, ...sides]

        let selected = arr.filter(obj=>obj.selected==1)

        return selected.length
    }

    render() {

        const { meal, del, ingredients, update } = this.props

        const { product_name, total, totalside, type, ingredient, image } = meal

        return(
            <View style={[Styles.container,commonStyles.shadow]} >

                <TouchableOpacity activeOpacity={1} onPress={update} style={{width:'30%', height:dp(70), borderRadius: 10}} >
                    <Image source={{uri: image}} style={{width:'100%', height:'100%', resizeMode:'cover', borderRadius: 10}} />
                </TouchableOpacity>

                <View style={{paddingLeft:dp(10), width:'40%'}} >

                    <Text style={Styles.tileLabels} >{product_name}</Text>
                    
                    {sizes.map(item=>
                        Number(meal[item])>0? 
                            <Text key={item} style={Styles.tileLabels}>{`${meal[item]} x ${strings[item]}`}</Text>  
                        : null
                    )}

                    {this.getSides(totalside)?<Text style={Styles.tileLabels} >{strings.sides}: {this.getSides(totalside)}</Text>: null}
                    
                    <Text onPress={ingredients} style={{color:EStyleSheet.value('$theme2')}} >{strings.selectIngredients}({ingredient?this.getSelected(ingredient, totalside):'0'})</Text>

                </View>

                <View style={{width:'30%', paddingRight:dp(10)}} >

                    <Text style={[Styles.rightAlignText, Styles.tileLabels]} >${Number(total).toFixed(2)}</Text>
                    <Text style={[Styles.rightAlignText, Styles.tileLabels]} >{type=='C'?strings.weCook: strings.requirePreprations}</Text>
                    
                </View>

                <TouchableOpacity style={{position:'absolute', top:dp(-8), right:dp(-8), zIndex:5}} hitSlop={{top:10, right:10}} onPress={del} >
                    <Image source={Images.cross} style={{height:dp(16), width:dp(16), resizeMode:'contain'}} />
                </TouchableOpacity>
                
            </View>
        )
    }
}

const Styles = EStyleSheet.create({
    container : {
        backgroundColor:'#FFF', 
        flexDirection:'row', 
        padding:'10rem', 
        marginVertical:'10rem',
        borderRadius: 5,
        width:'100%',
        alignSelf: 'center'
    },
    tileLabels: {
        color: '#6D7278',
        marginTop: '2rem'
    },
    rightAlignText: {
        textAlign:'right', 
        fontSize:'13rem'
    }
})
