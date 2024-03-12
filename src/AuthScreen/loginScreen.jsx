import * as React from "react";
import { useState } from "react";
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    HStack,
    Center,
    NativeBaseProvider,
} from "native-base";
import { loginApi } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import HeaderComponent from "../Header/headerComponet";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispath = useDispatch()
    const data = useSelector(state => state.loginReducer)
    if (data.isAuth) {
        navigation.replace("Home")
    }
    const handleSignIn = async () => {
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Vui Lòng Điền Đầy Đủ Thông Tin'
            });
            return;
        }
        const res = await loginApi(email, password)
        try {
            if (res.statusCode === 201) {
                AsyncStorage.setItem('access_token', res.data.access_token)
                Toast.show({
                    type: 'success',
                    text1: 'Hello',
                    text2: res.message
                });
                setTimeout(() => {
                    navigation.replace("Home")
                }, 1000)

            }
            else {
                Alert.alert(res.message)
            }

        } catch (error) {
            console.log(error)
        }
    };

    return (<>
        <Toast />
        <NativeBaseProvider>

            <Center mt="20%">
                <Center w="100%">
                    <Box safeArea p="2" py="8" w="90%" maxW="500" >
                        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>

                        </Heading>
                        <Heading
                            mt="1"
                            _dark={{
                                color: "warmGray.200",
                            }}
                            color="coolGray.600"
                            fontWeight="medium"
                            size="xs"
                        >

                        </Heading>

                        <VStack space={15} mt="5">
                            <FormControl>
                                <FormControl.Label>Email ID</FormControl.Label>
                                <Input height="60" borderRadius="20" value={email} onChangeText={(text) => setEmail(text)} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input height="60" borderRadius="20" type="password" value={password} onChangeText={(text) => setPassword(text)} />

                            </FormControl>
                            <Center>
                                <Button mt="2" width={40} height={60} borderRadius={20} justifyItems="center" colorScheme="indigo" onPress={handleSignIn}>
                                    Sign in
                                </Button>
                            </Center>


                            <HStack mt="6" justifyContent="center">
                                <Text fontSize="sm" color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                                    I'm a new user.{" "}
                                </Text>
                                <Link
                                    _text={{
                                        color: "indigo.500",
                                        fontWeight: "medium",
                                        fontSize: "sm",
                                    }}
                                    onPress={() => navigation.navigate('SignUp')}
                                >
                                    Sign Up
                                </Link>
                            </HStack>
                        </VStack>
                    </Box>
                </Center>
            </Center>
        </NativeBaseProvider >
    </>
    );

};
export default LoginScreen
