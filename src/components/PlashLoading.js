import React from "react";
import { ActivityIndicator, StyleSheet, ImageBackground, View,Dimensions } from "react-native";
import bg from '../assets/images/bg.png'
export default function PlashLoading () {
  return(
    <View style={[styles.container, styles.horizontal]}>
        <ImageBackground style={{flex:1}} source={bg}>
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        </ImageBackground>  
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
  }
});