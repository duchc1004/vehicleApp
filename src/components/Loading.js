import React from "react";
import { ActivityIndicator, StyleSheet, Text, View,Image, Modal } from "react-native";
import {colors, sizes} from '../assets/styles/index'
import DSLogo from '../assets/images/DSLogo.png'
export default function Loading (props){
  let {showLoading} = props;
  return(
    <Modal
    animationType="fade"
    transparent={true}
    visible={showLoading}
    >
        <View style={styles.modal}>
           <Image source = {DSLogo} style = {{width: sizes.SIZE_120, height:sizes.SIZE_120, resizeMode:'contain'}}/>
           <ActivityIndicator size="large" color="#00ff00" />
           <Text style={{fontSize:sizes.FONT_18, color:colors.DS1}}>Loading...</Text>
        </View>
    </Modal>)
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: colors.TRANS_LIGHT,
    justifyContent: 'center',
    alignItems: "center",
    paddingBottom:sizes.SIZE_100
},
});