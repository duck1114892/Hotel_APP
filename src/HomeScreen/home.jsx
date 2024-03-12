import { Button, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import HeaderComponent from "../Header/headerComponet"
import { NativeBaseProvider } from "native-base"
import { refesh } from "../../api/api"
import { isLogin } from "../redux/login/action"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import LoginScreen from "../AuthScreen/loginScreen"
import RegisterScreen from "../AuthScreen/registerScreen"
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainScreen from "./HomeScreen"
import HotelScreen from "./HotelScreen"
import RoomScreen from "./RoomScreen"
import UserScreen from "./UserScreen"
import AuthComponent from "../auth"
const HomeScreen = () => {
    const data = useSelector(state => state.loginReducer)
    const Tab = createBottomTabNavigator();
    return (<>
        <NativeBaseProvider>
            <HeaderComponent />
            <AuthComponent></AuthComponent>
            <Tab.Navigator screenOptions={{
                headerShown: false
            }}>
                <Tab.Screen name="Trang Chủ" options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={20} />
                    ),

                }} component={MainScreen} />
                <Tab.Screen name="Khách Sạn" options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="airplane-sharp" color={color} size={20} />
                    ),
                }} component={HotelScreen} />
                <Tab.Screen name="Phòng" options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bed-outline" color={color} size={20} />
                    ),
                }} component={RoomScreen} />
                <Tab.Screen name="Tài Khoản" options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={20} />
                    ),
                }} component={UserScreen} />

            </Tab.Navigator>

        </NativeBaseProvider>
    </>
    )
}
export default HomeScreen