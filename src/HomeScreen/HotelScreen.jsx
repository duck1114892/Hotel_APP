import { Box, Button, Card, Center, Image, Link, ScrollView, View } from "native-base"
import { useEffect, useState } from "react"
import { RefreshControl, Text } from "react-native"
import { AirbnbRating } from "react-native-ratings"
import { getHotelApi } from "../../api/api"
import Ionicons from 'react-native-vector-icons/Ionicons';

const HotelScreen = ({ navigation }) => {
    const [hotel, setHotelData] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = () => {
        setRefreshing(true);
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
            const res = await getHotelApi()
            console.log(res.data.result)
            setHotelData(res.data.result)
        }
        hotelApi()
    }, [refreshing])
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View>
                {hotel.map((item) => {
                    return (

                        <Card key={item._id} style={{ display: 'flex', flexDirection: "row", backgroundColor: "white", borderRadius: 20, marginLeft: 10, marginRight: 10, marginTop: 10 }} >
                            <Link onPress={() => {
                                switchPage(item._id)
                            }}>
                                <Image src={`https://hotelbe.zeabur.app/images/default/${item.logo}`} height={100} width={100} borderRadius={20} alt=""></Image>
                                <Box style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 40 }} >
                                    <Text style={{ fontWeight: "500", fontSize: 15 }}>{item.name}</Text>
                                    <Text style={{ marginTop: 10, color: "gray" }}><Ionicons style={{ paddingLeft: "5%" }} name="location-outline" />{item.address}</Text>
                                    <Text><AirbnbRating size={15} defaultRating={item.rating} isDisabled showRating={false} ></AirbnbRating></Text>
                                </Box>
                            </Link>
                        </Card>

                    )
                })}

            </View>
        </ScrollView >
    )
}
export default HotelScreen