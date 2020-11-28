import { put, call, select, takeLatest } from 'redux-saga/effects';
import { getAuthData } from '../reducers/auth-reducer';
import { web_urls } from '../api/api-const';
import { profile, updateProfile } from '../api/profile-api';

function* getProfileSaga() {
    yield put({ type: "IS_LOADING", data: true, });
    const profileData = yield select(getAuthData); 
    const json = yield call(profile, `${web_urls.BASE_URL}${web_urls.PROFILE_ENDPOINT}/${profileData.userId}/a`)
    yield put({ type: "PROFILE_DATA", data: json.data, });  
    yield put({ type: "IS_LOADING", data: false, });
}

// fetch Update Profile
function* updateProfileSaga(action) {
    const { callback, userId, userName, fullName, email, imageURL, miles, address, locationLatLong, password} = action.data   
    yield put({ type: "IS_LOADING", data: true, });
    const profileData = yield select(getAuthData);
    const json = yield call(updateProfile, `${web_urls.BASE_URL}${web_urls.UPDATE_PROFILE_ENDPOINT}/${profileData.userId}/a`, { userId, userName, fullName, email, imageURL, miles, address, locationLatLong, password})
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

export function* profileActionWatcher() {
    yield takeLatest('PROFILE_API', getProfileSaga)
    yield takeLatest('UPDATEPROFILE_API', updateProfileSaga)
}

