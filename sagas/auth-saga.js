import { put, takeLatest, all,call } from 'redux-saga/effects';
import { login } from '../api/auth-api';

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

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}