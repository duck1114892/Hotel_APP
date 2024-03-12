import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getHotelApi, loginApi, refesh } from './api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/HomeScreen/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/AuthScreen/loginScreen';
import Toast from 'react-native-toast-message';
import RegisterSreen from './src/AuthScreen/registerScreen';
import { Provider, useDispatch } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import HotelDetail from './src/DetailScreen/HotelDetail';
import { NativeBaseProvider } from 'native-base';
import RoomDetail from './src/DetailScreen/RoomDetail';




export default function App() {
  const Stack = createNativeStackNavigator();
  return (

    <NativeBaseProvider>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Stack.Navigator screenOptions={{
              headerShown: false
            }} initialRouteName='Login'>
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerLeft: null }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerLeft: null }} />
              <Stack.Screen name="SignUp" component={RegisterSreen} options={{ title: 'Sign Up', headerLeft: null }} />
              <Stack.Screen name="HotelDetail" component={HotelDetail} options={{ title: 'HotelDetail', headerLeft: null }} />
              <Stack.Screen name="RoomDetail" component={RoomDetail} options={{ title: 'RoomDetail', headerLeft: null }} />
            </Stack.Navigator>
          </PersistGate>
        </Provider>
      </NavigationContainer >
    </NativeBaseProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
