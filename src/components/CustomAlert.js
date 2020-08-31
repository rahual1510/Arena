import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Modal } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';


dp = (size) => EStyleSheet.value(size+'rem')

export default class CustomAlert extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            image:'',
            buttonText:'Close',
            alertText:'',
            error: false
        }
    }

    showAlert = ( alertText, image = '', buttonText = this.state.buttonText) => {
        this.setState({
            modalVisible: true,
            image,
            buttonText,
            alertText,
            error: false
        })
    }

    showError = (alertText, error = true , image = '', buttonText = this.state.buttonText) => {
        this.setState({
            modalVisible: true,
            image,
            buttonText,
            alertText,
            error
        })
    }

    render() {

        const {modalVisible, image, buttonText, alertText} = this.state

        return(
            <Modal
                visible={modalVisible}
                onRequestClose={()=>this.setState({modalVisible:false})}
                transparent={true}
                animated
                animationType='slide'
            >
                <View style={Styles.container} >
                    <View style={[Styles.innerContainer,{ paddingTop:image==''?dp(40):dp(20)}]} >
                        {image!=''?<Image source={image}  style={Styles.icon} />:null}

                        <Text style={Styles.alertText} >{alertText}</Text>

                        <TouchableOpacity style={Styles.submit} onPress={()=>{
                            this.setState({modalVisible:false})
                            if(this.props.onButtonPress && !this.state.error )
                                this.props.onButtonPress()
                        }} >
                            <Text style={{fontSize:dp(15), fontWeight:'400'}} >{buttonText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

const Styles = EStyleSheet.create({
    container: {
        height:'100%', 
        width:'100%', 
        backgroundColor:'rgba(0,0,0,0.7)', 
        justifyContent:'center', 
        alignItems:'center'
    },
    innerContainer: {
        width:'90%', 
        backgroundColor:'#FFF', 
        alignItems:'center',
        borderRadius:5 
    },
    icon: {
        height:'30rem', 
        width:'30rem', 
        marginBottom:'20rem'
    },
    alertText: {
        width:'90%', 
        fontSize:'14rem', 
        color:'#747474', 
        textAlign:'center'
    },
    submit: {
        width:'100%', 
        marginTop:'30rem', 
        borderTopWidth:1, 
        borderColor:'#E4EBE9', 
        paddingVertical:'10rem', 
        alignItems:'center'
    }
})
