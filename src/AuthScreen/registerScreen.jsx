import React from 'react';
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider } from "native-base";
import RNPickerSelect from 'react-native-picker-select';
import exampleData from "../example data/data";
import { useState } from "react";
import { signUpApi } from '../../api/api';
import Toast from 'react-native-toast-message';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");

    const handlePress = async () => {

        if (!email || !password || !age || !address || !gender || !name) {
            alert("Vui Lòng Điền Đủ Thông Tin")
        }
        else {
            try {
                const res = await signUpApi({
                    name: name,
                    email: email,
                    password: password,
                    age: age,
                    gender: gender,
                    address: address,
                })
                if (res.statusCode === 201) {
                    Toast.show({
                        type: 'success',
                        text1: 'Thành Công',
                        text2: res.message
                    });
                    setTimeout(() => {
                        navigation.replace("Login")
                    }, 1000)
                }
            } catch (error) {

            }
        }

    };

    // Define the style for RNPickerSelect
    const pickerSelectStyles = {
        inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray', // Màu của viền
            borderRadius: 4,
            color: 'black',
            paddingRight: 30, // to ensure the text is never behind the icon
            borderRadius: 30
        },
        inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'gray', // Màu của viền
            borderRadius: 8,
            color: 'black',
            paddingRight: 30, // to ensure the text is never behind the icon
        },
    };

    return (
        <>
            <Toast></Toast>
            <NativeBaseProvider>
                <Center px="3">
                    <Center w="100%">
                        <Box safeArea p="2" w="90%" maxW="400" py="8">
                            <Heading size="lg" color="coolGray.800" fontWeight="semibold">
                                Welcome
                            </Heading>
                            <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
                                Sign up to continue!
                            </Heading>
                            <VStack space={3} mt="5">
                                <FormControl>
                                    <FormControl.Label>Name</FormControl.Label>
                                    <Input borderColor="coolGray.500" height={50} borderRadius={30} onChangeText={(text) => setName(text)} />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Email</FormControl.Label>
                                    <Input borderColor="coolGray.500" height={50} borderRadius={30} onChangeText={(text) => setEmail(text)} />
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label>Age</FormControl.Label>
                                    <RNPickerSelect
                                        onValueChange={(value) => setAge(value)}
                                        items={exampleData.age}
                                        style={pickerSelectStyles} // Sử dụng style ở đây
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Gender</FormControl.Label>
                                    <RNPickerSelect
                                        onValueChange={(value) => setGender(value)}
                                        items={exampleData.sex}
                                        style={pickerSelectStyles} // Sử dụng style ở đây
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Address</FormControl.Label>
                                    <RNPickerSelect
                                        onValueChange={(value) => setAddress(value)}
                                        items={exampleData.address}
                                        style={pickerSelectStyles} // Sử dụng style ở đây
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Password</FormControl.Label>
                                    <Input borderColor="coolGray.500" borderRadius={30} height={50} type="password" onChangeText={(text) => setPassword(text)} />
                                </FormControl>
                                <Center>
                                    <Button borderRadius={20} onPress={handlePress} mt="2" width={40} height={60} colorScheme="indigo">
                                        Sign up
                                    </Button>
                                </Center>
                            </VStack>
                        </Box>
                    </Center>
                </Center>
            </NativeBaseProvider>
        </>
    );
};

export default RegisterScreen;
