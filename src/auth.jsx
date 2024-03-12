import { useDispatch } from "react-redux";
import { useEffect } from "react";
import React from 'react';
import { refesh } from "../api/api";
import { isLogin } from "./redux/login/action";
const AuthComponent = () => {
    const dispatch = useDispatch()
    const fetchData = async () => {
        try {
            const refesht = await refesh();
            if (refesht && refesht.data) {
                dispatch(isLogin(refesht.data));
            } else {
                throw new Error('Refresh failed: No data returned');
            }
        } catch (error) {
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <></>
    )
}
export default AuthComponent