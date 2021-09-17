import React, { Component } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import Header from '../components/Header'

export default class Notifi extends Component {
    render() {
        return (
            <View>
                <Header title="Notifications"  navigation={this.props.navigation} />
                <Text> textInComponent </Text>
            </View>
        )
    }
}

