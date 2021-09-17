import React, {  useEffect, useState } from 'react';
import { Text, FlatList, View,TouchableOpacity,Image } from 'react-native';

import axios from 'axios';
import Moment from 'moment';
import {connect} from 'react-redux';

import {REQUEST_API_URL} from '@env';

import Loading from '../components/Loading';
import Header from '../components/Header';

import * as RootNavigation from '../navigator/RootNavigation';
import { useIsFocused } from "@react-navigation/native";
import {sizes, colors, styles} from '../assets/styles';
import { vi, en } from '../assets/language';


import request from '../assets/images/request.png';

function RequestScreen(props) {
    const isFocused = useIsFocused();
    const [langText, setLangText] = useState(vi);

    const [filterData, setFilterData] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [isFetching, setIsFetching] = useState(false)
    const [loading, setLoading] = useState(false);
    const [allTap, setAllTap] = useState(true);
    const [todayTap, setTodayTap] = useState(false);
    const [allQty, setAllQty] = useState(0);
    const [todayQty, setTodayQty] = useState(0);


    useEffect(() => {
        if(isFocused){ 
            // Set language
            if(props.language === 'en'){
                setLangText(en);
            }else if(props.language === 'vi') {
                setLangText(vi);
            }

            let mounted = true
            fetchMyAPI(props.loggedInUser.DRIVER_ID, props.appRole).then(() => {
                if (mounted) {
                    setLoading(false)
                }
            })

            return function cleanup() {
                mounted = false
            }
        }
    },[props, isFocused]);

    const fetchMyAPI = async  (_driverID, _role) => {
        const params = {
            "driverID":_driverID,
            "role":_role,
        };
        try {
            let response = await axios.post(REQUEST_API_URL, params, {
                headers: {
                    'content-type': 'application/json',
                },
            });
            let json = response.data;
            setFilterData(json);
            setMasterData(json);
            setQty(json);
        } catch (error) {
            console.warn(error);
        }
    }

    const onRefresh = () => {
        let mounted = true
        setIsFetching(true);
        fetchMyAPI(props.loggedInUser.DRIVER_ID, props.appRole).then(() => {
            if (mounted) {
                setLoading(false)
                setIsFetching(false);
            }
        })
    }

    const setQty = (json) =>{
        // setAllQty
        if(json[0].TRANSACTION_ID === 0){
            setAllQty(0);
        }else{
            setAllQty(json.length);
        }
        // setTodayQTy
        const newData = json.filter((item)=>{
            const itemData = item.FROM_DATE? Moment(item.FROM_DATE).format('DDMMYYYY'):'';
            const textData = Moment(new Date()).format('DDMMYYYY');
            return itemData.indexOf(textData) > -1;
        });
        setTodayQty(newData.length);
    }

    const showRequestDetail = (id) => {
        RootNavigation.navigate('RequestDetail', {
            requestID: id
        });
    }

    const searchFilter = (text) => {
        if (text ==='Today'){
            setAllTap(false);
            setTodayTap(true);
        }else{
            setAllTap(true);
            setTodayTap(false);
        }
        if(text === 'Today'){
            const newData = masterData.filter((item)=>{
                const itemData = item.FROM_DATE? Moment(item.FROM_DATE).format('DDMMYYYY'):'';
                const textData = Moment(new Date()).format('DDMMYYYY');
                return itemData.indexOf(textData) > -1;
            });
            setFilterData(newData);
        } else {
            setFilterData(masterData);
        }
    }

    const renderView = ({item}) => {
        return(
            <>
            {item.TRANSACTION_ID !== 0 && 
            <TouchableOpacity style={[styles.renderView, item.TIMESHEET_STATUS ==='Submitted'&&{borderColor:colors.DS2},item.TIMESHEET_STATUS ==='Rejected'&&{borderColor:colors.WARNING}]} onPress={()=> showRequestDetail(item.TRANSACTION_ID)}>
                <View style={{ flex:1, justifyContent:'center', alignItems:'center', padding:sizes.SIZE_5}}>
                    <Image source = {request} style = {{width: sizes.SIZE_40, height:sizes.SIZE_40, resizeMode:'contain'}}/>
                </View>
                <View style={styles.textContainer}>
                    <View style ={{flexDirection:"row"}}>
                        <Text style={[styles.title,{flex:2}]}>{item.VEHICLE_NO}</Text>
                        <Text style={{flex:1, fontSize:sizes.FONT_10, color:colors.BLACK}}>{Moment(item.CONFIRMED_DATE).format('HH:mm DD/MM/YYYY')}</Text>
                    </View>
                    <Text style={styles.route}>{Moment(item.FROM_DATE).format('HH:mm DD/MM/YYYY ')}- {Moment(item.TO_DATE).format('HH:mm DD/MM/YYYY')}</Text>
                    <Text numberOfLines={1} style={styles.route}>{item.ROUTE}</Text>
                </View>
            </TouchableOpacity>
            }
            </>
        )
    }

    return (
        <View style={{flex:1, backgroundColor:colors.CLOUD, padding:sizes.SIZE_3}}>
            <Header title={langText.request}/>
            <View style={styles.tabQty}>
                <TouchableOpacity style = {{flex:1, justifyContent:'center'}} onPress={()=>searchFilter('All')}>
                    <Text style ={[styles.textSearchDefault, allTap && styles.textSearchOn]}>{langText.all}({allQty})</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{flex:1, justifyContent:'center' }} onPress={()=>searchFilter('Today')}>
                    <Text style ={[styles.textSearchDefault, todayTap && styles.textSearchOn]}>{langText.today}({todayQty})</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                useFlatList={true}
                keyExtractor={(item,index) => index.toString()}
                data={filterData}
                renderItem={renderView}
                onRefresh={onRefresh}
                refreshing={isFetching}
            />
            <Loading showLoading= {loading}/>
        </View>
    )
}

const mapStateToProps = (state) => ({
    loggedInUser: state.authReducer.loggedInUser,
    appRole : state.authReducer.appRole,
    language: state.settingReducer.language
})

const mapDispatchToProp = (dispatch) =>({
})

const Request = connect(mapStateToProps, mapDispatchToProp)(RequestScreen)

export default Request


