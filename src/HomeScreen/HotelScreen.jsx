import { Box, Button, Card, Center, Image, Link, ScrollView, View } from "native-base"
import { useEffect, useState } from "react"
import { RefreshControl, Text } from "react-native"
import { AirbnbRating } from "react-native-ratings"
import { getHotelApi } from "../../api/api"
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import exampleData from "../example data/data"
const HotelScreen = ({ navigation }) => {
    const [hotel, setHotelData] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [filter, setFilter] = useState('')
    const onRefresh = () => {
        setRefreshing(true);
        setFilter('')
        setTimeout(() => {
            setRefreshing(false);
        }, 100);
    }
    const switchPage = (e) => {
        navigation.navigate('HotelDetail', {
            id: e
        })

    }
    useEffect(() => {
        const hotelApi = async () => {
            const res = await getHotelApi(null, null, null, null, filter)
            setHotelData(res.data.result)
        }
        hotelApi()
    }, [refreshing, filter])
    return (

        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Center>
                <View style={{ width: '90%' }}>
                    <RNPickerSelect
                        onValueChange={(value) => setFilter(value)}
                        items={exampleData.address}
                        style={pickerSelectStyles}
                        value={filter}
                        placeholder={{ label: "Chọn Địa Điểm", value: null }}
                    ></RNPickerSelect>
                </View>
            </Center>
            {hotel.length === 0 ? <View>
                <Center style={{ display: "flex", justifyContent: 'center', alignItems: "center", height: 500 }}>
                    <Center>
                        <Text marginTop={5} style={{ fontSize: 20 }}>Không Tìm Thấy Khách Sạn Nào</Text>
                        <Ionicons marginTop={10} name="happy-outline" size={40} />
                        <Button width={100} marginTop={5} backgroundColor={'blue.400'} onPress={() => setFilter('')}><Text style={{ fontSize: 15, color: "white" }}>Tìm Lại</Text></Button>
                    </Center>
                </Center>

            </View> : (
                <View>
                    {hotel.map((item) => {
                        return (

                            <Card key={item._id} style={{ display: 'flex', flexDirection: "row", backgroundColor: "white", borderRadius: 20, marginLeft: 10, marginRight: 10, marginTop: 10 }} >
                                <Link onPress={() => {
                                    switchPage(item._id)
                                }}>
                                    <Image src={`https://hotelbe.hotelduckgg.click/images/default/${item.logo}`} height={100} width={100} borderRadius={20} alt=""></Image>
                                    <Box style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 40 }} >
                                        <Text style={{ fontWeight: "500", fontSize: 15 }}>{item.name}</Text>
                                        <Text style={{ marginTop: 10, color: "gray" }}><Ionicons style={{ paddingLeft: "5%" }} name="location-outline" />{item.address}</Text>
                                        <Text><AirbnbRating size={15} defaultRating={item.rating} isDisabled showRating={false} ></AirbnbRating></Text>
                                    </Box>
                                </Link>
                            </Card>

                        )
                    })}

                </View>)}
        </ScrollView >



    )

}
const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'gray', // Màu của viền
        borderRadius: 4,
        color: 'black',
        backgroundColor: "white",
        paddingLeft: 10,
        height: 52,
        borderRadius: 20
    },
    inputAndroid: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'gray', // Màu của viền
        borderRadius: 4,
        color: 'black',
        backgroundColor: "white",
        paddingLeft: 10,
        height: 52,
        borderRadius: 20
    }
}
export default HotelScreen