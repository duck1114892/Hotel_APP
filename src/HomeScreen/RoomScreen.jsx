import { Box, Card, Center, Image, Link, ScrollView, View } from "native-base"
import { useEffect, useState } from "react"
import { RefreshControl, Text } from "react-native"
import { getRoomList } from "../../api/api"
import Ionicons from 'react-native-vector-icons/Ionicons';
const RoomScreen = ({ navigation }) => {
    const [room, setRoom] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 100);
    }
    useEffect(() => {
        const hotelApi = async () => {
            const resRoom = await getRoomList()
            setRoom(resRoom.data.result)
        }
        hotelApi()
    }, [refreshing])
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
            <View>
                {room.map((item) => {
                    return (
                        <Center>
                            <Link onPress={
                                () => switchPage(item._id)
                            }>

                                <Card key={item._id} style={{ display: 'flex', flexDirection: "row", backgroundColor: "white", borderRadius: 20, marginTop: 10, width: 390 }} >
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

            </View>
        </ScrollView >

    )
}
export default RoomScreen