import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../util/commonStyles';
import Images from '../util/images';
import NavigationService from '../NavigationService';
import { getProfile } from '../actions/profile_actions'
import { getMyMeals, getMeals } from '../actions/meals_actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

dp = (size) => EStyleSheet.value(size+'rem')

const tabs = [
    {name: 'Home', active: Images.homeColor, inactive: Images.home, route: 'Home'},
    {name: 'My Meals', active: Images.menuColor, inactive: Images.menu, route: 'Meals'},
    {name: 'Profile', active: Images.userColor, inactive: Images.user, route: 'Profile'},
    {name: 'Support', active: Images.supportColor, inactive: Images.support, route: 'Support'},
]

class Bottom extends Component {

    componentDidMount() {
        this.props.getProfile()
        this.props.getMyMeals()
        this.props.getMeals()
    }

    renderTab = (index) => {
        let tab = tabs[index]
        let isActive = this.props.navigation.state.index==index?true:false
        return(
        <TouchableOpacity 
            key={'tab'+index}
            activeOpacity={1}
            style={[styles.tab, { borderColor:isActive? EStyleSheet.value('$theme2'):'#FFF',}]} 
            onPress={()=>NavigationService.navigate(tab.route)} 
        >
            <View>
                <Image source={isActive? tab.active : tab.inactive } style={styles.tabIcon} />

                {index==1 && this.props.myMeals.length ?
                    <View style={styles.counterView} >
                        <Text style={{fontSize:dp(9)}} >{this.props.myMeals.length}</Text>
                    </View>
                    : null
                }
            </View>
            <Text style={[styles.tabLabel, { color: isActive? '#333333' : '#6D7278', }]} >{tab.name}</Text>
        </TouchableOpacity>
        )
    }

    render() {

        return (
            <View style={[commonStyles.shadow, styles.container, ]} >

                {tabs.map((item, index)=>this.renderTab(index))}
                
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    container :{
        width:'100%',
        flex:1,
        backgroundColor: '#FFF',
        height:'50rem',
        position: 'absolute',
        bottom: 0,
        marginTop:'2rem',
        shadowOffset: { width: 0, height: -5 }, 
        flexDirection:'row',
    },
    tab: {
        flex:1, 
        alignItems: 'center', 
        justifyContent:'center', 
        borderTopWidth:2,
        marginHorizontal:'5rem'
    },
    tabIcon: {
        height:'20rem', 
        width:'18rem', 
        resizeMode:'contain'
    },
    tabLabel : {
        marginTop:'4rem', 
        fontSize:'12rem'
    },
    counterView: {
        backgroundColor:'$theme', 
        borderRadius:25, 
        position:'absolute', 
        top:-2, 
        right:-10, 
        width:'16rem', 
        height:'16rem', 
        justifyContent:'center', 
        alignItems:'center'
    }
})

const mapStateToProps = (state) => ({
    loggedIn: state.loginReducer.loggedIn,
    myMeals: state.myMealsReducer.myMeals,
  })
  
  const mapDispatchToProps = (dispatch) => ({
      ...bindActionCreators({ getProfile, getMyMeals, getMeals }, dispatch)
  })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Bottom)