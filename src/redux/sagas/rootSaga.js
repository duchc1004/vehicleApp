import {all} from 'redux-saga/effects';
import authSaga from './authSaga'
import storeSaga from'./storeSaga'

export default function* rootSaga(){
    yield all([
        authSaga(),
        storeSaga()
    ])
}