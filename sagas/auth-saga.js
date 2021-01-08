import { put, takeLatest,call } from 'redux-saga/effects';
import { login, signup, forgotPassword} from '../api/auth-api';
import { web_urls } from '../api/api-const';

// fetch login
function* loginSaga(action) {
    const { callback, userName, password } = action.data       
    yield put({ type: "IS_LOADING", data: true, });
    const json = yield call(login, `${web_urls.BASE_URL}${web_urls.LOGIN_ENDPOINT}`, {userName, password})
    yield put({ type: "AUTH_DATA", data: json.data, });
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

// fetch signup
function* signupSaga(action) {
    const { callback, userName, email, password} = action.data   
    yield put({ type: "IS_LOADING", data: true, });    
    const json = yield call(signup, `${web_urls.BASE_URL}${web_urls.SIGNUP_ENDPOINT}`, {userName, email, password})
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

// fetch forgot password
function* forgotPasswordSaga(action) {
    const { callback, userEmail, userOTP, userPassword, type} = action.data   
    yield put({ type: "IS_LOADING", data: true, });    
    const json = yield call(forgotPassword, `${web_urls.BASE_URL}${web_urls.FORGOTPASSWORD_ENDPOINT}`, {userEmail, userOTP, userPassword, type})
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

export function* authActionWatcher() {
    yield takeLatest('LOGIN_API', loginSaga)
    yield takeLatest('SIGNUP_API', signupSaga)
    yield takeLatest('FORGOTPASSWORD_API', forgotPasswordSaga)
}