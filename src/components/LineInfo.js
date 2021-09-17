import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import { colors, sizes } from '../assets/styles';
import tap from '../assets/images/tap.png'
import addImg from '../assets/images/addImg.png'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export default function LineInfo(props) {
    const {type, titles, value, editable, onChangeText, showAlert, pressable, onPress, keyboardType, tapTable, leftImage, onLeftImgPress, leftImagePressable } = props;
    return (
        <TouchableOpacity style={{flex:1}} disabled ={!pressable} onPress={onPress}>
            <View style={[styles.textContainer, type === 'area'&&{height:sizes.SIZE_100}, showAlert&&{borderColor:colors.WARNING}, (editable||pressable)&&{backgroundColor:colors.CLOUD}, (pressable)&&{backgroundColor:colors.CLOUD}]}>
                    {leftImage?
                    <View style={{justifyContent:'center', paddingTop:sizes.SIZE_3}}>
                        <TouchableOpacity onPress={onLeftImgPress}>
                            <Image source = {addImg} style = {{width: sizes.SIZE_35, resizeMode:'contain'}} />
                        </TouchableOpacity>
                    </View> : 
                    <Text style={styles.title}>{titles}</Text>}
                    <TextInput 
                    editable={editable}
                    style={[styles.content,type === 'number'&&{textAlign:'right'}, 
                        (type === 'text'||type === 'area')&&{flex:4, textAlign:'left'}, 
                        type==='money'&&{textAlign:'right', paddingRight:0}]}
                    maxLength={1000}
                    multiline = {true}
                    numberOfLines = {4}
                    keyboardType={keyboardType}
                    value= {value} 
                    onChangeText = {onChangeText}
                    />
                    {type === 'money'&&<Text style={styles.thousand}>,000</Text>}
                    {(type !== 'number'&&type !== 'money')&&
                        <View style={{width: sizes.SIZE_40, justifyContent:'center'}}>
                        {(tapTable&&pressable)&&<Image source = {tap} style = {{width: sizes.SIZE_35, resizeMode:'contain'}} />}
                        </View>    
                    }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textContainer:{
        flex:1,
        flexDirection:'row', 
        backgroundColor:colors.WHITE,
        padding:sizes.SIZE_5,
        height:sizes.SIZE_46,
        borderRadius:sizes.SIZE_5,
        borderWidth:sizes.SIZE_1,
        borderColor:colors.CLOUD,
        margin:sizes.SIZE_2,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        flex:1,
        fontSize: sizes.FONT_14,
        color:colors.BLUR,
        textAlignVertical:'center'
    },

    thousand:{
        fontSize: sizes.FONT_18,
        color:colors.BLACK,
        textAlignVertical:'center'
    },

    content: {
        flex:2.3,
        fontSize: sizes.FONT_18,
        color:colors.BLACK,
        paddingHorizontal:sizes.SIZE_5,
        textAlign:'left',
        textAlignVertical:'center',
        paddingTop: 0,
        paddingBottom: 0,
    },
});