import { put, takeLatest,call } from 'redux-saga/effects';
import { login, signup } from '../api/auth-api';
import { web_urls } from '../api/api-const';

// fetch login
function* loginSaga(action) {
    const { callback, userName, password } = action.data       
    yield put({ type: "IS_LOADING", data: true, });
    const json = yield call(login, `${web_urls.BASE_URL}${web_urls.LOGIN_ENDPOINT}`, {userName, password})
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

// fetch signup
function* signupSaga(action) {
    const { callback, userName, email, password} = action.data   
    yield put({ type: "IS_LOADING", data: true, });    
    const json = yield call(signup, "http://event-api.vidhikaar.com/api/V1/Authentication/Register", {userName, email, password})
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

export function* authActionWatcher() {
    yield takeLatest('LOGIN_API', loginSaga)
    yield takeLatest('SIGNUP_API', signupSaga)
}