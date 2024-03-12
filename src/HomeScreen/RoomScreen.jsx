import { Box, Button, Card, Center, Image, Link, ScrollView, View } from "native-base"
import { useEffect, useState } from "react"
import { RefreshControl, Text } from "react-native"
import { getRoomList } from "../../api/api"
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import exampleData from "../example data/data";
const RoomScreen = ({ navigation }) => {
    const [room, setRoom] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [filterAddress, setFilterAddress] = useState(null)
    const [filterPrice, setFilterPrice] = useState(null)
    const onRefresh = () => {
        setRefreshing(true);
        setFilterAddress(null)
        setFilterPrice(null)
        setTimeout(() => {
            setRefreshing(false);
        }, 100);
    }
    useEffect(() => {
        const hotelApi = async () => {
            const resRoom = await getRoomList(null, null, filterAddress, filterPrice, null, null)
            setRoom(resRoom.data.result)
        }
        hotelApi()
    }, [refreshing, filterAddress, filterPrice])
    const switchPage = (e) => {
        navigation.navigate('RoomDetail', {
            id: e
        })

    }
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={{ width: '100%', display: "flex", flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <RNPickerSelect
                    onValueChange={(value) => setFilterPrice(value)}
                    items={exampleData.price}
                    style={pickerSelectStyles}
                    value={filterPrice}
                    placeholder={{ label: "Khoảng Giá", value: null }}
                ></RNPickerSelect>
                <RNPickerSelect
                    onValueChange={(value) => setFilterAddress(value)}
                    items={exampleData.address}
                    style={pickerSelectStyles}
                    value={filterAddress}
                    placeholder={{ label: "Chọn Địa Điểm", value: null }}
                ></RNPickerSelect>
            </View>
            {room.length === 0 ? <View>
                <Center style={{ display: "flex", justifyContent: 'center', alignItems: "center", height: 500 }}>
                    <Center>
                        <Text marginTop={5} style={{ fontSize: 20 }}>Không Tìm Thấy Phòng Nào</Text>
                        <Ionicons marginTop={10} name="happy-outline" size={40} />
                        <Button width={100} marginTop={5} backgroundColor={'blue.400'} onPress={() => {
                            setFilterAddress(null)
                            setFilterPrice(null)
                        }}><Text style={{ fontSize: 15, color: "white" }}>Tìm Lại</Text></Button>
                    </Center>
                </Center>

            </View> : (<View>
                {room.map((item) => {
                    return (
                        <Center key={item._id} >
                            <Link onPress={
                                () => switchPage(item._id)
                            }>

                                <Card key={item._id} style={{ display: 'flex', flexDirection: "row", backgroundColor: "white", borderRadius: 20, marginTop: 10, width: "95%" }} >
                                    <Image src={`https://hotelbe.hotelduckgg.click/images/default/${item.img}`} height={100} width={100} borderRadius={20} alt=""></Image>
                                    <Box style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 40 }} >
                                        <Text style={{ fontWeight: "500", fontSize: 15 }}>{item.name}</Text>
                                        <Text style={{ marginTop: 2, color: "gray" }}><Ionicons style={{ paddingLeft: "5%" }} name="location-outline" />{item.address}</Text>
                                        <Text style={{ color: "rgba(249,109,1,1.00)", marginTop: 2, fontWeight: "700" }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</Text>
                                    </Box>
                                </Card>
                            </Link>
                        </Center>
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
        borderRadius: 20,
        width: 200
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
        borderRadius: 20,
        width: 200
    }
}
export default RoomScreen