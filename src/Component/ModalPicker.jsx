import { Header } from '@rneui/base';
import dayjs from 'dayjs';
import { Card, Input, NumberInput, NumberInputField, ScrollView } from 'native-base';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker/src/DateTimePicker';
import { useSelector } from 'react-redux';
import { createBooking } from '../../api/api';
import Toast from "react-native-toast-message";
const ModalPicker = (prop) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(dayjs())
    const [checkOut, setCheckOut] = useState()
    const [total, setTotal] = useState(prop?.info?.price)
    const [disabled, setDisabled] = useState(false)
    const getId = useSelector(state => state.loginReducer.user.id);
    const onChange = (e) => {
        setDate(e.date)
    }
    const onChangeOut = (e) => {
        setCheckOut(e.date);
        const dateObjectIn = dayjs(date);
        const dateObjectOut = dayjs(e.date);
        setDisabled(false)
        if (dateObjectOut.isAfter(dateObjectIn)) {
            const diff = dateObjectOut.diff(dateObjectIn, 'day');
            const daysDiff = dateObjectOut.date() - dateObjectIn.date();
            const monthsDiff = dateObjectOut.month() - dateObjectIn.month();

            let totalDays = diff;
            let totalMonths = monthsDiff;

            if (daysDiff < 0) {
                totalDays = dateObjectIn.daysInMonth() - dateObjectIn.date() + dateObjectOut.date();
                totalMonths--;
            }

            if (totalMonths < 0) {
                totalMonths += 12;
            }

            // Tính tổng tiền dựa trên số ngày và số tháng
            const totalPrice = totalDays * prop?.info?.price + totalMonths * prop?.info?.price * 30;

            setTotal(totalPrice);
        } else {
            setTotal(0);
            Alert.alert("Không Được Chọn Ngày Hôm Trước")
            setDisabled(true)
        }
    };

    const hanldeBooking = async () => {
        try {
            // Chuyển đổi định dạng ngày thành đối tượng Date
            const checkInDate = new Date(date);
            const checkOutDate = new Date(checkOut);

            const res = await createBooking({
                userId: getId,
                roomId: prop?.prop,
                quantity: 1,
                total: total,
                checkInDate: checkInDate.toISOString(),
                checkOutDate: checkOutDate.toISOString(),
                status: "PENDING"
            });
            if (res.statusCode === 201) {
                setModalVisible(!modalVisible)
                Alert.alert(res.message)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Fail',
                    text2: res.message
                });
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <ScrollView>
            <View style={{ display: 'flex', flex: 1, flexDirection: "1" }}>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>

                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Card>
                                    <Text style={{ fontWeight: "700", fontSize: 20 }}>Tổng:<Text style={{ color: "rgba(249,109,1,1.00)" }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</Text></Text>
                                </Card>
                                <ScrollView>
                                    <DateTimePicker
                                        mode="single"
                                        date={date}
                                        onChange={onChange}

                                    />
                                    <Text>Đến Ngày</Text>
                                    <DateTimePicker
                                        mode="single"
                                        date={checkOut}
                                        onChange={onChangeOut}

                                    />
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                        <Pressable disabled={disabled}
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={hanldeBooking}>
                                            <Text style={styles.textStyle}>Đặt Phòng</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose2]}
                                            onPress={() => setModalVisible(!modalVisible)}>
                                            <Text style={styles.textStyle}>Hủy</Text>
                                        </Pressable>
                                    </View>

                                </ScrollView>
                            </View>
                        </View>

                    </Modal>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.textStyle}>Đặt Phòng</Text>
                    </Pressable>
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#2196F3',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonClose2: {
        backgroundColor: 'red',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ModalPicker;