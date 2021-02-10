import { all } from 'redux-saga/effects';
import { authActionWatcher } from "./sagas/auth-saga";
import { eventActionWatcher } from './sagas/event-saga';
import { profileActionWatcher } from "./sagas/profile-saga";

export default function* rootSaga() {
  yield all([
      authActionWatcher(),
      profileActionWatcher(),
      eventActionWatcher()
  ]);
}