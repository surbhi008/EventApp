import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/auth-reducer';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import rootSaga from '../sagas/auth-saga';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

export default store