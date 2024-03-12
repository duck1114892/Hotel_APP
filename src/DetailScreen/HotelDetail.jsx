import React, { useEffect, useState } from "react";
import {
    Text, TouchableWithoutFeedback, View,
    TextInput,
    Platform,
    KeyboardAvoidingView,

    Keyboard,
    RefreshControl,
} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import Slideshow from 'react-native-image-slider-show';
import { Avatar, Box, Card, Image, Input, ScrollView, Button, Center, Select, FlatList, CheckIcon, Link } from "native-base";
import { AirbnbRating, Rating } from "react-native-ratings";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { creatRatingApi, getHotelById, getRatingApi, getRoomById } from "../../api/api";
import exampleData from "../example data/data";
import SelectDropdown from 'react-native-select-dropdown'

const HotelDetail = ({ route, navigation }) => {
    const { id } = route.params;
    const [hotelData, setHotelData] = useState(null);
    const [sliderImages, setSliderImages] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [rating, setRating] = useState([])
    const [star, setStar] = useState(4)
    const [comment, setComment] = useState()
    const [refreshing, setRefreshing] = useState(false);
    const handleComment = async () => {
        const res = await creatRatingApi(id, star, comment)
        console.log(res)
        if (res.statusCode === 201) {
            onRefresh()
            setComment('')
            setStar(4)
        }
    }
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 100);
    }
    const switchPage = (e) => {
        navigation.navigate('RoomDetail', {
            id: e
        })

    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const hotelResponse = await getHotelById(id);
                setHotelData(hotelResponse.data);
                const roomPromises = hotelResponse.data.roomId.map(async (roomId) => {
                    const roomResponse = await getRoomById(roomId);
                    return roomResponse.data;
                });
                const roomData = await Promise.all(roomPromises);
                setRooms(roomData);

                const imageUrls = hotelResponse.data.slider.map((imageName) => ({
                    url: `https://hotelbe.zeabur.app/images/default/${imageName}`
                }));
                setSliderImages(imageUrls);

                const getRating = await getRatingApi(id)
                setRating(getRating.data)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id, refreshing]);

    const handleGetText = (e) => {
        setComment(e)
    }
    const setStars = (e) => {
        setStar(e)
    }
    const pickerSelectStyles = {
        inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray', // Màu của viền
            borderRadius: 4,
            color: 'black',
            backgroundColor: "white",
            paddingRight: 30, // to ensure the text is never behind the icon
            width: 100,
            height: 52
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View>
                    <Slideshow dataSource={sliderImages} />
                    <Card style={{ backgroundColor: "white", display: "flex", flexDirection: "row" }}>
                        <Avatar source={{ uri: `https://hotelbe.zeabur.app/images/default/${hotelData?.logo || 'khach-san-sam-quang-binh-3-scaled-1706798879828.jpg'}` }} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontWeight: "700", fontSize: 20 }}>{hotelData?.name}</Text>
                            <Text><Ionicons style={{ paddingLeft: "5%" }} name="location-outline" />{hotelData?.address}</Text>
                            <Text>
                                <AirbnbRating size={15} defaultRating={hotelData?.rating} isDisabled showRating={false} />
                            </Text>
                        </View>

                    </Card>
                    <ScrollView maxHeight={500} nestedScrollEnabled={true}>
                        <View >
                            {rooms.length !== 0 ? (
                                rooms.map((room) => (
                                    <Link onPress={
                                        () => switchPage(room._id)
                                    }>
                                        <Card key={room._id} style={{ display: 'flex', flexDirection: "row", backgroundColor: "white", borderRadius: 20, marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                                            <Image source={{ uri: `https://hotelbe.zeabur.app/images/default/${room.img}` }} height={100} width={100} borderRadius={20} alt="" />
                                            <Box style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 40 }}>
                                                <Text style={{ fontWeight: "500", fontSize: 15 }}>{room.name}</Text>
                                                <Text style={{ marginTop: 2, color: "gray" }}><Ionicons style={{ paddingLeft: "5%" }} name="location-outline" />{room.address}</Text>
                                                <Text style={{ color: "rgba(249,109,1,1.00)", marginTop: 2, fontWeight: "700" }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.price)}</Text>
                                            </Box>
                                        </Card>
                                    </Link>
                                ))
                            ) : (
                                <View><Text style={{ textAlign: 'center' }}>Phòng Trống</Text></View>
                            )}
                        </View>

                    </ScrollView>

                    <Text style={{ fontSize: 20, fontWeight: "700", paddingLeft: "5%", marginTop: "5%", marginBottom: "5%", color: "rgba(35,93,159,1.00)" }}>Đánh Giá</Text>
                    <ScrollView maxHeight={300} nestedScrollEnabled={true}>
                        <View >
                            {rating?.map((item) => {
                                return (<Center>
                                    <Card key={item._id} style={{ backgroundColor: "white", marginTop: 10, borderRadius: 20, width: 390 }}>
                                        <Text style={{ fontWeight: 600 }}>{item.createdBy.email}</Text>
                                        <Text>{item.comment}</Text>
                                        <AirbnbRating size={15} defaultRating={item?.rating} isDisabled showRating={false} />
                                    </Card>
                                </Center>
                                )
                            })}
                        </View>
                    </ScrollView>
                    <View>
                        <View style={{ marginTop: 60 }} >
                            <Center style={{ display: "flex", flex: 1, flexDirection: 'row' }}>
                                <RNPickerSelect
                                    onValueChange={(value) => setStars(value)}
                                    items={exampleData.star}
                                    style={pickerSelectStyles}
                                    value={star}

                                >
                                </RNPickerSelect>

                                <Input style={{ backgroundColor: "white", height: 50, marginTop: "10" }} width={300} placeholder="Bình Luận" value={comment} onChangeText={(text) => handleGetText(text)} />
                            </Center>
                            <View >
                                <Center>
                                    <Button mt="2" width={40} height={60} borderRadius={20} justifyItems="center" colorScheme="indigo" onPress={handleComment} >
                                        Bình Luận
                                    </Button>
                                </Center>
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView >
        </KeyboardAvoidingView >

    );
};

export default HotelDetail;
