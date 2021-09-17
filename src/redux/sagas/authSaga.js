import axios from 'axios';
import {put,call,takeEvery} from 'redux-saga/effects'
import * as type from '../actions/types'
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

import {LOGIN_API_URL, SAVE_TOKEN_API_URL} from '@env'
// dispatch: update value of state

function* login(action){
    yield put({type: type.LOGIN_PENDING});//  dispatched to reducer with type = LOGING_PEDDING
    try { 
        const response = yield axios.post(LOGIN_API_URL,{ // call api with parameta is passed to action
            username: action.loginInput.username,
            password: action.loginInput.password
        }, {timeout:5000});

        const userInfo = response.data; // data from api
        if(userInfo[0].DRIVER_ID == ''){
            Alert.alert('Login Failed', 'Incorrect user ID or password!')
            yield put({type: type.LOGIN_ERROR});
        }else{
            yield put({ // dispatch state and data to reducer
                type: type.LOGIN_SUCCESS,
                loggedInUser: userInfo[0]
            });
            getNotificationToken(userInfo[0].DRIVER_ID)
        }
            

        
    } catch (error) {
        console.log(error); //show error
        if(error.code == 'ECONNABORTED' || !error.response){
            Alert.alert('Warning', 'Please check your connection!')
        } else{
            Alert.alert('Error', 'Please try again later!')
        }
        yield put({type: type.LOGIN_ERROR, error: error});

    }
}

const getNotificationToken = async (driverID) => {
    const {status} = await Notifications.getPermissionsAsync();
    if (status !=='granted'){
        const {status} = await Notifications.requestPermissionsAsync();
        if (status !== 'granted'){
            alert('Failed to get Notification Token')
            return
        }
    }
    const tokenData = await Notifications.getExpoPushTokenAsync()
    const token = tokenData.data;
    
    try {
        let response =  await axios.post(SAVE_TOKEN_API_URL, {"driverID":driverID, "token":token}, {
            headers: {
                'content-type': 'application/json',
            },
        });
        let result = response.data;
        if(result[0].RESULT_STATUS !=='success'){
            alert('Error in getting Notification')
        }
    } catch (error){
        console.warn(error);
    }
}

function* authSaga(){
    yield takeEvery(type.LOGIN, login)// call function login whenery reducer call type = type.LOGIN
}
export default authSaga;