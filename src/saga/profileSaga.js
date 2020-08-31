import { put, takeEvery, call, take, } from 'redux-saga/effects'
import { Api } from '../APIs/Api';
import types from '../types';
import ApiConfig from '../APIs/ApiConfig'
import NavigationService from '../NavigationService';


function* getProfile (action) {
    try {
        const response = yield call(new Api().postJSON, ApiConfig.getProfile)
        console.log(response)
        if(response.status) {
            yield put({type: types.PROFILE_SUCCESS, data: response.data})
        } else {
            yield put({type: types.PROFILE_FAILURE})
        }
    } catch (err) {
        yield put({type: types.PROFILE_FAILURE})
    }
}

function* updatestatus (action) {
    try {
        const response = yield call(new Api().postJSON, ApiConfig.updateStatus,action.params)
        console.log(response)
        if(response.status) {
            action.callback(false, response)
            yield call(getProfile);
            yield put({type: types.UPDATE_SUCCESS})
        } else {
            yield put({type: types.UPDATE_FAIL})
        }
    } catch (err) {
        yield put({type: types.UPDATE_FAIL})
    }
}


function* changePass(action) {
    try {
        const response = yield call(new Api().postJSON, ApiConfig.changePassword, action.params)
        if(response.status) {
            action.callback(false, response)
            yield put({type: types.CHANGE_PASS_SUCCESS})
        } else {
            action.callback(true, response.message)
            yield put({type: types.PROFILE_FAILURE})
        }
    } catch (err) {
        action.callback(true, 'Something went wrong')
        yield put({type: types.PROFILE_FAILURE})
    }
}

function* updateProfile(action) {
    try {
        const response = yield call(new Api().postJSON, ApiConfig.updateProfile, action.params)
        console.log(response)
        yield call(getProfile);
        if(response.status) {
            action.callback(false, response)
            yield put({type: types.CHANGE_PASS_SUCCESS, data : response.data})
        } else {
            action.callback(true, response.message)
            yield put({type: types.PROFILE_FAILURE})
        }
    } catch (err) {
        action.callback(true, 'Something went wrong')
        yield put({type: types.PROFILE_FAILURE})
    }
}

function* getmyEvent (action) {
    try {
        const response = yield call(new Api().postJSON, ApiConfig.getmyEvent)
        console.log(response) 
        if(response.status == true) {
            // action.callback(false, response)
            yield put({type: types.GET_MYEVENYTS_SUCCESS, data: response.data})
        } 
        else {
            yield put({type: types.EVENTS_FAILURE})
        }
    } catch (err) {
        yield put({type: types.EVENTS_FAILURE})
    }
}


function* createEvent(action) {
    try {
        const response = yield call(new Api().postJSON, ApiConfig.createEvents, action.params)
        console.log(response)
        if(response.status == true) {
            action.callback(false, response)
            yield call(getmyEvent);
            // action.navigation.goBack();
            yield put({type: types.CREATE_EVENT_START_SUCCESS})
        } else {
            alert(response.message)
            yield put({type: types.CREATE_EVENT_FAILURE})
        }
    } catch (err) {
        console.log(err)
        yield put({type: types.CREATE_EVENT_FAILURE})
    }
}

function* updateEvent(action) {
    try {
        const response = yield call(new Api().postJSON, ApiConfig.updateEvent, action.params)
        console.log(response)
        if(response.status == true) {
            yield call(getmyEvent);
            action.navigation.pop(2);
            yield put({type: types.UPDATE_EVENT_SUCCESS})
        } else {
            alert(response.message)
            yield put({type: types.UPDATE_EVENT_FAILURE})
        }
    } catch (err) {
        console.log(err)
        yield put({type: types.UPDATE_EVENT_FAILURE})
    }
}


function* viewathelete(action) {
    try {
        const response = yield call(new Api().postJSON, ApiConfig.viewAthletes, action.params)
        console.log(response)
        if(response.status) {
            yield put({type: types.ATHLETE_SUCCESS, data : response.data})
            NavigationService.navigate('FindEvent')
        } else {
            alert(response.message)
            yield put({type: types.ATHLETE_FAILURE})
        }
    } catch (err) {
        alert('Something went wrong')
        yield put({type: types.ATHLETE_FAILURE})
    }
}
export function* logout() {
    return {
        type:types.LOGOUT
    }
}
export function* watchUpdate() {
    
    yield takeEvery(types.UPDATE_PROFILE, updateProfile);
};
export function* watchStatus() {
    
    yield takeEvery(types.UPDATE_STATUS, updatestatus);
};

export function* watchChange() {
    
    yield takeEvery(types.CHANGE_PASS, changePass);
};

export function* watchProfile() {
    
    yield takeEvery(types.GET_PROFILE, getProfile);
};

export function* watchEvents() {
    
    yield takeEvery(types.GET_MYEVENYTS, getmyEvent);
};

export function* watchCreateEvent() {
    
    yield takeEvery(types.CREATE_EVENT_START, createEvent);
};

export function* watchFindAthlete() {
    
    yield takeEvery(types.FINDATHLETE_START, viewathelete);
};

export function* watchUpdateEvent() {
    
    yield takeEvery(types.UPDATE_EVENT_START, updateEvent);
};