import { Badge, Box, Center, Image, ScrollView, View, Card } from "native-base"
import { useEffect, useState } from "react"
import { RefreshControl, Text } from "react-native"

import { useSelector } from "react-redux"
import { getBooking } from "../../api/api"

const UserScreen = () => {
    const [booking, setBooking] = useState([])
    const info = useSelector(state => state.loginReducer.user)
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }

    useEffect(() => {
        const getBookingApi = async () => {
            const res = await getBooking()
            console.log(refreshing)
            setBooking(res?.data?.result)
        }
        getBookingApi()
    }, [refreshing])
    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View>
                <Text style={{ fontWeight: "700", paddingLeft: "5%", marginTop: "5%", color: "rgba(35,93,159,1.00)", fontSize: 20 }}>Thông Tin</Text>
                <Center>
                    <Card style={{ backgroundColor: "white", marginTop: 20, height: 60, width: 300 }}>
                        <View marginLeft={10} style={{}}>
                            <Text style={{ fontWeight: 800 }}>Email:  <Text style={{ fontWeight: 500 }}>{info.email}</Text> </Text>
                            <Text style={{ fontWeight: 800 }}>Tên: <Text style={{ fontWeight: 500 }}>{info.name}</Text></Text>
                        </View>
                    </Card>
                </Center>
                <Text style={{ fontWeight: "700", paddingLeft: "5%", marginTop: "5%", color: "rgba(35,93,159,1.00)", fontSize: 20 }}>Booking</Text>
                <ScrollView maxHeight={550}>
                    <View>
                        {
                            booking.map((item) => {
                                return (
                                    <Center>
                                        <Card key={item._id} style={{ display: 'flex', flex: 1, flexDirection: "row", backgroundColor: "white", borderRadius: 20, marginTop: 10, width: 390 }} >
                                            <Image src={`https://hotelbe.hotelduckgg.click/images/default/${item?.roomId?.img}`} height={100} width={100} borderRadius={20} alt=""></Image>
                                            <Box style={{ width: 300, display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 40 }} >
                                                <Text style={{ fontWeight: "500", fontSize: 15 }}>{item?.roomId?.name}</Text>
                                                <Text style={{ color: "rgba(249,109,1,1.00)", marginTop: 2, fontWeight: "700" }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.total)}</Text>
                                                <Box width={100} marginTop={5}>
                                                    {
                                                        item?.status === 'PENDING' ? (<Badge colorScheme="gray" _text={{
                                                            color: "white"
                                                        }} variant="solid" rounded="4">
                                                            {item?.status}
                                                        </Badge>) : (<Badge colorScheme="darkBlue" _text={{
                                                            color: "white"
                                                        }} variant="solid" rounded="4">
                                                            {item?.status}
                                                        </Badge>)
                                                    }
                                                </Box>
                                            </Box>
                                        </Card>

                                    </Center>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>

        </ScrollView>
    )
}
export default UserScreen