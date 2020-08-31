import { all, fork} from 'redux-saga/effects';

import { watchIncrement  } from './sagas';
import { watchRegister, watchLogin,watchSocialLogin, watchForgot, watchOtp, watchReset  } from './authSaga';
import { watchProfile, watchChange, watchUpdate,watchCreateEvent,watchEvents,watchFindAthlete,watchUpdateEvent,watchStatus  } from './profileSaga';
import { watchCategories, watchViewAllEvent } from './resourcesSaga';

export default function* rootSaga () {
  yield all([
    fork(watchIncrement),
    fork(watchRegister),
    fork(watchLogin),
    fork(watchSocialLogin),
    fork(watchForgot),
    fork(watchOtp),
    fork(watchReset),
    fork(watchProfile),
    fork(watchChange),
    fork(watchUpdate),
    fork(watchStatus),
    fork(watchCategories),
    fork(watchEvents),
    fork(watchCreateEvent),
    fork(watchFindAthlete),
    fork(watchViewAllEvent),
    fork(watchUpdateEvent),
  ]);
};