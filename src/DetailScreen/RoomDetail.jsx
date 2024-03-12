import { Avatar, Button, Card, ScrollView, Text, TextArea, View } from "native-base"
import { useEffect, useState } from "react"
import { getRoomById } from "../../api/api"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCallback } from "react";
import { SafeAreaView } from "react-native";
import Slideshow from "react-native-image-slider-show";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from 'dayjs'
import ModalPicker from "../Component/ModalPicker";
const RoomDetail = ({ route }) => {
    const { id } = route.params
    const [room, setRoom] = useState()
    const [visible, setIsVisible] = useState(false);
    const [img, setImg] = useState([])
    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    }, []);
    const getRoom = async () => {
        try {
            const res = await getRoomById(id)
            setRoom(res.data)
            const imageUrls = await res.data.slider.map((imageName) => ({
                url: `https://hotelbe.zeabur.app/images/default/${imageName}`

            }));
            setImg(imageUrls)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRoom()
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Card style={{ backgroundColor: "white", display: "flex", flexDirection: "row" }}>
                        <Avatar source={{ uri: `https://hotelbe.zeabur.app/images/default/${room?.img || 'khach-san-sam-quang-binh-3-scaled-1706798879828.jpg'}` }} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontWeight: "700", fontSize: 20 }}>{room?.name}</Text>
                            <Text><Ionicons style={{ paddingLeft: "5%" }} name="location-outline" />{room?.address}</Text>
                            <Text style={{ color: "rgba(249,109,1,1.00)", marginTop: 2, fontWeight: "700" }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room?.price)}</Text>
                        </View>
                    </Card>
                </View>
                <View>
                    <Card style={{ backgroundColor: "white" }}>
                        <View >
                            <Text
                                onTextLayout={onTextLayout}
                                numberOfLines={textShown ? undefined : 4}
                                style={{ lineHeight: 21 }}>{room?.description}</Text>

                            {
                                lengthMore ? <Text
                                    onPress={toggleNumberOfLines}
                                    style={{ lineHeight: 21, marginTop: 10, fontWeight: 700 }}>{textShown ? 'Thu Gọn' : 'Xem Thêm...'}</Text>
                                    : null
                            }
                        </View>
                    </Card>
                </View>
                <View>
                    <Card style={{ backgroundColor: "white" }}>
                        <Slideshow dataSource={img} />
                    </Card>
                </View>

                <View>
                    <ModalPicker prop={id} info={room}></ModalPicker>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default RoomDetail