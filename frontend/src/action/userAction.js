import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_PROFILE_DETAILS_REQUEST, USER_PROFILE_DETAILS_SUCCESS, USER_PROFILE_DETAILS_FAIL, USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_REQUEST, USER_PROFILE_UPDATE_FAIL } from "../constant/userConstant"

export const userLogin = (email, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/user/login', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
};

export const userLogout = () => async (dispatch) => {

    localStorage.removeItem('userInfo');
    dispatch({
        type: USER_LOGOUT
    })

};

export const userRegister = (name, email, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/user', { name, email, password }, config)
        console.log(data)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        //After registering dispatch the login to get the user login on userInfo
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
};

export const userProfileDetails = () => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_PROFILE_DETAILS_REQUEST
        })

        //get the token from localstorage
        const { userLogin: { userInfo } } = getState();

        //send the token in header 
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.get('/api/user/profile', config)
        dispatch({
            type: USER_PROFILE_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_PROFILE_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
};

// Profile update

export const userProfileUpdate = (dat) => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_PROFILE_UPDATE_REQUEST
        })

        //get the token from localstorage
        const { userLogin: { userInfo } } = getState();

        //send the token in header 
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.put('/api/user/profile', dat, config)

        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
};