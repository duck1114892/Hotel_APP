import axios from "../util/axios-customsize"

export const loginApi = (username, password) => {
    return axios.post('/api/v1/auth/login', { username, password })
}
export const signUpApi = (value) => {
    return axios.post('/api/v1/auth/register', value)
}
export const refesh = () => {
    return axios.get('/api/v1/auth/account')
}
export const getUser = (current, pageSize, email) => {
    return axios.get(`/api/v1/users?current=${current}&pageSize=${pageSize}&email=${email}`)
}
export const getListUser = () => {
    return axios.get(`/api/v1/users`)
}
export const getPermission = () => {
    return axios.get('/api/v1/permissions')
}
export const creatUser = (value) => {
    return axios.post('/api/v1/users', value)
}
export const getRole = () => {
    return axios.get('/api/v1/roles')
}
export const updateUser = (id, values) => {
    return axios.patch(`/api/v1/users/${id}`, values)
}
export const refreshToken = () => {
    return axios.get('/api/v1/auth/refresh')
}
export const deleteUser = (id) => {
    return axios.delete(`/api/v1/users/${id}`)
}
export const uploadFile = () => {
    return axios.post('/api/v1/files/upload')
}
export const getHotelApi = (current, pageSize, name, rating, address) => {

    const handleParam = () => {
        let params = `/api/v1/hotel?`
        if (name) {
            params += `&name=${name}`
        }
        if (rating) {
            params += `&rating>=${rating}`
        }
        if (address) {
            params += `&address=${address}`
        }
        if (current && pageSize) {
            params += `current=${current}&pageSize=${pageSize}`
        }
        return params
    }
    console.log(handleParam())
    return axios.get(handleParam())
}
export const creatHotel = (data) => {
    return axios.post('/api/v1/hotel', data)
}
export const creatRoom = (data) => {
    return axios.post('/api/v1/room', data)
}
export const updateHotel = (id, data) => {
    return axios.patch(`/api/v1/hotel/${id}`, data)
}
export const updateHotelRoomId = (id, data) => {
    return axios.patch(`/api/v1/hotel/updateRoomId/${id}`, data)
}
export const deleteHotel = (id) => {
    return axios.delete(`/api/v1/hotel/${id}`)
}
export const getRoom = () => {
    return axios.get('/api/v1/room')
}
export const getHotelById = (id) => {
    return axios.get(`/api/v1/hotel/${id}`)
}
export const getRoomList = (current, pageSize, address, price, rating, name) => {
    console.log(address, price)
    const handleParam = () => {
        let params = `/api/v1/room?current=${current}&pageSize=${pageSize}`;
        if (price) {
            params += `&price${price}`;
        }

        if (rating) {
            params += `&rating=${rating}`;
        }
        if (name) {
            params += `&name=${name}`;
        }
        if (address) {
            params += `&address=${address}`;
        }
        return params;
    };
    console.log(handleParam())
    return axios.get(handleParam())
}

export const getRoomById = (id) => {
    return axios.get(`/api/v1/room/${id}`)
}
export const updateRoom = (id, data) => {
    return axios.patch(`/api/v1/room/${id}`, data)
}
export const deleteRoom = (id) => {
    return axios.delete(`/api/v1/room/${id}`)
}
export const getBooking = () => {
    return axios.get(`/api/v1/booking?pageSize=100`)
}
export const createBooking = (data) => {
    return axios.post('/api/v1/booking', data)
}
export const updateBooking = (id, data) => {
    return axios.patch(`/api/v1/booking/${id}`, data)
}
export const deleteBooking = (id) => {
    return axios.delete(`/api/v1/booking/${id}`)
}
export const logout = () => {
    return axios.post('/api/v1/auth/logout')
}
export const callUploadBookImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('img', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/files/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "hotel"
        },
    });
}
export const getRatingApi = (id) => {
    return axios.get(`/api/v1/rating/${id}`)
}
export const creatRatingApi = (hotelId, rating, comment) => {
    return axios.post('/api/v1/rating', { hotelId, rating, comment })
}