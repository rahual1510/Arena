import React, { Component } from 'react'
import { Text, Image, ImageBackground, TouchableOpacity, Dimensions, View, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/pages'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../../util/commonStyles';
import { Api } from '../../APIs/Api';
import Images from '../../util/images'
import HTML from 'react-native-render-html';
import strings from '../../util/strings';


dp = (size) => EStyleSheet.value(size + 'rem')

export class Info extends Component {

    constructor(props) {
        super(props)

        this.state={
            info: '<p></p>',
            text: ''
        }
        console.log(this.props.navigation.state.params.terms )
        if(this.props.navigation.state.params.type == 'terms' ){
            this.state.text = strings.terms
        }
        else if(this.props.navigation.state.params.type == 'privacy' ){
            this.state.text = strings.privacy
        }
        else{
            this.state.text = strings.group_creation
        }
        console.log(this.state.text)
    }

    componentDidMount() {
        this.getInfo();
    }

    getInfo() {
        const {type} = this.props.navigation.state.params

        new Api().getJSON('PagesAll')
        .then(obj=>{
            let info = obj.data.find(item=>item.title==type)
            this.setState({info: info.page})
        })
    }

    render() {

        const {type} = this.props.navigation.state.params
        return (
            <KeyboardAvoidingView style={{flexGrow: 1, height: '100%', }} behavior={Platform.OS=='ios'?'padding':'height'} enabled keyboardVerticalOffset={Platform.OS=='android'?80:20} >
            <ScrollView bounces={false} ref={refs=> this.scroll = refs} keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scroll} >
                
                <ImageBackground source={Images.header} style={{width:'100%', height:dp(170), alignItems:'center', paddingTop:dp(30), marginBottom:dp(40)}}  >
                    <View style={{
                           flexDirection: 'row', 
                           width:'92%', 
                           justifyContent:'center', 
                           alignItems:'center',
                    }} >
                            <TouchableOpacity style={styles.backButton} onPress={()=>{
                               this.props.navigation.goBack();
                                    }
                                }
                                hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }} >
                                <Image source={Images.leftarrow} />
                            </TouchableOpacity>

                        <Text style={styles.title} >{this.state.text}</Text>
                       
                    </View>

                    <View style={[commonStyles.shadow,{padding:10, backgroundColor:'#FFF', borderRadius:5,margin:20}]} > 
                    <HTML 
                        html={this.state.info}
                    />
                </View>

                </ImageBackground>
            </ScrollView>
            
        </KeyboardAvoidingView>
            // <Header title={type=='terms'?strings.terms: type=='privacy'?strings.privacy: 'GROUP CREATION POLICY'} noLogo back={this.props.navigation.goBack()} >
            //     <View style={[commonStyles.shadow,{padding:10, backgroundColor:'#FFF', borderRadius:5}]} > 
            //         <HTML 
            //             html={this.state.info}
            //         />
            //     </View>
            // </Header>
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
    backButton: {
        position:'absolute', 
        left:0, 
        paddingLeft:'12rem', 
        zIndex:10
    },
    title: {
        fontSize:'15rem', 
        fontWeight:'600', 
        color:'#FFF',
        alignSelf:'center',
        textAlign : 'center' 
    },
    headerView: {
        flexDirection: 'row', 
        width:'92%', 
        justifyContent:'center', 
        alignItems:'center',
    },
    container: {
        paddingHorizontal:'20rem', 
        width:'100%',
        alignSelf: 'center',
    },
    profilePic: {
        borderRadius: 10, 
        borderWidth: 2, 
        borderColor: '$theme2',
        marginHorizontal: '20rem',
        height:'100rem',
        width:'100rem',
        resizeMode: 'cover'
    },
    multiline: {
        borderColor: '#FFFFFF', 
        borderWidth:0.5,
        minHeight: '35rem',
        minWidth: '100%',
        position:'absolute',
        paddingLeft:'35rem',
        color: '#FFFFFF',
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Info)
