/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

export const creatUser = id => {
    // console.log('create user fires', id);
    firestore()
        .collection('Users')
        .doc(id)
        .get()
        .then(documentSnapshot => {
            if (documentSnapshot.exists) {
                // console.log('User data: ', documentSnapshot.data());
            } else {
                firestore()
                    .collection('Users')
                    .doc(id)
                    .set({
                        name: id,
                        active: true,
                    })
                    .then(() => {
                        console.log('User added on firestore!');
                    });
            }
        });
};

export const setOffline = async () => {
    const user = await AsyncStorage.getItem('userId');
    if (user) {
        firestore()
            .collection('Users')
            .doc(user)
            .update({
                active: false,
            })
            .then(() => {
                console.log('User updated on firestore!');
            });
    }
};

export const getUserData = async id => {
    let userData = {};
    await firestore()
        .collection('Users')
        .doc(id)
        .get()
        .then(async documentSnapshot => {
            if (documentSnapshot.exists) {
                userData = {
                    id: documentSnapshot.id,
                    data: documentSnapshot.data(),
                };
            }
        });
    return userData;
};
