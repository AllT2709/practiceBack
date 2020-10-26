import axios from 'axios';

import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, IS_LOGGEDIN } from './types'
import setAuthToken from '../utils/setAuthToken'

export const register = (dataUser,history) => dispatch => {
    console.log(dataUser);
    axios.post('http://localhost:3000/auth/register', dataUser)
        .then(res => {
            console.log(res);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            history.push('/login')
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: REGISTER_FAIL,
                payload: err
            })
        })
}


export const login = (dataUser,history) => dispatch => {
    console.log(dataUser);
    axios.post('http://localhost:3000/auth/login', dataUser)
        .then(res => {
            console.log(res);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            const {token}=res.data.body;
            document.cookie = `token=${token}`;
            setAuthToken(token)
            history.push('/profile')
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: LOGIN_FAIL,
                payload: err
            })
        })
}

export const loggedIn = ()=>{
    dispatch({
        type:IS_LOGGEDIN
    })
}