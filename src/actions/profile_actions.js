import types from '../types'
import {Api} from '../APIs/Api'
import Config from '../APIs/ApiConfig'
import * as Storage from '../APIs/AsyncStore'
import NavigationService from '../NavigationService';


export function getProfile() {
    
    return (dispatch)=>{
        dispatch({type:types.GET_PROFILE})
        new Api().postJSON(Config.profile)
        .then((obj) => {
            // console.log(obj)
            if (obj.status) {
                if(obj.response.block_status==1 || obj.response.delete_status==1) {
                    alert('Your Account has been blocked or deleted. Please contact administrator')
                    Storage.removeData('userId')
                    NavigationService.navigate('Authloading')
                }
                dispatch({type:types.PROFILE_SUCCESS, data:obj.response})
            } else {
                dispatch({type:types.PROFILE_FAILURE})
            }
        })
        .catch((error)=>{
            dispatch({type:types.PROFILE_FAILURE})
            console.log(error)
        })
    }
}

export function editProfile(firstname, lastname, email, postcode, profilepic) {

    var pars = {
        firstname,
        lastname,
        email,
        postcode,
        profilepic,
    }
    
    return (dispatch)=>{
        dispatch({type:types.GET_PROFILE})
        new Api().postJSON(Config.editprofile, pars)
        .then((obj) => {
            // console.log(obj)
            if (obj.status) {
                dispatch(getProfile())
            } else {
                dispatch({type:types.PROFILE_FAILURE})
            }
        })
        .catch((error)=>{
            dispatch({type:types.PROFILE_FAILURE})
            alert(JSON.stringify(error))
        })
    }
}

export function changePassword(oldpassword, newpassword, cpassword) {

    var pars = {
        oldpassword,
        newpassword,
        cpassword

    }
    
    return new Promise((resolve,reject)=> {
        new Api().postJSON(Config.changepassword, pars)
        .then((obj) => {
            // console.log(obj)
            if (obj.status) {
                resolve(obj)
            } else {
                reject(obj.message)
            }
        })
        .catch((error)=>{
            reject(JSON.stringify(error))
        })
    })
}