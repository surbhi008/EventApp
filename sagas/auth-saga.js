import { put, takeLatest, all,call } from 'redux-saga/effects';
import { login, signup } from '../api/auth-api';

// fetch login
function* loginSaga(action) {
    const { callback, userName, password } = action.data       
    const json = yield call(login, "http://axe-ventura-api.vidhikaar.com/api/V1/Authentication/Login", {userName, password})
    if (callback) {
        callback(json)
    }
    yield put({ type: "login", json: json, });
}

function* actionWatcher() {
    yield takeLatest('LOGIN_API', loginSaga)
}

// export default function* rootSaga() {
//     yield all([
        
//     ]);
// }

// fetch signup
function* signupSaga(action) {
    const { callback, userName, email, password} = action.data       
    const json = yield call(signup, "http://axe-ventura-api.vidhikaar.com/api/V1/Authentication/Register", {userName, email, password})
    if (callback) {
        callback(json)
    }
    yield put({ type: "signup", json: json, });
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