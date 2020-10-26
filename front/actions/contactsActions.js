import axios from 'axios';
import { ADD_CONTACT,GET_CONTACT,GET_CONTACTS,UPDATE_CONTACT,DELETE_CONTACT,ERROR } from './types'

export const getContact = ( )=> dispatch => {
    axios.get('http://localhost:3000/api/contacts')
        .then(res =>{
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
        })
        .catch(err =>{
            dispatch({
                type: ERROR,
                payload: err
            })
        })
}

export const addContact = ( dataContact )=> dispatch => {
    axios.get('http://localhost:3000/api/contacts/add', dataContact)
        .then(res =>{
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        })
        .catch(err =>{
            dispatch({
                type: ERROR,
                payload: err
            })
        })
}