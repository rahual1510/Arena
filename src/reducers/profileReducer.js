/* eslint-disable prettier/prettier */
import types from '../types';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    loading: false,
    userProfile: {},
    fName: '',
    lName: '',
    email: '',
    image: '',
    userEvents: [],
    athleteList: [],
};

updateUser = async (data) => {
    const user = await AsyncStorage.getItem('userId');
    if (user) {
        firestore()
            .collection('Users')
            .doc(user)
            .update({
                name: data.first_name + ' ' + data.last_name,
                image: data.image ? data.image : '',
            })
            .then(() => {
                console.log('User updated on firestore!');
            });
    }
};

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.GET_PROFILE:
        case types.CHANGE_PASS:
        case types.GET_MYEVENYTS:
        case types.FINDATHLETE_START:
        case types.CREATE_EVENT_START:
        case types.UPDATE_STATUS:
        case types.UPDATE_EVENT_START:
            return {
                ...state,
                loading: true,
            };
        case types.PROFILE_SUCCESS:
            this.updateUser(action.data);
            return {
                ...state,
                loading: false,
                userProfile: action.data,
            };
        case types.CHANGE_PASS_SUCCESS:
        case types.PROFILE_FAILURE:
        case types.EVENTS_FAILURE:
        case types.UPDATE_SUCCESS:
        case types.UPDATE_FAIL:
            return {
                ...state,
                loading: false,
            };
        case types.GET_MYEVENYTS_SUCCESS:
            return {
                ...state,
                loading: false,
                userEvents: action.data,
            };
        case types.ATHLETE_SUCCESS:
            return {
                ...state,
                loading: false,
                athleteList: action.data,
            };
        case types.CREATE_EVENT_FAILURE:
        case types.CREATE_EVENT_START_SUCCESS:
        case types.UPDATE_EVENT_SUCCESS:
        case types.UPDATE_EVENT_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case types.LOGOUT:
            return state = initialState;
        default:
            return state;
    }
};
