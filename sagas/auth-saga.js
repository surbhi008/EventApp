import { put, takeLatest, all,call } from 'redux-saga/effects';
import { login, signup } from '../api/auth-api';

// fetch login
function* loginSaga(action) {
    const { callback, userName, password } = action.data       
    yield put({ type: "IS_LOADING", data: true, });
    const json = yield call(login, "http://event-api.vidhikaar.com/api/V1/Authentication/Login", {userName, password})
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

function* actionWatcher() {
    yield takeLatest('LOGIN_API', loginSaga)
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

function* actionWatcherSignUp() {
    yield takeLatest('SIGNUP_API', signupSaga)
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
        actionWatcherSignUp(),
    ]);
}