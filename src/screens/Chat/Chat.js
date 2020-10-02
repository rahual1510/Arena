/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Images from '../../util/images';
import Category from './Category';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import { getUserData } from '../../Firestore/UsersCollection';
import { connect } from 'react-redux';

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

    getMessages = async messageID => {
        this.setState({
          messageGroupId: messageID,
        });
        firestore().collection('messages')
          .doc(messageID)
          .collection('messages')
          .onSnapshot(this.onResult, this.onError);
      };

    chatAccounts = async () => {
        let chatDetails = [];
        await firestore()
            .collection('chat')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    let data = documentSnapshot.id.split('-');
                    if (data[0] === this.state.currentUserId) {
                        chatDetails.push({
                            userID: data[1],
                            chatData: documentSnapshot.data()
                        });
                    }
                });
            });
        this.getUserData(chatDetails);
    };

    getUserData = async chatDetails => {
        let users = [];
        await firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    chatDetails.forEach(chat => {
                        if (chat.userID == documentSnapshot.id) {
                            let userData = {
                                id: documentSnapshot.id,
                                data: documentSnapshot.data(),
                                chatData: chat.chatData
                            };
                            users.push(userData);
                        }
                    })
                });
            });
        this.setState({ users });
        console.log(users)
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
                                            onlineStus={user.data.active ? Images.online : Images.online}
                                            name={user.data.name}
                                            chatData={user.chatData}
                                            userId={this.props.userProfile.userid}
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

const mapStateToProps = (state) => ({
    userProfile: state.profileReducer.userProfile,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
