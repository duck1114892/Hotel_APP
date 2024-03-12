import { Box, Card, Center, FormControl, Image, ScrollView } from "native-base"
import { ImageBackground, RefreshControl, Text, View } from "react-native"
import exampleData from "../example data/data"
import { useEffect, useState } from "react"
import RNPickerSelect from 'react-native-picker-select';
import { getHotelApi, getRoomList } from "../../api/api";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AirbnbRating, Rating } from "react-native-ratings";

const MainScreen = () => {
    const [address, setAddress] = useState()
    const [data, setData] = useState()
    const [mostRatingHotel, setMostRatingHotel] = useState([])
    const [bestRoom, setBestRoom] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 100);
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
    useEffect(() => {
        const hotelApi = async () => {
            const resHotel = await getHotelApi(null, null, null, 4)
            setMostRatingHotel(resHotel.data.result)
            const resRoom = await getRoomList(null, null, null, '<=1000000', null, null)
            setBestRoom(resRoom.data.result)
        }
        hotelApi()
    }, [refreshing])
    return (

        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View >

                <Box style={{ width: "100%" }} >
                    <Text style={{ fontWeight: "700", paddingLeft: "5%", marginTop: "5%", marginBottom: "5%", color: "rgba(35,93,159,1.00)" }}>Khách Sạn Ưa Thích Nhất</Text>
                    <Center>
                        <ScrollView horizontal>
                            {mostRatingHotel.length === 0 ? <Text>...Loading</Text> : (
                                <>{
                                    mostRatingHotel.map(item => {
                                        return (<Card style={{ padding: 0, display: 'flex', alignItems: "center", borderRadius: 10 }} key={item._id} marginLeft="2" backgroundColor="white" height={230} width={180}>
                                            <Image style={{ width: "100%", height: "50%", borderRadius: 10 }} src={`https://hotelbe.hotelduckgg.click/images/default/${item.logo}`} alt=""></Image>
                                            <Text style={{ fontWeight: "500", fontSize: 15, marginTop: "10%" }}>{item.name}</Text>
                                            <Text style={{ color: "gray", marginTop: "5%", marginBottom: "10%", fontSize: 10 }}><Ionicons style={{ paddingLeft: "5%" }} name="location-outline" />{item.address}</Text>
                                            <AirbnbRating size={15} defaultRating={item.rating} isDisabled showRating={false} ></AirbnbRating>
                                        </Card>)
                                    })}</>
                            )}

                        </ScrollView>
                    </Center>
                </Box>
                <Box style={{ width: "100%" }} >
                    <Text style={{ fontWeight: "700", paddingLeft: "5%", marginTop: "5%", marginBottom: "5%", color: "rgba(35,93,159,1.00)" }}>Phòng Giá Hợp Lý</Text>
                    <Center>
                        <ScrollView horizontal>
                            {bestRoom.length === 0 ? <Text>...Loading</Text> : (
                                <>{
                                    bestRoom.map(item => {
                                        return (<Card style={{ padding: 0, display: 'flex', alignItems: "center", borderRadius: 10 }} key={item._id} marginLeft="2" backgroundColor="white" height={230} width={180}>
                                            <Image style={{ width: "100%", height: "50%", borderRadius: 10 }} src={`https://hotelbe.hotelduckgg.click/images/default/${item.img}`} alt=""></Image>
                                            <Text style={{ fontWeight: "500", fontSize: 15, marginTop: "10%" }}>{item.name}</Text>
                                            <Text style={{ color: "gray", marginTop: "5%", marginBottom: "10%", fontSize: 10 }}><Ionicons style={{ paddingLeft: "5%" }} name="location-outline" />{item.address}</Text>
                                            <Text style={{ color: "rgba(249,109,1,1.00)", fontWeight: "700" }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</Text>
                                        </Card>)
                                    })}</>
                            )}

                        </ScrollView>
                    </Center>
                </Box>
                <Box >
                    <Text style={{ fontWeight: "700", paddingLeft: "5%", marginTop: "5%", color: "rgba(35,93,159,1.00)" }}>Địa Điểm</Text>
                    <Center style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                        <View backgroundColor="rgba(255, 255, 255, 0)" >
                            <Image source={require('../../public/img/hcm.jpg')} height={40} borderRadius={20} alt=""></Image>
                            <Text style={{
                                position: 'absolute',
                                color: 'white',
                                fontSize: 18,
                                top: 60,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                width: '100%',
                            }}>Hồ Chí Minh</Text>
                        </View>
                    </Center>
                    <Center style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                        <View >
                            <Image source={require('../../public/img/dn.jpg')} height={40} borderRadius={20} alt=""></Image>
                            <Text style={{
                                position: 'absolute',
                                color: 'white',
                                fontSize: 18,
                                top: 60,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                width: '100%',
                            }}>Đà Nẵng</Text>
                        </View>

                    </Center>
                    <Center style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                        <View style={{ position: "relative" }} >
                            <Image source={require('../../public/img/hn.jpg')} height={40} borderRadius={20} alt=""></Image>
                            <Text style={{
                                position: 'absolute',
                                color: 'white',
                                fontSize: 18,
                                top: 60,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                width: '100%',
                            }}>Hà Nội</Text>
                        </View>
                    </Center>
                </Box>

            </View>

        </ScrollView>

    )
}
export default MainScreen