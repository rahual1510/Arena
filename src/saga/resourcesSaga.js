import { put, takeEvery, call, take } from 'redux-saga/effects'
import { Api } from '../APIs/Api';
import types from '../types';
import ApiConfig from '../APIs/ApiConfig'
import NavigationService from '../NavigationService';


function* getCategories () {
    try {
        const response = yield call(new Api().getJSON, ApiConfig.sportCategory)
        console.log(response)
        if(response.status) {
            yield put({type: types.CATEGORIES_SUCCESS, data: response.data})
        } else {
            yield put({type: types.CATEGORIES_FAILURE})
        }
    } catch (err) {
        yield put({type: types.CATEGORIES_FAILURE})
    }
}

function* viewallevent (action) {
    try {
        console.log(action)
        console.log("view All Events>>>",action)
        const response = yield call(new Api().postJSON, ApiConfig.viewAllEvents, action.param)
        console.log(response)
        if(response.status) {
        
            yield put({type: types.ALLEVENT_SUCCESS, data: response.data})
            // NavigationService.navigate('ViewEvents')
        } else {
            yield put({type: types.ALLEVENT_FAILURE})
        }
    } catch (err) {
        yield put({type: types.ALLEVENT_FAILURE})
    }
}

export function* watchCategories() {
    
    yield takeEvery(types.GET_CATEGORIES, getCategories);
};

export function* watchViewAllEvent() {
    
    yield takeEvery(types.ALLEVENT_START, viewallevent);
};
