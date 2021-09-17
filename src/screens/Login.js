import React, { useState, useEffect } from 'react'
import { Text, View, Image, TextInput, TouchableNativeFeedback, Alert, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNRSA, { RSA, RSAKeychain } from 'react-native-rsa-native';

import {connect} from 'react-redux'
import {login, changeLanguage} from '../redux/actions'

import PlashLoading from '../components/PlashLoading'
import Loading from '../components/Loading'
import CustomButton from '../components/CustomButton'

import {colors, sizes, styles} from '../assets/styles'
import { vi,en } from '../assets/language'

import DSLogo from '../assets/images/DSLogo.png'
import hide from '../assets/images/hide.png'
import show from '../assets/images/show.png'

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isHidePw, setIsHidePw] = useState(true);
    const [plashLoading, setPlashLoading] = useState(true);
    const [inputError, setInputError] = useState('');
    const [langText, setLangText] = useState(vi);

    useEffect(() => {
        // Set language.
        if(props.language === 'en'){
            setLangText(en);
        }else if(props.language === 'vi') {
            setLangText(vi);
        }
        // Loading before open app.
        setTimeout(
            () => { setPlashLoading(false); },
            500
        )
    },[props.language]);

    const onLogin = () => {
        if(username ==='' || password===''){
            setInputError(langText.noInput);
        } else {
            setInputError('');
            var loginInput = {};
            Object.assign(loginInput, {username: username});
            Object.assign(loginInput, {password: password});
            props.login(loginInput);
        }
    }
    
    if(plashLoading){
        return(
            <PlashLoading/>
        )
    }

    return (
        <View style={{flex:1, backgroundColor:colors.WHITE}}>
            <KeyboardAwareScrollView style={{flex:1, flexDirection:'column'}}>
                <View  style = {{backgroundColor:colors.DS2, alignItems:'center', justifyContent:'center'}} >
                    <Image source = {DSLogo} style = {{width: sizes.SIZE_190, height:sizes.SIZE_190, resizeMode:'contain'}}/>
                </View>
                <View style = {{backgroundColor:colors.DS2}} >
                    <View  style = {{height:sizes.SIZE_20, backgroundColor:colors.WHITE, borderTopLeftRadius:sizes.SIZE_20, borderTopRightRadius:sizes.SIZE_20, }} ></View>
                </View>
                <View style = {{backgroundColor:colors.WHITE}} >
                    <View style = {{flex:1}}>
                        <TextInput
                            style={styles.loginInput}
                            placeholder={langText.userID}
                            secureTextEntry={false}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            underlineColorAndroid='transparent'
                            placeholderTextColor={colors.GRAY_MEDIUM}
                            onChangeText={(text)=>{setUsername(text)}}
                            value={username}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <TextInput
                            style={styles.loginInput}
                            placeholder={langText.password}
                            secureTextEntry={isHidePw}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            underlineColorAndroid='transparent'
                            placeholderTextColor={colors.GRAY_MEDIUM}
                            onChangeText={(text)=>{setPassword(text)}}
                            value={password}
                        /> 
                        <TouchableNativeFeedback onPress={()=>{setIsHidePw(!isHidePw)}}>
                            { isHidePw?
                                (<Image source={hide} style ={{height:sizes.SIZE_35, resizeMode:'contain', position:'absolute', top:sizes.SIZE_16, right:0}}/>):
                                (<Image source={show} style ={{height:sizes.SIZE_35, resizeMode:'contain', position:'absolute', top:sizes.SIZE_16, right:0}}/>)
                            }       
                        </TouchableNativeFeedback>
                    </View>
                    <View style = {{flexDirection:'column'}}>
                        <Text style={{textAlign:'left', color:colors.ALERT, fontStyle:'italic', fontSize:sizes.FONT_16, paddingLeft:sizes.SIZE_10}}>{inputError}</Text>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <CustomButton type={'ds2'}  text={langText.login} onPress={()=>{onLogin();}}/>
                        </View>
                        <View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:sizes.FONT_16, color:colors.BLACK}}>{langText.forgotPassword}</Text>
                            <TouchableOpacity onPress={()=>Alert.alert('Please contact to DI ext: 1238/0931118848')}>
                                <Text style={{fontSize:sizes.FONT_18, color:colors.DS1}}>{langText.resetPassword}</Text>
                            </TouchableOpacity>
                        </View> 
                        <View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:sizes.SIZE_10}}>
                            <Text style={{fontSize:sizes.FONT_16, color:colors.BLACK}}>{langText.language}</Text>
                            <TouchableOpacity onPress={()=>props.changeLanguage('vi')}>
                                <Text style={[{fontSize:sizes.FONT_18, color:colors.DS1, borderRadius:sizes.SIZE_3}, props.language === 'vi'&&{color:colors.WHITE, backgroundColor:colors.DS2}]}> {langText.vi} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>props.changeLanguage('en')}>
                                <Text style={[{fontSize:sizes.FONT_18, color:colors.DS1, borderRadius:sizes.SIZE_3}, props.language === 'en'&&{color:colors.WHITE, backgroundColor:colors.DS2}]}> {langText.en} </Text>
                            </TouchableOpacity>
                        </View> 
                    </View>
                </View>
                <View style = {{backgroundColor:colors.WHITE, padding:sizes.SIZE_10, justifyContent:'flex-end', alignItems:'center', flexDirection:'column'}} >
                    <Text style={styles.ruleText}>
                        {langText.ruleText}
                    </Text>
                    <Text style={styles.copyRight}>
                        {'\u00A9'}2021 {langText.copyRight}
                    </Text>
                </View>
            </KeyboardAwareScrollView>
            <Loading showLoading= {props.loading}/>
        </View>
    )
}

  const mapStateToProps = (state) => ({
        username: state.authReducer.username,
        loading: state.authReducer.loading,
        language: state.settingReducer.language
  })
  
  const mapDispatchToProp = (dispatch) =>({
      login: (loginInput) => dispatch(login(loginInput)),
      changeLanguage: (language) => dispatch(changeLanguage(language)),
  })

  export default connect(mapStateToProps, mapDispatchToProp)(Login)
  