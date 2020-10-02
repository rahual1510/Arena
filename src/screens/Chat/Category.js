import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Styles from './ChatStyles';
import Images from '../../util/images';
import strings from '../../util/strings';
import EStyleSheet from 'react-native-extended-stylesheet';
import NavigationService from '../../NavigationService';
dp = (size) => EStyleSheet.value(size + 'rem')
import PropTypes from 'prop-types';
class Category extends Component {

    constructor(props) {
        super(props);
        const chatData = this.props.chatData;
        let message;
        let seen = true;
        if (chatData && chatData.lastMessage) {
            if (chatData.lastMessage) {
                message = chatData.lastMessage.message
                if (chatData.lastMessage.senderId == this.props.userId) {
                    message = "You: " + message
                }
            }
            seen = chatData.seen

        }
        this.state = {
            message: message,
            seen: seen
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={Styles.maincontainer}>

                <View style={Styles.Box}>
                    <View style={Styles.imageUriView}>
                        <Image source={this.props.imageUri} style={Styles.imageUri} />
                        <Image style={{ position: 'absolute', alignSelf: 'flex-end', top: 35, right: 15 }} source={this.props.onlineStus} />
                    </View>
                    <View style={Styles.itemDetails}>
                        <View style={[Styles.commonSpace, Styles.wrap, { width: 262, height: 30 }]}>
                            <Text style={Styles.itemName}>{this.props.name}</Text>
                            {!this.state.seen && <Image style={{ alignSelf: 'flex-end', height: 30, tintColor: '#3B99FC' }} source={this.props.onlineStus} />}
                        </View>
                        <Text style={Styles.itemMessage}>{this.state.message}</Text>
                        {/* <Text style={Styles.itemSport}>{this.props.sport}</Text> */}
                    </View>
                </View>

                <Image style={{ width: '95%', alignSelf: 'center', marginTop: -5, backgroundColor: 'lightgrey', height: 1, }} />
            </View>



        );
    }
}

// Category.childContextTypes = {
//     imageUri:PropTypes.string,
//     onlineStus:PropTypes.string,
//     name:PropTypes.string,
//     userId:PropTypes.string,
//     chatData:PropTypes.object
// };

export default Category;
