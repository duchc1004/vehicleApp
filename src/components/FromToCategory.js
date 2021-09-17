import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function FromToCategory(props) {
    const {fromText, toText} = props;
    return (
        <View style={{flexDirection:'row'}}>
            <Text style={styles.categoryText}>{fromText}</Text>
            <Text style={styles.categoryText}>{toText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryText:{
        flex:1,
        marginTop:sizes.SIZE_5,
        padding:sizes.SIZE_5,
        fontSize:sizes.FONT_16,
        color:colors.GRAY_DARK
    }
})

