import { put, takeEvery, call, take } from 'redux-saga/effects'
import { Api } from '../APIs/Api';


export function* increment (action) {
    try {
        console.log(action.params)
        const response = call(new Api().getJSON, 'categorie')
        console.log(response)
        // const action = yield take(response)
        // console.log(action)
        // yield put({type: 'FETCH_SUCCESS', data: response})
    } catch (err) {
        console.log(err)
        yield put({type: 'FETCH_FAIL'})
    }
}


export function* watchIncrement() {
    
    yield takeEvery('FETCH_START', increment);
};