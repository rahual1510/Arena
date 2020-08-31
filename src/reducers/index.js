import { combineReducers } from 'redux';

import * as resourcesReducer from './resourcesReducer'
import * as authReducer from './authReducer'
import * as profileReducer from './profileReducer'

export default combineReducers(Object.assign(
    authReducer,
    resourcesReducer,
    profileReducer
));