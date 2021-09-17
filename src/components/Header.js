import React from 'react'
import { Image, TouchableOpacity, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import {sizes, colors} from '../assets/styles'

import back from '../assets/images/back.png'

export default function Header (props) {
    const navigation = useNavigation();
    let {title, showRightIcon, rightIcon, onRightIconPress} = props;
    return (
        <View style={{margin:0,flexDirection:'row', backgroundColor:colors.DS2, borderWidth:sizes.SIZE_2, borderColor:colors.WHITE, borderRadius:sizes.SIZE_10}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={back} style={{width:sizes.SIZE_30, height:sizes.SIZE_30, resizeMode:'contain', marginLeft:sizes.SIZE_1}}></Image>
                </TouchableOpacity>
            </View>
            <View style={{flex:9, margin:sizes.SIZE_10, paddingRight:sizes.SIZE_18, alignItems:'center', justifyContent:'center' }}>
                <Text style={{fontSize:sizes.FONT_24, color:colors.WHITE, fontWeight:'bold'}}>{title}</Text>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress={onRightIconPress}>
                    {showRightIcon&&<Image source={rightIcon} style={{width:sizes.SIZE_30, height:sizes.SIZE_30, resizeMode:'contain', marginRight:sizes.SIZE_12}}></Image>}
                </TouchableOpacity>
            </View>
        </View>
    )
}

  