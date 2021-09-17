import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Category(props) {
    const {text} = props;
    return (
        <View>
            <Text style={styles.categoryText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryText:{
        marginTop:sizes.SIZE_5,
        padding:sizes.SIZE_5,
        fontSize:sizes.FONT_16,
        color:colors.GRAY_DARK
    }
})

