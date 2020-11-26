import { createStore, applyMiddleware } from 'redux';
import authReducer from '../reducers/auth-reducer';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import rootSaga from '../sagas/auth-saga';
import profileReducer from '../reducers/profile-reducer';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    authReducer,
    profileReducer,
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

export default store