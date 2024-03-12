import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

const baseUrl = 'https://hotelbe.zeabur.app';

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

const updateToken = async () => {
    try {
        const res = await instance.get('/api/v1/auth/refresh');
        if (res && res.data && res.data.access_token) {
            return res.data.access_token;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error updating token:', error);
        return null;
    }
}

let isRefreshing = false; // Flag to prevent concurrent token refresh requests

instance.interceptors.request.use(async function (config) {
    // Wait for AsyncStorage.getItem to resolve
    config.headers['Authorization'] = `Bearer ${await AsyncStorage.getItem('access_token')}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

const NO_RETRY_HEADER = 'x-no-retry';

instance.interceptors.response.use(
    function (response) {
        return response && response.data ? response.data : response;
    },
    async function (error) {
        if (error.config
            && error.response
            && error.response.status === 401
            && !error.config.headers[NO_RETRY_HEADER]
            && !isRefreshing) {
            isRefreshing = true;
            try {
                const access_token = await updateToken();
                if (access_token) {
                    error.config.headers['Authorization'] = `Bearer ${access_token}`;
                    AsyncStorage.setItem("access_token", access_token);
                    return instance.request(error.config);
                } else {
                    Alert.alert('Authentication failed. Please log in again.');
                }
            } catch (refreshError) {
                console.error('Error during token refresh:', refreshError);
                alert('Authentication failed. Please log in again.');
            } finally {
                isRefreshing = false;
            }
        } else {
            // Handle other errors
            alert(error.response?.data.message || 'An error occurred.');
        }
        return Promise.reject(error);
    }
);

export default instance;
