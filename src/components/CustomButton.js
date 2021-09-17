import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { colors, sizes } from '../assets/styles/index';

export default function CustomButton(props) {
    const {type, text, onPress} = props;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button, 
                type=='ds2'&&{backgroundColor: colors.DS2},
                type=='ds2_white'&&{backgroundColor: colors.WHITE, borderColor:colors.DS2, borderWidth:sizes.SIZE_1},
                type=='alert'&&{backgroundColor: colors.ALERT},
                ]
            }>
                <Text style= {[styles.text,
                    type=='ds2'&&{color: colors.WHITE},
                    type=='ds2_white'&&{color: colors.DS2},
                    type=='alert'&&{color: colors.WHITE},
                    ]
                }>
                    {text}
                </Text>
            </View>   
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent:'center',
        alignItems:'center',
        height: sizes.SIZE_50,
        width:sizes.SIZE_350,
        margin: sizes.SIZE_5,
        paddingHorizontal:sizes.SIZE_3,
        borderRadius:sizes.SIZE_5,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    text:{
        fontSize:sizes.FONT_22,
        textAlign:'center'
    }
});