/* eslint-disable prettier/prettier */
import { put, takeEvery, call, take } from 'redux-saga/effects';
import { Api } from '../APIs/Api';
import ApiConfig from '../APIs/ApiConfig';
import types from '../types';
import * as Storage from '../APIs/AsyncStore';
import NavigationService from '../NavigationService';


function* register(action) {
    try {
        const response = yield call(new Api().postJSON, ApiConfig.register, action.params);
        if (response.status) {
            Storage.saveData('userId', String(response.userid));
            Storage.saveData('role', String(response.data.user_type));
            action.callback(false, response);
            yield put({ type: types.AUTH_SUCCESS });
            NavigationService.navigate('Authloading');
        } else {
            action.callback(true, response.message);
            yield put({ type: types.AUTH_FAIL });
        }
    } catch (err) {
        action.callback(true, 'Something Went Wrong');
        yield put({ type: types.AUTH_FAIL });
    }
}

function* login(action) {
    try {
        const response = yield call(new Api().postJSON, ApiConfig.login, action.params);
        if (response.status) {
            Storage.saveData('userId', String(response.data.userid));
            Storage.saveData('role', String(response.data.user_type));
            action.callback(false, response);
            yield put({ type: types.AUTH_SUCCESS });
            NavigationService.navigate('Authloading');
        } else {
            action.callback(true, response.message);
            yield put({ type: types.AUTH_FAIL });
        }
    } catch (err) {
        action.callback(true, 'Something Went Wrong');
        yield put({ type: types.AUTH_FAIL });
    }
}
function* socialLogin(action) {
    try {
        const response = yield call(new Api().postJSON, ApiConfig.socialLogin, action.params);
        console.log(response);
        if (response.status) {

            Storage.saveData('userId', String(response.userid));
            Storage.saveData('role', String(response.user_type));
            action.callback(false, response);
            yield put({ type: types.AUTH_SUCCESS });
            NavigationService.navigate('Authloading');
        } else {
            action.callback(true, response.message);
            yield put({ type: types.AUTH_FAIL });
        }
    } catch (err) {
        action.callback(true, 'Something Went Wrong');
        yield put({ type: types.AUTH_FAIL });
    }
}

function* forgot(action) {
    try {
        const response = yield call(new Api().postJSON, ApiConfig.forgotPassword, action.params);
        if (response.status) {
            if (!action.otp) {
                action.callback(false, response);
            }
            yield put({ type: types.AUTH_SUCCESS });
        } else {
            action.callback(true, response.message);
            yield put({ type: types.AUTH_FAIL });
        }
    } catch (err) {
        action.callback(true, 'Something Went Wrong');
        yield put({ type: types.AUTH_FAIL });
    }
}

function* submitOTP(action) {
    try {
        const response = yield call(new Api().postJSON, ApiConfig.verifyOtp, action.params);
        if (response.status) {
            action.callback(false, response);
            yield put({ type: types.AUTH_SUCCESS });
        } else {
            action.callback(true, 'You entered wrong otp');
            yield put({ type: types.AUTH_FAIL });
        }
    } catch (err) {
        action.callback(true, 'Something Went Wrong');
        yield put({ type: types.AUTH_FAIL });
    }
}

function* resetPassword(action) {
    console.log(action.params);
    try {
        const response = yield call(new Api().postJSON, ApiConfig.resetPassword, action.params);
        if (response.status) {
            // action.callback(false, response)
            alert(response.message);
            Storage.saveData('userId', String(response.data.id));
            Storage.saveData('role', String(response.data.user_type));
            yield put({ type: types.AUTH_SUCCESS });
            NavigationService.navigate('Authloading');
        } else {
            // action.callback(true, response.message)
            yield put({ type: types.AUTH_FAIL });
        }
    } catch (err) {
        // action.callback(true, 'Something Went Wrong')
        yield put({ type: types.AUTH_FAIL });
    }
}

export function* watchReset() {

    yield takeEvery(types.RESET_START, resetPassword);
}

export function* watchOtp() {

    yield takeEvery(types.OTP_START, submitOTP);
}

export function* watchForgot() {

    yield takeEvery(types.FORGOT_START, forgot);
}

export function* watchLogin() {

    yield takeEvery(types.LOGIN_START, login);
}
export function* watchSocialLogin() {

    yield takeEvery(types.SOCIAL_LOGIN_START, socialLogin);
}

export function* watchRegister() {

    yield takeEvery(types.REGISTER_START, register);
}
