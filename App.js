import React, { Component } from 'react'
import { SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
// navigation
import AppNavigator from './src/navigator/AppNavigator'

// redux, redux-saga
import {Provider} from 'react-redux'
import rootReducer from './src/redux/reducers/rootReducer'
import rootSaga from './src/redux/sagas/rootSaga'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

// debug
import { composeWithDevTools } from 'redux-devtools-extension'
// middleware
const sagaMiddleware = createSagaMiddleware(); // Sagamiddleware between action and reducer

// notification
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))// store contain all reducer,middleware
sagaMiddleware.run(rootSaga);


export default class App extends Component {
  render() {
    return (
      // store is placed in Provider tag
      <SafeAreaProvider>
        <Provider store={store}> 
          <SafeAreaView style = {{flex:1}}>
            <AppNavigator/>
          </SafeAreaView>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

