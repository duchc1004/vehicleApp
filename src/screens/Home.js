import React, { useState, useEffect } from 'react'
import { Text, View, BackHandler,Image, TouchableOpacity, ImageBackground, Alert } from 'react-native'

import { connect } from 'react-redux'
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";

import {GET_NOTIQTY_URL} from '@env';

import Loading from '../components/Loading';

import * as RootNavigation from '../navigator/RootNavigation'
import { colors, sizes, styles } from '../assets/styles'
import { vi, en } from '../assets/language'
import { logout, changeRole } from '../redux/actions'

import request_w from '../assets/images/request_w.png'
import timesheet_w from '../assets/images/timesheet_w.png'
import menu from '../assets/images/menu.png'
import requestBg from '../assets/images/requestBg.jpg'
import bell from '../assets/images/bell.png'
import statistics_w from '../assets/images/statistics_w.png'
import roleChange from '../assets/images/roleChange.png'
import user from '../assets/images/user.png'

function Home (props) {
    const [langText, setLangText] = useState(vi);   
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);

    const [requestQty, setRequestQty] = useState(0);
    const [timesheetQty, setTimesheetQty] = useState(0);

    useEffect(() => {
        if(isFocused){ 
            // Set language
            // console.log(props.language);
            if(props.language === 'en'){
                setLangText(en);
            }else if(props.language === 'vi') {
                setLangText(vi);
            }
            //getNotiQty
            let mounted = true;
            getNotiQty(props.loggedInUser.DRIVER_ID, props.appRole ).then(()=>{
                if (mounted) {
                    setLoading(false);
                }
            });
            
            // set back action
            const backAction = () => {
                Alert.alert( langText.holdOn, langText.exitApp, [
                    {
                    text: langText.cancel,
                    onPress: () => null,
                    style: langText.cancel
                    },
                    { text: langText.yes, onPress: () => BackHandler.exitApp() }
                ]);
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
    },[props, isFocused]);

    const getNotiQty = async (_driverId, _role) => {
        try {
            let response =  await axios.post(GET_NOTIQTY_URL, {"DriverID":_driverId, "Role": _role}, {
                headers: {
                    'content-type': 'application/json',
                },
            });
            let json = response.data;
            setRequestQty(json[0].REQUEST_QTY);
            setTimesheetQty(json[0].TIMESHEET_QTY);
        } catch (error){
            console.warn(error);
        }
    }

    const MenuIcon = (props) => {
        return(
            <TouchableOpacity style={styles.menuIcon}  onPress={props.onPress}> 
                {props.qty>0&&
                <View style ={{position:'absolute', justifyContent:'center', alignItems:'center', top:-sizes.SIZE_2, right:-sizes.SIZE_2, height:sizes.SIZE_24, borderRadius:sizes.SIZE_12, width:sizes.SIZE_24, backgroundColor:colors.ALERT}}>
                    <Text style={{color:colors.WHITE, fontSize:sizes.FONT_12, fontWeight:'bold'}}>{props.qty < 10?props.qty:'10+'}</Text>
                </View>}
                <Image source={props.icon} style = {{height:sizes.SIZE_40, resizeMode:'contain'}}   />
                <Text style={{fontSize:sizes.FONT_16, color:colors.WHITE}}>{props.title}</Text>
            </TouchableOpacity>
        );
    }

    const onLogout = () => {
        Alert.alert(langText.holdOn, langText.ays + langText.yw + langText.logout +'?', [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => {
                props.logout();
                setTimeout(()=>{
                    RootNavigation.navigate('Login');
                }, 2000)
            }}
        ]);
    }

    function onChangeRole(){
        if(props.appRole ==="Driver"){
            props.changeRole('Admin')
        }else{
            props.changeRole('Driver')
        }
    }

    return (
        <View style={{flex:1, backgroundColor:colors.CLOUD}}>
            <ImageBackground source={requestBg} resizeMode="cover" style={{ flex: 1,padding:sizes.SIZE_3, justifyContent: "center"}}>
            <View style={styles.userInfo}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Image source={user} style={{height:sizes.SIZE_70, width:sizes.SIZE_70}}/>
                </View>
                <View style={{flex:3, flexDirection:'column', marginLeft:sizes.SIZE_10, justifyContent:'center', alignItems:'flex-start'}}>
                    <Text style={{fontSize:sizes.FONT_18, margin:sizes.SIZE_2, color:colors.WHITE, fontWeight:'bold'}}>{props.loggedInUser.DRIVER_NAME}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:sizes.FONT_16, margin:sizes.SIZE_2, color:colors.WHITE, width:sizes.SIZE_48, textAlignVertical:'center'}}>{props.appRole}</Text>
                        {props.loggedInUser.ROLE ==='Admin'&&
                        <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>onChangeRole()}>
                            <Image source={roleChange} style={{width:sizes.SIZE_24, height:sizes.SIZE_24, resizeMode:'contain', marginLeft:sizes.SIZE_10}} />
                        </TouchableOpacity>
                        }
                    </View>
                    <Text style={{fontSize:sizes.FONT_16, margin:sizes.SIZE_2, color:colors.WHITE}}>{props.loggedInUser.COMPANY}</Text>
                </View>
                <View  style={{flex:1.5, justifyContent:'space-between', alignItems:'flex-end'}}>
                    <TouchableOpacity>
                        <Image source={bell} style={{width:sizes.SIZE_30, height:sizes.SIZE_30, resizeMode:'contain', marginLeft:sizes.SIZE_10}} />     
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{onLogout()}}>
                        <Text style={{color:colors.WHITE, fontSize:sizes.FONT_16, textAlignVertical:'top', textDecorationLine:'underline', fontStyle:'italic'}}>{langText.logout}</Text>     
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{flex:0.3, flexDirection:'row', alignItems:'flex-start', paddingTop:sizes.SIZE_5}}>
                <Image source={menu} style={{width:sizes.SIZE_30, height:sizes.SIZE_30, resizeMode:'contain', marginLeft:sizes.SIZE_10}} />
                <Text style={{color:colors.DS2, fontSize:sizes.FONT_24, marginLeft:sizes.SIZE_10}}>{langText.menu}</Text>
            </View>
            <View style={{flex:1, marginVertical:sizes.SIZE_1}}>
                <View style={{flex:1, flexDirection:'row',marginHorizontal:sizes.SIZE_5}}>
                    <MenuIcon icon = {request_w} title ={langText.request} onPress ={()=>{ RootNavigation.navigate('Request')}} qty={requestQty} />
                    <MenuIcon icon = {timesheet_w} title ={langText.timesheet} onPress ={()=>{ RootNavigation.navigate('TimeSheet')}}  qty={timesheetQty} />
                    <MenuIcon icon = {statistics_w} title ={langText.statistics} onPress ={()=>{alert('Coming soon!')}} />
                </View>
                {/* <View style={{flex:2, flexDirection:'row',marginHorizontal:sizes.SIZE_5}}>
                    <MenuIcon icon = {statistics} title ={langText.statistics} onPress ={()=>{Alert.alert('Coming soon!')}}/>
                    <MenuIcon icon = {checkIn} title ={langText.checkIn} onPress ={()=>{Alert.alert('Coming soon!')}}/>
                </View> */}
            </View>
            <View style={{flex:5}}>
            </View>
            </ImageBackground>
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
    logout: () => dispatch(logout()),
    changeRole: (roleChangeInfo) => dispatch(changeRole(roleChangeInfo))
    
})

export default connect(mapStateToProps, mapDispatchToProp)(Home)