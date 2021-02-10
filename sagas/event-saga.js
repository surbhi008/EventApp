import { put, takeLatest,call, select } from 'redux-saga/effects';
import { web_urls } from '../api/api-const';
import { fetchEventListApi, addEventApi, deleteEventApi, updateEventApi } from '../api/event-api';
import { getAuthData } from '../reducers/auth-reducer';

// fetch event list
function* fetchEventListSaga(action) {
    const { callback } = action.data       
    yield put({ type: "IS_LOADING", data: true, });
    const profileData = yield select(getAuthData);
    const json = yield call(fetchEventListApi, `${web_urls.BASE_URL}${web_urls.EVENT_LIST}/${profileData.userId}`)
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

// add event list
function* addEvent(action) {
    const { callback, data } = action.data       
    yield put({ type: "IS_LOADING", data: true, });
    const json = yield call(addEventApi, `${web_urls.BASE_URL}${web_urls.ADD_EVENT}`, data)
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

// delete event 
function* deleteEvent(action) {
    const { callback, id } = action.data       
    yield put({ type: "IS_LOADING", data: true, });
    const json = yield call(deleteEventApi, `${web_urls.BASE_URL}${web_urls.DELETE_EVENT}/${id}`)
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

// update event 
function* updateEvent(action) {
    const { callback, id, data } = action.data       
    yield put({ type: "IS_LOADING", data: true, });
    const json = yield call(updateEventApi, `${web_urls.BASE_URL}${web_urls.UPDATE_EVENT}/${id}`, data)
    if (callback) {
        callback(json)
    }
    yield put({ type: "IS_LOADING", data: false, });
}

export function* eventActionWatcher() {
    yield takeLatest('EVENT_LIST', fetchEventListSaga)
    yield takeLatest('ADD_EVENT', addEvent)
    yield takeLatest('DELETE_EVENT', deleteEvent)  
    yield takeLatest('UPDATE_EVENT', updateEvent)      
}