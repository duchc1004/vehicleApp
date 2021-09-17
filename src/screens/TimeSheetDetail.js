import React, { useState,useEffect } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, Modal, FlatList, Alert, BackHandler, TouchableWithoutFeedback} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator'
import { useIsFocused } from "@react-navigation/native";
import { connect } from 'react-redux';
import axios from 'axios';
import Moment from 'moment';

import {TIMESHEET_DETAIL_API_URL, GET_VEHICLE_LIST_API_URL} from '@env';


import Header from '../components/Header';
import Loading from '../components/Loading';
import CustomButton from '../components/CustomButton';
import LineInfo from '../components/LineInfo';
import Category from '../components/Category';
import FromToCategory from '../components/FromToCategory';

import {storeTimesheet} from '../redux/actions';
import {sizes, colors, styles} from '../assets/styles';
import { vi,en } from '../assets/language';
import * as RootNavigation from '../navigator/RootNavigation';

import draft from '../assets/images/draft.png';
import submit from '../assets/images/submit.png';
import reject from '../assets/images/reject.png';
import km from '../assets/images/km.png';
import fee from '../assets/images/fee.png';
import list from '../assets/images/list.png';
import km_blur from '../assets/images/km_blur.png';
import fee_blur from '../assets/images/fee_blur.png';
import back from '../assets/images/back.png';


function TimeSheetDetail (props) {
    const { route } = props;
    const isFocused = useIsFocused();
    const [langText, setLangText] = useState(vi);
    const [showRightIcon, setShowRightIcon] = useState(true);
    //
    const [loading, setLoading] = useState(true);
    const [onReq, setOnReq] = useState(true);
    const [onFee, setOnFee] = useState(false);
    const [showReq, setShowReq] =useState(true);
    const [showFee, setShowFee] = useState(false)
    const [showVehicleList, setShowVehicleList] = useState(false);
    const [masterData, setMasterData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [search, setSearch] = useState();
    const [fromTime, setFromTime] = useState(false);
    const [toTime, setToTime] = useState(false);
    const [finishMode, setFinishMode] = useState('');
    const [startMode, setStartMode] = useState('');
    const [finishType, setFinishType] = useState('');
    const [startType, setStartType] = useState('');
    const [showImage, setShowImage] = useState(false);
    const [submitNoti, setSubmitNoti] = useState(false);
    const [rejectReason, setRejectReason] = useState(false);
    const [showAction, setShowAction] = useState(false);
    //
    const [kmInit, setKmInit] = useState(0);
    const [timesheetID, setTimesheetID] = useState('Draft');
    const [driverName, setDriverName] = useState('');
    const [driverId, setDriverId] = useState(0);
    const [status, setStatus] = useState('Draft');
    const [reqID, setReqID] = useState(0);
    const [reqCode, setReqCode] = useState('');
    const [checkCode, setCheckCode] = useState(true);
    const [vehicleNo, setVehicleNo] = useState('');
    const [vehicleID, setVehicleID] = useState(0);
    const [vehicleRoute, setVehicleRoute] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [finishTime, setFinishTime] = useState(new Date());
    const [kmStart, setKmStart] = useState(0);
    const [kmFinish, setKmFinish] = useState(0);
    const [kmFinishImg, setKmFinishImg] = useState('')
    const [kmFinishSrc, setKmFinishSrc] = useState('')
    const [kmLost, setKmLost] = useState(0);
    const [normalOT, setNormalOT] = useState(0);
    const [sundayOT, setSundayOT] = useState(0);
    const [holidayOT, setHolidayOT] = useState(0);
    const [overNightOT, setOverNightOT] = useState(0);
    const [roadTax, setRoadTax] = useState(0);
    const [mealFee, setMealFee] = useState(0);
    const [accomFee, setAccomFee] = useState(0);
    const [otherFee, setOtherFee] = useState(0);
    
    const [remark, setRemark] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        if(isFocused){ 
                // Set language
            if(props.language === 'en'){
                setLangText(en);
            }else if(props.language === 'vi') {
                setLangText(vi);
            }
                //
            let mounted = true;
            getTimeSheetDetail(route.params.timesheetID).then(() => {
                if (mounted) {
                    setLoading(false);
                }
            });
            
            getVehicleList().then(()=>{
                if (mounted) {
                    setLoading(false);
                }
            });

            const backAction = () => {
                Alert.alert(langText.holdOn, langText.exitTimesheet, [
                { text: langText.no, onPress: () => null, style: langText.no},
                { text: langText.yes, onPress: () => RootNavigation.navigate('TimeSheet') }
                ]);
                return true;
            };
        
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            return () => {
                mounted = false;
                backHandler.remove();
            };
        }
    }, [props, isFocused]);     

    const getVehicleList = async () => {
        try {
            let response =  await axios.post(GET_VEHICLE_LIST_API_URL, {"DriverID":props.loggedInUser.DRIVER_ID}, {
                headers: {
                    'content-type': 'application/json',
                },
            });
            let json = response.data;
            setMasterData(json);
            setFilterData(json);
        } catch (error){
            console.warn(error);
        }
    }

    const getTimeSheetDetail =  async (_timesheetID) => {
        try {
            let response = await axios.post(TIMESHEET_DETAIL_API_URL, {"TimesheetID":_timesheetID}, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            let result = response.data;
            let json = result[0];
            setTimesheetID(json.TIMESHEET_ID);
            setStatus(json.STATUS); 
            setDriverName(route.params.driverName?route.params.driverName:(json.DRIVER_NAME !==null?json.DRIVER_NAME:props.loggedInUser.DRIVER_NAME));
            setDriverId(json.DRIVER_ID);
            setReqID(route.params.reqID?route.params.reqID:json.TRANSACTION_ID);
            setVehicleID(route.params.vehicleID?route.params.vehicleID:json.VEHICLE_ID);
            setVehicleNo(route.params.vehicleNo?route.params.vehicleNo:json.VEHICLE_NO);
            setVehicleRoute(route.params.route?route.params.route:json.ROUTE);
            setRemark(json.REMARK);
            setStartTime(json.TIME_START);
            setFinishTime(json.TIME_FINISH);
            setKmStart(route.params.lastKm?route.params.lastKm:json.KM_START);
            setKmInit(route.params.lastKm?route.params.lastKm:json.KM_START);
            setKmFinish(json.KM_FINISH);
            setKmFinishSrc(json.KM_FINISH_SRC);
            setKmLost(json.KM_LOST);
            setNormalOT(json.OT_NORMAL);
            setSundayOT(json.OT_SUNDAY);
            setHolidayOT(json.OT_HOLIDAY);
            setOverNightOT(json.OT_OVERNIGHT);
            setRoadTax(json.ROAD_TAX);
            setMealFee(json.MEAL_FEE);
            setAccomFee(json.ACCOM_FEE);
            setOtherFee(json.OTHER_FEE);
            setReason(json.REASON);
            // Set rightIcon
            if (props.appRole ==='Driver' && json.STATUS === 'Submitted'){
                setShowRightIcon(false);
            };
            if (props.appRole ==='Admin' && json.STATUS !=='Submitted'){
                setShowRightIcon(false);
            };

        } catch (error) {
            console.warn(error);
        }
    }

    const formatNumber = (num) => {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const setDataShow = (type) => {
        if(type === 'req'){
            setOnReq(true);
            setShowReq(true);
            setOnFee(false);
            setShowFee(false);
        }
        if(type === 'time'){
            setOnReq(false);
            setShowReq(false);
            setOnFee(false);
            setShowFee(false);
        }
        if(type === 'km'){
            setOnReq(false);
            setShowReq(false);
            setOnFee(false);
            setShowFee(false);
        }
        if(type === 'fee'){
            setOnReq(false);
            setShowReq(false);
            setOnFee(true);
            setShowFee(true);
        }
    }

    const renderView =  ({item}) => {
        return(
            <TouchableOpacity onPress={()=> {setVehicleNo(item.VEHICLE_NO); setVehicleID(item.VEHICLE_ID); setKmInit(item.LAST_KM); setKmStart(item.LAST_KM); setShowVehicleList(false);}}>
                <View style ={{flexDirection:"row", alignItems:'center', justifyContent:'center', margin:sizes.SIZE_10}}>
                    <Text style={{color:colors.BLACK, fontSize:sizes.FONT_20}}>{item.VEHICLE_NO}  </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const ItemSeparatorView = () => {
        return(
            <View style={{justifyContent:'flex-start', alignItems:'center'}}>
                <View style={{height:sizes.SIZE_1, width:'30%', backgroundColor:colors.BLUR}}>
                </View>
            </View>
        )
    }

    const setSearhFilter = (text) => {
        setSearch(text);
        if(text){
            const newData = masterData.filter((item)=>{
                const itemData = item.VEHICLE_NO? item.VEHICLE_NO.toUpperCase():'';
                const itemStringData =itemData.replace(/[^a-zA-Z0-9]/g, "");
                const textData = text.toUpperCase();
                return itemStringData.indexOf(textData) > -1;
            });
            setFilterData(newData);
        }else{
            setFilterData(masterData);
        }
    }

    const onShowStart = (startCurrentMode, startCurrentType) => {
        setFromTime(true);
        setStartMode(startCurrentMode);
        setStartType(startCurrentType);
    }

    const onShowFinish = (finishCurrentMode, finishCurrentType) =>{
        setToTime(true);
        setFinishMode(finishCurrentMode);
        setFinishType(finishCurrentType);
    }

    const onStartChange = (event, selectedDate) => {
        setFromTime(false);
        const currentDate = selectedDate || new Date();
        setStartTime(Moment(currentDate).format('MM/DD/YY HH:mm'));
    };

    const onFinishChange = (event, selectedDate) => {
        setToTime(false);
        const currentDate = selectedDate || new Date(finishTime);
        setFinishTime(Moment(currentDate).format('MM/DD/YY HH:mm'));
    };

    const getTimesheetInfo = () => {
        let timeSheetInfo = {};
        Object.assign(timeSheetInfo, {timesheetID: timesheetID});
        Object.assign(timeSheetInfo, {driverID: props.loggedInUser.DRIVER_ID});
        Object.assign(timeSheetInfo, {driverName: props.loggedInUser.DRIVER_NAME});
        Object.assign(timeSheetInfo, {reqID: reqID});
        Object.assign(timeSheetInfo, {reqCode: reqCode});
        Object.assign(timeSheetInfo, {vehicleID: vehicleID});
        Object.assign(timeSheetInfo, {vehicleNo: vehicleNo});
        Object.assign(timeSheetInfo, {vehicleRoute: vehicleRoute});
        Object.assign(timeSheetInfo, {startTime: startTime});
        Object.assign(timeSheetInfo, {finishTime: finishTime});
        Object.assign(timeSheetInfo, {kmStart: kmStart});
        Object.assign(timeSheetInfo, {kmFinish: kmFinish});
        Object.assign(timeSheetInfo, {kmFinishImg: kmFinishImg});
        Object.assign(timeSheetInfo, {kmLost: kmLost});
        Object.assign(timeSheetInfo, {kmUsing: kmFinish - kmStart});
        Object.assign(timeSheetInfo, {normalOT: normalOT});
        Object.assign(timeSheetInfo, {sundayOT: sundayOT});
        Object.assign(timeSheetInfo, {holidayOT: holidayOT});
        Object.assign(timeSheetInfo, {overNightOT: overNightOT});
        Object.assign(timeSheetInfo, {totalOT: normalOT+sundayOT+holidayOT+overNightOT});
        Object.assign(timeSheetInfo, {roadTax: roadTax});
        Object.assign(timeSheetInfo, {mealFee: mealFee});
        Object.assign(timeSheetInfo, {accomFee: accomFee});
        Object.assign(timeSheetInfo, {otherFee: otherFee});
        Object.assign(timeSheetInfo, {totalFee: roadTax+mealFee+accomFee+otherFee });
        Object.assign(timeSheetInfo, {remark: remark});
        Object.assign(timeSheetInfo, {reason: reason});
        return timeSheetInfo;
    }

    const onStore = async (storeType) => {
        setShowAction(false);
        let timeSheetInfo = getTimesheetInfo();
        Alert.alert(langText.ays, langText.yw+storeType+ "?", [
            {
            text: langText.cancel,
            onPress: () => {return false},
            style: langText.cancel
            },
            { text: langText.yes, onPress: () =>  {
                if(storeType ==='Submit'){
                    if( vehicleNo===''||vehicleNo===' - '||vehicleNo===null||
                        vehicleRoute==='' ||vehicleRoute===null||
                        kmFinish===0 ||kmFinish===null||kmFinish-kmStart<=0||
                        (status === 'Draft'&& kmFinishImg==='')||
                        (status === 'Draft'&& kmFinishImg===null)){
                        Alert.alert(langText.invalidInput, langText.checkInput, [
                            {
                            text: langText.cancel,
                            onPress: () => {setShowAction(false);},
                            style: langText.cancel
                            }
                        ]);
                    } else {
                        if (reqID === 0){
                            props.storeTimesheet(storeType, timeSheetInfo);
                        } else{
                            setSubmitNoti(true);
                            setShowAction(false);
                        }
                    }
                }else if (storeType ==='Reject'){
                    setRejectReason(true);
                }else{
                    props.storeTimesheet(storeType, timeSheetInfo);
                }
            }}
        ]);
    }

    const onSubmit = async () => {
        let timeSheetInfo= getTimesheetInfo();
        try {
            let response =  await axios.post(CHECK_CODE_API_URL, {"requestID":reqID, "reqCode":reqCode}, {
                headers: {
                    'content-type': 'application/json',
                },
            });
            let result = response.data;
            if(result[0].RESULT_STATUS === "success"){
                setCheckCode(true);
                props.storeTimesheet('Submit', timeSheetInfo);
            }else{
                setCheckCode(false);
            }
        } catch (error){
            console.warn(error);
        }
    }

    const onReject = () =>{
        let timeSheetInfo= getTimesheetInfo();
        if( reason===''||reason===null){
            Alert.alert(langText.invalidInput, langText.checkInput, [
                {
                text: langText.cancel,
                onPress: () => {setShowAction(false);},
                style: langText.cancel
                }
            ]);
        } else{
            props.storeTimesheet('Reject', timeSheetInfo);
        }
    }

    const onKmFinishImg = async () =>{
        if(kmFinishSrc === '' ||kmFinishSrc === null){
            const { status } = await ImagePicker.getCameraPermissionsAsync();
            if (status !=='granted'){
                const {status} = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted'){
                    alert('Failed to open Camera')
                    return
                }
            }

            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true
            });
            
            if (!result.cancelled) {
                compressImage(result.uri);
            }
        }else{
            setShowImage(true);
        }
    }

    const compressImage = async (uri) => { // SaveFormat.PNG
        const result = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 1200 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64:true },
        );
        setKmFinishImg(result.base64);
    };

    return (
        <View style={{flex:1, backgroundColor:colors.WHITE, padding:sizes.SIZE_3}}>
            <Header title={langText.timesheetDetail} rightIcon = {list} showRightIcon = {showRightIcon} onRightIconPress={()=>{ setShowAction(true);}}/>
                {/* Status */}
                <View style ={styles.status}>
                    <View style = {{height:sizes.SIZE_16, justifyContent:'center', alignItems:'center'}}>
                        {status === 'Draft' && <Image source = {draft} style = {{width: sizes.SIZE_300, resizeMode:'contain'}}/>}    
                        {status === 'Submitted' && <Image source = {submit} style = {{width: sizes.SIZE_300, resizeMode:'contain'}}/>}    
                        {status === 'Rejected' && <Image source = {reject} style = {{width: sizes.SIZE_300, resizeMode:'contain'}}/>}    
                    </View>
                    <View style = {{flex:1, flexDirection:'row'}}>
                        <View style = {{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
                            <Text style = {[{fontSize:sizes.FONT_16, color:colors.BLUR},status === 'Draft' && {color:colors.DS2}]}>{langText.draft}</Text>
                        </View>
                        <View style={{flex:0.5}}></View>
                        <View style = {{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
                            <Text style = {[{fontSize:sizes.FONT_16, color:colors.BLUR},status === 'Submitted' && {color:colors.DS2}]}>{langText.submitted}</Text>
                        </View>
                        <View style={{flex:0.5}}></View>
                        <View style = {{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
                            {status === 'Rejected'?
                                ( <Text style = {{fontSize:sizes.FONT_16, color:colors.DS2}}>{langText.rejected}</Text>):
                                ( <Text style = {{fontSize:sizes.FONT_16, color:colors.BLUR}}>{langText.finished}</Text>)
                            }
                        </View>
                    </View>
                </View>
                {/* Menu */}    
                <View style= {{flexDirection:'row', padding:sizes.SIZE_3, paddingTop:0, borderBottomColor:colors.CLOUD, borderBottomWidth:sizes.SIZE_2}}>
                    <TouchableOpacity style = {[styles.dashboard, onReq && styles.onDashboadPress]} onPress = {() => setDataShow('req')}>
                        <Image source = {onReq?km:km_blur} style ={styles.dashImg}/>
                        <Text style = {[{color:colors.BLUR, fontSize:sizes.FONT_14},onReq &&{color:colors.DS2}]}>{langText.requestID}: {reqID? reqID:''}</Text>
                        <Text style = {[{color:colors.BLUR, fontSize:sizes.FONT_14},onReq &&{color:colors.DS2}]}>{langText.kmUsing}: {(kmFinish-kmStart)} Km</Text>
                    </TouchableOpacity>        
                    <TouchableOpacity style = {[styles.dashboard, onFee && styles.onDashboadPress]} onPress = {() => setDataShow('fee')}>
                        <Image source = {onFee?fee:fee_blur} style ={styles.dashImg}/>
                        <Text style = {[{color:colors.BLUR, fontSize:sizes.FONT_14},onFee &&{color:colors.DS2}]}>{langText.totalOT}: {normalOT + sundayOT + holidayOT + overNightOT} {langText.hour}</Text>
                        <Text style = {[{color:colors.BLUR, fontSize:sizes.FONT_14},onFee &&{color:colors.DS2}]}>{langText.totalFee}: {formatNumber(roadTax + mealFee + accomFee + otherFee)},000 VND</Text>
                    </TouchableOpacity>
                </View>               
                {/* Request Info */}
                <KeyboardAwareScrollView style = {{flex:1, flexDirection:'column'}}>
                {showReq && <View style={{flex:2.3, marginBottom:sizes.SIZE_10, paddingHorizontal:sizes.SIZE_10}}>
                    <Category text={langText.detail}/>
                    <LineInfo type ={'text'} editable = {false} titles={langText.driver} pressable ={false} value={driverName} />
                    <LineInfo type ={'text'} tapTable={true} editable = {false} titles={langText.type} pressable ={(reqID ===0 && status === 'Draft')} onPress = {() =>{setKmLost(kmLost === 0?1:0)}} value={kmLost===0?langText.normal:langText.maintenance} />
                    <LineInfo type ={'text'} tapTable={true} editable = {false} titles={langText.vehicle} pressable ={(reqID ===0 && status === 'Draft')} onPress = {() => setShowVehicleList(true)} value={vehicleNo} showAlert ={vehicleNo===''||vehicleNo===' - '||vehicleNo===null} />
                    <LineInfo type ={'area'} editable = {reqID ===0 && status === 'Draft'} titles={langText.route} value={vehicleRoute} showAlert ={vehicleRoute==='' ||vehicleRoute===null} onChangeText = {(text)=>setVehicleRoute(text)} />
                    <FromToCategory fromText={langText.start} toText={langText.finish}/>
                    <View style={{flexDirection:'row'}}>
                        <LineInfo type ={'number'} editable = {kmInit === 0} titles={''} keyboardType="numeric" value={kmStart.toString()} 
                            showAlert ={kmStart<=0 ||kmStart===null||kmFinish-kmStart<=0} onChangeText = {text=> setKmStart(parseInt(text)>0?parseInt(text):0)}/>
                        <LineInfo leftImage={true} onLeftImgPress ={()=>{onKmFinishImg()}} type ={'number'} editable = {status === 'Draft'} titles={langText.finish} keyboardType="numeric" value={kmFinish.toString()} 
                            showAlert ={kmFinish<=0 ||kmFinish===null||kmFinish-kmStart<=0||(status === 'Draft'&& kmFinishImg==='')||(status === 'Draft'&& kmFinishImg===null)}  
                            onChangeText = {text=> setKmFinish(parseInt(text)>0?parseInt(text):0)}/>
                   </View>
                    <FromToCategory fromText={langText.from} toText={langText.to}/>
                    <View style={{flexDirection:'row'}}>
                        <View style={[styles.dateContainer,(status === 'Draft')&&{backgroundColor:colors.CLOUD}]}>
                            <TouchableOpacity style={{alignItems:'center',flex:1, flexDirection:'row'}} onPress= {()=>onShowStart('date','spinner')} disabled = {!(status === 'Draft')}>
                                <Text style={styles.dateContent}>{Moment(startTime).format('DD/MM/YY')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{alignItems:'center',flex:1, flexDirection:'row'}} onPress= {()=>onShowStart('time','spinner')} disabled = {!(status === 'Draft')}>
                                <Text style={styles.dateContent}>{Moment(startTime).format('h:mm A')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.dateContainer,(status === 'Draft')&&{backgroundColor:colors.CLOUD}]}>
                            <TouchableOpacity style={{alignItems:'center',flex:1, flexDirection:'row'}} onPress= {()=>onShowFinish('date','spinner')} disabled = {!(status === 'Draft')}>
                                <Text style={styles.dateContent}>{Moment(finishTime).format('DD/MM/YY')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{alignItems:'center',flex:1, flexDirection:'row'}} onPress= {()=>onShowFinish('time','spinner')} disabled = {!(status === 'Draft')}>
                                <Text style={styles.dateContent}>{Moment(finishTime).format('h:mm A')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>}
                 {/* Fee Info */}
                {showFee && <View style={{flex:2.3, flexDirection:'column', marginBottom:sizes.SIZE_10, paddingHorizontal:sizes.SIZE_10}}>
                    <Category text={'OT ('+langText.hour+')'}/>
                    <View style={{flexDirection:'row'}}>
                        <LineInfo type ={'number'} editable = {status === 'Draft'} titles={langText.normalOT} keyboardType="numeric" value={formatNumber(normalOT)} onChangeText = {text=> setNormalOT(parseInt(text)>0?parseInt(text):0)}/>
                        <LineInfo type ={'number'} editable = {status === 'Draft'} titles={langText.sunday} keyboardType="numeric" value={formatNumber(sundayOT)} onChangeText = {text=> setSundayOT(parseInt(text)>0?parseInt(text):0)}/>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <LineInfo type ={'number'} editable = {status === 'Draft'} titles={langText.holiday} keyboardType="numeric" value={formatNumber(holidayOT)} onChangeText = {text=> setHolidayOT(parseInt(text)>0?parseInt(text):0)}/>
                        <LineInfo type ={'number'} editable = {status === 'Draft'} titles={langText.overnight} keyboardType="numeric" value={ formatNumber(overNightOT)} onChangeText = {text=> setOverNightOT(parseInt(text)>0?parseInt(text):0)}/>
                    </View>
                    <Category text={langText.totalFee+' (VND)'}/>
                    <View style={{flexDirection:'row'}}>
                        <LineInfo type ={'money'} editable = {status === 'Draft'} titles={langText.roadTax} keyboardType="numeric" value={formatNumber(roadTax)} onChangeText = {text=> setRoadTax(parseInt(text)>0?parseInt(text):0)}/>
                        <LineInfo type ={'money'} editable = {status === 'Draft'} titles={langText.meal} keyboardType="numeric"  value={formatNumber(mealFee)} onChangeText = {text=> setMealFee(parseInt(text)>0?parseInt(text):0)}/>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <LineInfo type ={'money'} editable = {status === 'Draft'} titles={langText.accom} keyboardType="numeric" value={formatNumber(accomFee)} onChangeText = {text=> setAccomFee(parseInt(text)>0?parseInt(text):0)}/>
                        <LineInfo type ={'money'} editable = {status === 'Draft'} titles={langText.other} keyboardType="numeric"  value={formatNumber(otherFee)} onChangeText = {text=> setOtherFee(parseInt(text)>0?parseInt(text):0)}/>
                    </View>
                </View>}
                </KeyboardAwareScrollView>
                {/* Vehicle List */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showVehicleList}
                    onRequestClose={() => {
                        setShowVehicleList(!showVehicleList);
                    }}
                >   
                    <View style={styles.bottomView}>
                       
                        <TouchableWithoutFeedback style={{flex:2, flexDirection:'column'}} onPress={()=>{ setShowVehicleList(false);}}>
                            <View style ={{flex:2, backgroundColor:colors.TRANS_DARK, width:sizes.WINDOW_WIDTH, transparent:''}}></View>
                        </TouchableWithoutFeedback>
                        <View style={styles.vehicleModalView}>
                            <TextInput 
                            style = {styles.searchBar}
                            value = {search}
                            onChangeText = {(text)=>setSearhFilter(text)}
                            placeholder = {langText.searchHere}
                            />
                            <FlatList
                                data={filterData}
                                renderItem={renderView}
                                keyExtractor={(item,index) => index.toString()}
                                ItemSeparatorComponent = {ItemSeparatorView}
                            />
                        </View>
                    </View>
                </Modal>
                {/* Image Show */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showImage}
                >
                    <View style={styles.bottomView}>
                        <View style={{width: '100%' ,height: '100%'}}>
                            <TouchableOpacity style={styles.imageBack} onPress={()=>{ setShowImage(false);}}>
                                <Image source={back} style = {{width:sizes.SIZE_30, height:sizes.SIZE_30, resizeMode:'contain'}}/>
                                <Text style ={{fontSize:sizes.FONT_20, color:colors.WHITE, paddingLeft:sizes.SIZE_10}}>{langText.back}</Text>
                            </TouchableOpacity>
                            <View style ={{flex:1, paddingHorizontal:sizes.SIZE_5, backgroundColor:colors.BLACK, justifyContent:'center'}}>  
                                <Image source={{ uri: kmFinishSrc}} style = {{width: sizes.WINDOW_WIDTH, height: sizes.WINDOW_WIDTH*3/4}}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* Action */}
                <Modal
                    animationType='none'
                    transparent={true}
                    visible={showAction}
                >
                    <View style={styles.cornerView}>
                        {status ==='Draft' && 
                        <View style={styles.actionModalView}>
                            <View style={{flex:1, flexDirection:'column', alignItems:'flex-start', marginLeft:sizes.SIZE_10, marginTop:sizes.SIZE_10}}>
                                <TouchableOpacity style={{flex:1}} onPress={()=>{ onStore('Save')}}>
                                    <Text style ={{fontSize:sizes.FONT_22}}>{langText.save}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1}} onPress={()=>{ onStore('Submit');}}>
                                    <Text style ={{fontSize:sizes.FONT_22}}>{langText.submit}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1}} onPress={()=>{ setShowAction(false);}}>
                                    <Text style ={{fontSize:sizes.FONT_22}}>{langText.cancel}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}
                        {status ==='Submitted' && 
                        <View style={styles.actionModalView}>
                            <View style={{flex:1, flexDirection:'column', alignItems:'flex-start', marginLeft:sizes.SIZE_10, marginTop:sizes.SIZE_10}}>
                                <TouchableOpacity style={{flex:1}} onPress={()=>{ onStore('Accept')}}>
                                    <Text style ={{fontSize:sizes.FONT_22}}>{langText.accept}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1}} onPress={()=>{ onStore('Reject');}}>
                                    <Text style ={{fontSize:sizes.FONT_22}}>{langText.reject}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1}} onPress={()=>{ setShowAction(false);}}>
                                    <Text style ={{fontSize:sizes.FONT_22}}>{langText.cancel}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}
                        {status ==='Rejected' && 
                        <View style={styles.actionModalView}>
                            <View style={{flex:1, flexDirection:'column', alignItems:'flex-start', marginLeft:sizes.SIZE_10, marginTop:sizes.SIZE_10}}>
                                <TouchableOpacity style={{flex:1}} onPress={()=>{ onStore('Remake');setShowAction(false)}}>
                                    <Text style ={{fontSize:sizes.FONT_22}}>{langText.remake}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1}} onPress={()=>{ setRejectReason(true);setShowAction(false);}}>
                                    <Text style ={{fontSize:sizes.FONT_22}}>{langText.reason}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1}} onPress={()=>{ setShowAction(false);}}>
                                    <Text style ={{fontSize:sizes.FONT_22}}>{langText.cancel}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}
                        <TouchableWithoutFeedback style={{flex:2, flexDirection:'column'}} onPress={()=>{ setShowAction(false);}}>
                            <View style ={{flex:4, backgroundColor:colors.TRANS_0, width:sizes.WINDOW_WIDTH, transparent:''}}></View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
                {/* Submit Code*/}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={submitNoti}
                >  
                    <View style={styles.bottomView}>
                        <TouchableWithoutFeedback style={{flex:2, flexDirection:'column'}} onPress={()=>{ setShowVehicleList(false);}}>
                            <View style ={{flex:2, backgroundColor:colors.TRANS_DARK, width:sizes.WINDOW_WIDTH, transparent:''}}></View>
                        </TouchableWithoutFeedback>
                        <View style={styles.codeModalView}>
                            <Text style={{color:colors.WHITE, fontSize:sizes.FONT_20, fontWeight:'bold'}}>{langText.inputCode}</Text>
                            {reqID !== 0 && 
                                <LineInfo editable = {status === 'Draft'} titles={'code'} value={reqCode} onChangeText = {text=> setReqCode(text)}/>
                            }
                            {!checkCode?<Text style={{fontStyle:'italic', color:colors.ALERT, fontSize:sizes.FONT_14}}>{langText.invalidCode}</Text>:
                            <Text style={{fontStyle:'italic', color:colors.ALERT, fontSize:sizes.FONT_14}}></Text>}
                            <View style={{justifyContent:'center', alignItems:'center'}}>
                                <CustomButton type ={'ds2'} text={langText.submit} onPress={()=>onSubmit()} />
                                <CustomButton type ={'ds2_white'} text={langText.cancel} onPress={()=>setSubmitNoti(false)} />
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* Reject*/}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={rejectReason}
                >
                    <View style={styles.bottomView}> 
                        <TouchableWithoutFeedback style={{flex:2, flexDirection:'column'}} onPress={()=>{ setShowVehicleList(false);}}>
                            <View style ={{flex:2, backgroundColor:colors.TRANS_DARK, width:sizes.WINDOW_WIDTH, transparent:''}}></View>
                        </TouchableWithoutFeedback>
                        <View style={styles.rejectModalView}>
                            <LineInfo type ={'area'} editable = {status === 'Submitted'} titles={langText.reason} value={reason} onChangeText = {(text)=>setReason(text)} />
                            <View style={{justifyContent:'center', alignItems:'center'}}>
                                {status ==='Submitted'&&
                                    <CustomButton type ={'ds2'} text={langText.reject} onPress={()=>onReject()} />
                                }
                                <CustomButton type ={'ds2_white'} text={langText.cancel} onPress={()=>setRejectReason(false)} />
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* DateTimePicker */}                    
                {fromTime &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date(startTime)}
                        mode={startMode}
                        display ={startType}
                        onChange={onStartChange}
                    />}
                {toTime &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date(finishTime)}
                        mode={finishMode}
                        display ={finishType}
                        onChange={onFinishChange}
                    />
                }
            <Loading showLoading= {loading}/>
            <Loading showLoading= {props.storeLoading}/>
        </View>
    )
}

const mapStateToProps = (state) => ({
    loggedInUser: state.authReducer.loggedInUser,
    storeLoading: state.storeReducer.storeLoading,
    appRole : state.authReducer.appRole,
    language: state.settingReducer.language
})

const mapDispatchToProps =  (dispatch) =>({
    storeTimesheet: (storeType, timeSheetInfo) => dispatch(storeTimesheet(storeType, timeSheetInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheetDetail)
