import axios from 'axios';
import {put,call,takeEvery} from 'redux-saga/effects'
import * as type from '../actions/types'
import * as RootNavigation from '../../navigator/RootNavigation'
import { Alert } from 'react-native';

import {STORE_API_URL, GET_TOKEN_API_URL, EXPO_SERVER_URL} from '@env'
// dispatch: update value of state

function* storeTimeSheet(action){
    yield put({type: type.STORE_TIMESHEET_PENDING});//  dispatched to reducer with type = LOGING_PEDDING
    try { 
        // console.warn(JSON.stringify(action.timeSheetInfo.vehicleRoute));
        const response = yield axios.post(STORE_API_URL,{ 
            STORE_TYPE: action.storeType,// call api with parameta is passed to action
            TIMESHEET_ID : action.timeSheetInfo.timesheetID,
            DRIVER_ID : action.timeSheetInfo.driverID,
            DRIVER_NAME : action.timeSheetInfo.driverName,
            TRANSACTION_ID : action.timeSheetInfo.reqID,
            TRANSACTION_CODE:action.timeSheetInfo.reqCode,
            VEHICLE_ID : action.timeSheetInfo.vehicleID,
            VEHICLE_NO : action.timeSheetInfo.vehicleNo,
            ROUTE : action.timeSheetInfo.vehicleRoute,
            TIME_START : action.timeSheetInfo.startTime,
            TIME_FINISH : action.timeSheetInfo.finishTime,
            KM_START : action.timeSheetInfo.kmStart,
            KM_FINISH : action.timeSheetInfo.kmFinish,
            kmFinishImg : action.timeSheetInfo.kmFinishImg,
            KM_USING : action.timeSheetInfo.kmUsing,
            KM_LOST : action.timeSheetInfo.kmLost,
            OT_NORMAL : action.timeSheetInfo.normalOT,
            OT_SUNDAY : action.timeSheetInfo.sundayOT,
            OT_HOLIDAY : action.timeSheetInfo.holidayOT,
            OT_OVERNIGHT : action.timeSheetInfo.overNightOT,
            TOTAL_OT : action.timeSheetInfo.totalOT,
            ROAD_TAX : action.timeSheetInfo.roadTax,
            MEAL_FEE : action.timeSheetInfo.mealFee,
            ACCOM_FEE : action.timeSheetInfo.accomFee,
            OTHER_FEE : action.timeSheetInfo.otherFee,
            TOTAL_FEE : action.timeSheetInfo.totalFee,
            REMARK : action.timeSheetInfo.remark,
            REASON : action.timeSheetInfo.reason,
        }, {timeout:5000});
        const result = response.data; // data from api
        if(result[0].RESULT_STATUS === "success"){
            //Send notification
            if(action.storeType ==="Submit"||action.storeType ==="Reject"){
                sendNotification(action.timeSheetInfo.driverID, action.storeType);
            }

            Alert.alert("Thao tác thành công (Action successfully)!", "", [
                {
                text: "OK",
                onPress: () => {RootNavigation.navigate('TimeSheet')},
                style: "cancel"
                }
            ]);
            yield put({ // dispatch state and data to reducer
                type: type.STORE_TIMESHEET_SUCCESS
            });
        }else{
            Alert.alert("Thao tác thất bại (Action failed)!", "", [
                {
                text: "OK",
                onPress: () => {RootNavigation.navigate('TimeSheet')},
                style: "cancel"
                }
            ]);
            yield put({type: type.STORE_TIMESHEET_ERROR, error: 'Package store error'});
        }
    } catch (error) {
        console.log(error); //show error
        if(error.code === 'ECONNABORTED' || !error.response){
            Alert.alert('Warning', 'Please check your connection!')
        } else{
            Alert.alert('Error', 'Please try again later!')
        }
        yield put({type: type.STORE_TIMESHEET_ERROR, error: error});

    }
}

const sendNotification = async(driverId, type)=>{
    if(type === 'Submit'){
        try {
            let response = await axios.post(GET_TOKEN_API_URL, {"DriverID":0, "TokenType":type}, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            let tokenList = response.data;
            for (var i = 0; i < tokenList.length; i++) {
                let message = {
                    to:tokenList[i].TOKEN,
                    sound:'default',
                    title:'Timesheet Updating',
                    body:'A timesheet have been submitted, please check it down!'
                }
                await axios.post(EXPO_SERVER_URL, message);
            }

        } catch (error) {
            console.warn(error);
        }
    }
    
    if(type === 'Reject'){
        try {
            let response = await axios.post(GET_TOKEN_API_URL, {"DriverID":driverId, "TokenType":type}, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            let tokenList = response.data;
            for (var i = 0; i < tokenList.length; i++) {
                let message = {
                    to:tokenList[i].TOKEN,
                    sound:'default',
                    title: 'Timesheet Updating',
                    body:  'Your timesheet have been rejected, please check it down'
                }
                await axios.post(EXPO_SERVER_URL, message);
            }
        } catch (error) {
            console.warn(error);
        }
    }
}

function* storeSaga(){
    yield takeEvery(type.STORE_TIMESHEET, storeTimeSheet);
}
export default storeSaga;