/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Images from '../../util/images';
import Category from './Category';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import { getUserData } from '../../Firestore/UsersCollection';

export class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: null,
            senderName: '',
            senderImage: null,
            users: [],
            event: '',
            join: '',
        };
    }

    componentWillMount = async () => {
        const user = await AsyncStorage.getItem('userId');
        let currentUserData = await getUserData(user);
        if (user) {
            this.setState({
                currentUserId: user,
                senderPersonId: String(currentUserData.id),
                senderName: currentUserData.data.name,
                senderImage: currentUserData.data.image,
            });
            firestore()
                .collection('Users')
                .onSnapshot(this.onResult, this.onError);
        }
    };

    chatAccounts = async () => {
        let chatUsersId = [];
        await firestore()
            .collection('GroupChat')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    let data = documentSnapshot.id.split('-');
                    if (data[0] === this.state.currentUserId) {
                        chatUsersId.push(data[1]);
                    }
                });
            });
        this.getUserData(chatUsersId);
    };

    getUserData = async data => {
        let users = [];
        await firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (data.includes(documentSnapshot.id)) {
                        let userData = {
                            id: documentSnapshot.id,
                            data: documentSnapshot.data(),
                        };
                        users.push(userData);
                    }
                });
            });
        this.setState({ users });
    };

    onResult = async QuerySnapshot => {
        this.chatAccounts();
    };

    onError = error => {
        console.error(error);
    };

    componentDidMount() { }

    render() {
        return (
            <View style={{}}>
                <Header title={'CHAT'} drawer>
                    <ScrollView>
                        {this.state.users.length
                            ? this.state.users.map(user => {
                                return (
                                    <TouchableOpacity
                                        Style={{ backgroundColor: 'red' }}
                                        onPress={() => {
                                            this.props.navigation.navigate('GroupChat', {
                                                receiverName: user.data.name,
                                                receiverPersonId: user.id,
                                                recieverImage: user.data.image,
                                                senderPersonId: this.state.currentUserId,
                                                senderName: this.state.senderName,
                                                senderImage: this.state.senderImage,
                                            });
                                        }}>
                                        <Category
                                            imageUri={user.data.image ? { uri: user.data.image } : Images.tile2}
                                            onlineStus={user.data.active ? Images.online : ''}
                                            name={user.data.name}
                                            message="5 miles away"
                                        />
                                    </TouchableOpacity>
                                );
                            })
                            : null}
                    </ScrollView>
                </Header>
            </View>
        );
    }
}

export default Chat;
