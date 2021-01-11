import { put, takeLatest,call } from 'redux-saga/effects';
import { login, signup, forgotPassword, resetPassword, verifyOtp} from '../api/auth-api';
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
    const { callback, email, userOTP, userPassword, type} = action.data   
    yield put({ type: "IS_LOADING", data: true, });    
    const json = yield call(forgotPassword, `${web_urls.BASE_URL}${web_urls.FORGOTPASSWORD_ENDPOINT}/${email}`, {email, userOTP, userPassword, type})
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

function* callVerifyOtp(action) {
    const { callback, email, otp} = action.data   
    yield put({ type: "IS_LOADING", data: true, });    
    const json = yield call(verifyOtp, `${web_urls.BASE_URL}${web_urls.VERIFY_OTP}/${email}/${otp}`)
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

function* callChangePassword(action) {
    const { callback, email, password, token} = action.data   
    yield put({ type: "IS_LOADING", data: true, });    
    const json = yield call(resetPassword, `${web_urls.BASE_URL}${web_urls.RESET_PASSWORD}`, {email, password, token})
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

export function* authActionWatcher() {
    yield takeLatest('LOGIN_API', loginSaga)
    yield takeLatest('SIGNUP_API', signupSaga)
    yield takeLatest('FORGOTPASSWORD_API', forgotPasswordSaga)
    yield takeLatest('CALL_VERIFY_OTP', callVerifyOtp)
    yield takeLatest('CALL_CHANGE_PASSWORD', callChangePassword)
}