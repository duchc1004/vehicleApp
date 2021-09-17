import React, { useState,useEffect } from 'react';
import { View, ScrollView, Alert} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Moment from 'moment';

import {REQUEST_DETIAL_API_URL} from '@env';

import Header from '../components/Header';
import Loading from '../components/Loading';
import LineInfo from '../components/LineInfo';
import Category from '../components/Category';

import {sizes, colors} from '../assets/styles';
import { vi,en } from '../assets/language'
import * as RootNavigation from '../navigator/RootNavigation';
import { useIsFocused } from "@react-navigation/native";

import timesheet_w from '../assets/images/timesheet_w.png';
import back from '../assets/images/back.png';

function RequestDetail (props) {
    const [langText, setLangText] = useState(vi);
    const isFocused = useIsFocused();
    const { route } = props;
    const [requestData, setRequestData] = useState({});
    const [loading, setLoading] = useState(false);  
    
    useEffect(() => {
        if(isFocused){ 
            // Set language
            if(props.language === 'en'){
                setLangText(en);
            }else if(props.language === 'vi') {
                setLangText(vi);
            }

            let mounted = true
            fetchMyAPI(route.params.requestID).then(() => {
                if (mounted) {
                    setLoading(false)
                }
            })

            return function cleanup() {
                mounted = false
            }
        }
    },[props, isFocused]);

    const fetchMyAPI = async (_requsetID) => {
        const params = {
            "requestID":_requsetID
        };
        try {
            let response = await axios.post(REQUEST_DETIAL_API_URL, params, {
                headers: {
                    'content-type': 'application/json',
                },
            });
            let json = response.data;
            let firstJson = json[0];
            setRequestData(firstJson);
        } catch (error) {
          console.warn(error);
        }
    }

    const createTimeSheet = () => {
        RootNavigation.navigate('TimeSheetDetail', {
            timesheetID: 0, driverName:requestData.DRIVER_NAME, reqID: requestData.TRANSACTION_ID, vehicleID: requestData.VEHICLE_ID, vehicleNo:requestData.VEHICLE_NO , route: requestData.ROUTE, lastKm:requestData.LAST_KM
        })
    }

    const showTimesheet = (id) => {
        if(id !==0){
            RootNavigation.navigate('TimeSheetDetail', {
                timesheetID: id
            });
        }else{
            if(props.appRole ==='Driver'){
                Alert.alert("No Timesheet Created!", "Do you want add timesheet?", [
                    {
                      text: "Cancel",
                      onPress: () => {return false},
                      style: "cancel"
                    },
                    { text: "YES", onPress: () =>  createTimeSheet()
                    }
                ]);
            }else{
                Alert.alert("No Timesheet Created!");
            }
            
        }
    }

    return (
        <View style={{flex:1, backgroundColor:colors.CLOUD, padding:sizes.SIZE_3}}>
            <Header title="Request Detail" leftIcon={back} onLeftPress={()=> RootNavigation.navigate('Request')}  rightIcon = {timesheet_w} showRightIcon={true} onRightIconPress={()=> showTimesheet(requestData.TIMESHEET_ID)}/>
            <ScrollView>
                <View style = {{flex:1,padding:sizes.SIZE_5, marginBottom:sizes.SIZE_10}}>
                    <LineInfo type ={'text'} pressable = {false} editable = {false} titles={langText.driver} value={requestData.DRIVER_NAME} />
                    <LineInfo type ={'text'} pressable = {false} editable = {false} titles={langText.vehicle} value={requestData.VEHICLE_NO} />
                    <Category text={langText.route}/>
                    <LineInfo type ={'text'} pressable = {false} editable = {false} titles={langText.from} value={Moment(requestData.FROM_DATE).format('DD/MM/YYYY HH:mm')}/>
                    <LineInfo type ={'text'} pressable = {false} editable = {false} titles={langText.to} value={Moment(requestData.TO_DATE).format('DD/MM/YYYY HH:mm')} />
                    <LineInfo type ={'text'} pressable = {false} editable = {false} type ={'area'} titles={langText.route} value={requestData.ROUTE} />   
                    <Category text={langText.userInfo}/>
                    <LineInfo type ={'text'} pressable = {false} editable = {false} titles={langText.qtyUser} value={requestData.USING_PEOPLE?requestData.USING_PEOPLE.toString():''.toString()} />   
                    <LineInfo type ={'text'} pressable = {false} editable = {false} titles={langText.userPhone} value={requestData.PHONE_USERS} />   
                    <LineInfo type ={'text'} pressable = {false} editable = {false} titles={langText.listUser} value={requestData.LIST_USERS} />   
                    <LineInfo type ={'text'}pressable = {false} editable = {false} titles={langText.airport} value={requestData.AIR_PORT} />   
                    <LineInfo type ={'area'} pressable = {false} editable = {false} titles={langText.remark} value={requestData.REMARK_ADM} />   
                    <LineInfo type ={'text'} pressable = {false} editable = {false} titles={langText.carpool} value={requestData.CARPOOL} />   
                </View>
            </ScrollView>
            <Loading showLoading= {loading}/>
        </View>
    )
}

const mapStateToProps = (state) => ({
    appRole : state.authReducer.appRole,
    language: state.settingReducer.language
    
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetail)
