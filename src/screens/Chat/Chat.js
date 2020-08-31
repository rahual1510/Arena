import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import Styles from './ChatStyles';
import strings from '../../util/strings';
import Images from '../../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button';
import Category from './Category'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

dp = (size) => EStyleSheet.value(size + 'rem')
export class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUserId: null,
            senderName: "",
            users: [],
            event: '',
            join: ''
        }

    }

    componentWillMount = async () => {
        const user = await AsyncStorage.getItem('userId');
        if (user) {
            this.setState({
                currentUserId: user
            })
            firestore()
                .collection('Users')
                .onSnapshot(this.onResult, this.onError);
        }
    }

    chatAccounts = async () => {
        let chatUsersId = [];
        await firestore()
            .collection('GroupChat')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    let data = documentSnapshot.id.split("-")
                    if (data[0] === this.state.currentUserId) {
                        chatUsersId.push(data[1])
                    }
                });
            });
        this.getUserData(chatUsersId)
    }

    getUserData = async (data) => {
        let users = []
        await firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (data.includes(documentSnapshot.id)) {
                        let userData = {
                            id: documentSnapshot.id,
                            data: documentSnapshot.data()
                        }
                        users.push(userData)
                    }
                });
            });
        this.setState({ users })

    }

    onResult = async (QuerySnapshot) => {
        this.chatAccounts();
    }

    onError = (error) => {
        console.error(error);
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{}}>
                <Header title={'CHAT'} drawer  >

                    <ScrollView >
                        {
                            this.state.users.length ?
                                this.state.users.map((user) => {
                                    return (
                                        <TouchableOpacity Style={{ backgroundColor: 'red' }} onPress={() => {
                                            this.props.navigation.navigate('GroupChat', { receiverName: user.data.name, receiverPersonId: user.id, senderPersonId: this.state.currentUserId, senderName: this.state.senderName })
                                        }}>
                                            <Category
                                                imageUri={Images.tile2}
                                                onlineStus={user.data.active ? Images.online : ""}
                                                name={user.data.name}
                                                message="5 miles away"
                                                sport="Rugby"
                                            />
                                        </TouchableOpacity>
                                    )
                                })
                                :
                                null
                        }
                        {/* <TouchableOpacity Style={{ backgroundColor: 'red' }} onPress={() => {
                            this.props.navigation.navigate('GroupChat')
                        }}>
                            <Category
                                imageUri={Images.tile1}
                                onlineStus={Images.online}
                                name='Vernon Bradley'
                                message="5 miles away"
                                sport="Rugby"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity Style={{ backgroundColor: 'red' }} onPress={() => {
                            this.props.navigation.navigate('GroupChat')
                        }}>
                            <Category
                                imageUri={Images.tile2}
                                name='Vernon Bradley'
                                message="5 miles away"
                                sport="Rugby"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity Style={{ backgroundColor: 'red' }} onPress={() => {
                            this.props.navigation.navigate('GroupChat')
                        }}>
                            <Category
                                imageUri={Images.tile1}
                                onlineStus={Images.online}
                                name='Vernon Bradley'
                                message="5 miles away"
                                sport="Rugby"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity Style={{ backgroundColor: 'red' }} onPress={() => {
                            this.props.navigation.navigate('GroupChat')
                        }}>
                            <Category
                                imageUri={Images.tile2}
                                name='Vernon Bradley'
                                message="5 miles away"
                                sport="Rugby"
                            />
                        </TouchableOpacity> */}



                    </ScrollView>


                </Header>
            </View>
        )
    }
}



export default Chat;
