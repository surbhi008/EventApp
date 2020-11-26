import { createStore, applyMiddleware } from 'redux';
import authReducer from '../reducers/auth-reducer';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import profileReducer from '../reducers/profile-reducer';
import rootSaga from '../root-saga';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    authReducer,
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

export default store