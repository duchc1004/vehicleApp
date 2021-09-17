import * as React from 'react';
import { Image, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './RootNavigation';

import { connect } from 'react-redux'

import Login from '../screens/Login'
import Home from '../screens/Home'
import Notifi from '../screens/Notifi'
import Request from '../screens/Request'
import RequestDetail from '../screens/RequestDetail'
import TimeSheet from '../screens/TimeSheet'
import TimeSheetDetail from '../screens/TimeSheetDetail'
import Statistics from '../screens/Statistics'
import VehicleInfo from '../screens/VehicleInfo'

const Stack = createNativeStackNavigator();


const navOptionHandler = ({navigation}) => ({
    headerShown: false
})

class Navigator extends React.Component {
    render() {
        return (
            <NavigationContainer ref={navigationRef}>
             <Stack.Navigator>
                {!this.props.isLoggedIn ?
                  <Stack.Screen name="Login" component={Login} options ={navOptionHandler}/>
                  :
                  (<>
                    <Stack.Screen name="Home" component={Home} options ={navOptionHandler} />
                    <Stack.Screen name="Notifi" component={Notifi} options ={navOptionHandler}/>
                    <Stack.Screen name="Request" component={Request} options ={navOptionHandler} />
                    <Stack.Screen name="RequestDetail" component={RequestDetail} options ={navOptionHandler} />
                    <Stack.Screen name="TimeSheet" component={TimeSheet} options ={navOptionHandler} />
                    <Stack.Screen name="TimeSheetDetail" component={TimeSheetDetail} options ={navOptionHandler} />
                    <Stack.Screen name="Statistics" component={Statistics} options ={navOptionHandler}/>
                    <Stack.Screen name="VehicleInfo" component={VehicleInfo} options ={navOptionHandler}/>
                  </>)
                }
              </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.authReducer.isLoggedIn,
  isLoggedOut: state.authReducer.isLoggedOut,
})

const mapDispatchToProp = (dispatch) =>({
})

const AppNavigator = connect(mapStateToProps, mapDispatchToProp)(Navigator)
export default AppNavigator