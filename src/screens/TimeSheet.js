import React, {useEffect, useState } from 'react';
import { Text, FlatList, View, TouchableOpacity, Image } from 'react-native';

import Moment from 'moment';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import {connect} from 'react-redux';

import {TIMESHEET_API_URL} from '@env';

import { colors, sizes, styles } from '../assets/styles';
import { vi,en } from '../assets/language';
import * as RootNavigation from '../navigator/RootNavigation';

import Header from '../components/Header';
import Loading from '../components/Loading';

import timesheet from '../assets/images/timesheet.png';
import plus from '../assets/images/plus.png';
import kmLost from '../assets/images/kmLost.png';



function TimeSheetScreen(props) {
    const isFocused = useIsFocused();
    const [langText, setLangText] = useState(vi);

    const [filterData, setFilterData] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [allTap, setAllTap] = useState(true);
    const [draftTap, setDraftTap] = useState(false);
    const [submitTap, setSubmitTap] = useState(false);
    const [rejectTap, setRejectTap] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allQty, setAllQty] = useState(0);
    const [draftQty, setDraftQty] = useState(0);
    const [submitQty, setSubmitQty] = useState(0);
    const [rejectQty, setRejectQty] = useState(0);
    
    const [isFetching, setIsFetching] = useState(false)

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

    const fetchMyAPI = async (_driverID, _role) => {
        const params = {
            "driverID":_driverID,
            "role":_role,
        };
        
        try {
            let response = await axios.post(TIMESHEET_API_URL, params, {
                headers: {
                    'content-type': 'application/json',
                },
            });
            let json = response.data;
            setFilterData(json);
            setMasterData(json);
            setQty(json)
        } catch (error) {
          console.warn(error);
        }
    }

    const onRefresh = () => {
        let mounted = true
        setDraftTap(false);
        setSubmitTap(false);
        setRejectTap(false);
        setAllTap(true);
        setIsFetching(true);
        fetchMyAPI(props.loggedInUser.DRIVER_ID, props.appRole).then(() => {
            if (mounted) {
                setLoading(false)
                setIsFetching(false);
            }
        })
    }

    const showTimesheetDetail = (id) => {
        RootNavigation.navigate('TimeSheetDetail', {
            timesheetID: id
        });
    }

    const onCreateTimeSheet = () => {
        RootNavigation.navigate('TimeSheetDetail', {
            timesheetID: 0
        })
    }

    const setQty = (json) => {
        // setAllQty
        json[0].TIMESHEET_ID === 0? setAllQty(0):setAllQty(json.length);
        // setTodayQTy
        setDraftQty(json.filter((item)=>{
            const itemData = item.STATUS? item.STATUS.toUpperCase():'';
            return itemData.indexOf('DRAFT') > -1;
        }).length);
        setSubmitQty(json.filter((item)=>{
            const itemData = item.STATUS? item.STATUS.toUpperCase():'';
            return itemData.indexOf('SUBMITTED') > -1;
        }).length);
        setRejectQty(json.filter((item)=>{
            const itemData = item.STATUS? item.STATUS.toUpperCase():'';
            return itemData.indexOf('REJECTED') > -1;
        }).length);
    }

    const searchFilter = (text) =>{
        if (text ==='Draft'){
            setDraftTap(true);
            setSubmitTap(false);
            setRejectTap(false);
            setAllTap(false);
        }else if (text ==='Submitted'){
            setDraftTap(false);
            setSubmitTap(true);
            setRejectTap(false);
            setAllTap(false);
        }else if (text ==='Rejected'){
            setDraftTap(false);
            setSubmitTap(false);
            setRejectTap(true);
            setAllTap(false);
        }else{
            setDraftTap(false);
            setSubmitTap(false);
            setRejectTap(false);
            setAllTap(true);
        }
        if(text !== 'All'){
            const newData = masterData.filter((item)=>{
                const itemData = item.STATUS? item.STATUS.toUpperCase():'';
                const textData = text.toUpperCase();
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
            {item.TIMESHEET_ID !== 0 && 
                <TouchableOpacity style={[styles.renderView, item.STATUS ==='Submitted'&&{borderColor:colors.DS2},item.STATUS ==='Rejected'&&{borderColor:colors.WARNING}]} 
                    onPress={()=> showTimesheetDetail(item.TIMESHEET_ID)}
                    >
                    <View style={{ flex:1, justifyContent:'center', alignItems:'center', padding:sizes.SIZE_5}}>
                        <Image source = {timesheet} style = {{width: sizes.SIZE_40, height:sizes.SIZE_40, resizeMode:'contain'}}/>
                        {item.TRANSACTION_ID? 
                        <Text style={{fontSize:sizes.FONT_14, fontWeight:'bold', color:colors.DS1, marginTop:sizes.SIZE_5}}>{item.TRANSACTION_ID}</Text>: 
                        <Text style={{fontSize:sizes.FONT_14, fontWeight:'bold', color:colors.DS1, marginTop:sizes.SIZE_5}}></Text>
                        }
                    </View>
                    <View style={styles.textContainer}>
                        <View style ={{flexDirection:"row"}}>
                            <Text style={[styles.title,{flex:2}]}>{item.VEHICLE_TYPE} - {item.VEHICLE_NUMBER}  </Text>
                            <Text style={{flex:1, fontSize:sizes.FONT_10, color:colors.BLACK}}>{Moment(item.CREATED_DATE).format('HH:mm DD/MM/YYYY')} </Text>
                        </View>
                        <View style ={{flexDirection:"row"}}>
                            <Text style={[styles.content,{flex:1, fontStyle:'italic',textAlign:'center'}]}>Km Using</Text>
                            <Text style={[styles.content,{flex:1, fontStyle:'italic',textAlign:'center'}]}>Total OT</Text>
                            <Text style={[styles.content,{flex:1, fontStyle:'italic',textAlign:'center'}]}>Total Fee</Text>
                            <View style={{flex:0.5}}></View>
                        </View>
                        <View style ={{flexDirection:"row"}}>
                            <Text style={[styles.content,{flex:1, textAlign:'center'}]}>{item.KM_USING}  </Text>
                            <Text style={[styles.content,{flex:1, textAlign:'center'}]}>{item.TOTAL_OT}  </Text>
                            <Text style={[styles.content,{flex:1, textAlign:'center'}]}>{item.TOTAL_FEE}  </Text>
                            <View style={{flex:0.5}}>
                                {item.kmLost&&<Image source = {kmLost} style = {{width: sizes.SIZE_20, height:sizes.SIZE_20, resizeMode:'contain'}}/>}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            }
            </>
        )
    }
    
    return (
        <View style={{flex:1, backgroundColor:colors.CLOUD, padding:sizes.SIZE_3}}>
            <Header title={langText.timesheet}  showRightIcon={props.appRole ==='Driver'} rightIcon = {plus} onRightIconPress={()=>onCreateTimeSheet()}/>
            <View style={styles.tabQty}>
                <TouchableOpacity  style = {{flex:1}} onPress={()=>searchFilter('All')}>
                    <Text style ={[styles.textSearchDefault, allTap && styles.textSearchOn]}>{langText.all}({allQty})</Text>
                </TouchableOpacity>
                {props.appRole === 'Driver'&&<>
                <TouchableOpacity style = {{flex:1}}  onPress={()=>searchFilter('Draft')}>
                    <Text style ={[styles.textSearchDefault, draftTap && styles.textSearchOn]}>{langText.draft}({draftQty})</Text>
                </TouchableOpacity>
                </>}
                <TouchableOpacity style = {{flex:1.5}}  onPress={()=>searchFilter('Submitted')}>
                    <Text style ={[styles.textSearchDefault, submitTap && styles.textSearchOn]}>{langText.submitted}({submitQty})</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{flex:1.5}}  onPress={()=>searchFilter('Rejected')}>
                    <Text style ={[styles.textSearchDefault, rejectTap && styles.textSearchOn]}>{langText.rejected}({rejectQty})</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filterData}
                renderItem={renderView}
                keyExtractor={(item,index) => index.toString()}
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

const TimeSheet = connect(mapStateToProps, mapDispatchToProp)(TimeSheetScreen)

export default TimeSheet


