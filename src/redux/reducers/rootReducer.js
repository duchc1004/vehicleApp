import {combineReducers} from 'redux'
import authReducer from './authReducer'
import storeReducer from './storeReducer'
import settingReducer from './settingReducer'
const rootReducer = combineReducers({
    authReducer,
    storeReducer,
    settingReducer
});

export default rootReducer;