import React from 'react'
import { View, Text } from 'react-native'
// notification
import CustomButton from '../components/CustomButton';

export default function Statistics() {
  return (
    <View>
      <CustomButton type ={'ds2'} text={'aaaaa'} onPress={()=>getNotificationToken()} />
    </View>
  )
}
