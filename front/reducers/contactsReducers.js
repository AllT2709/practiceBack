import { ADD_CONTACT,GET_CONTACT,GET_CONTACTS,UPDATE_CONTACT,DELETE_CONTACT,ERROR } from '../actions/types'

const initialState = {
    contacts: [],
    newContact: {},
    //error:{}
}

export default function(state= initialState, action){
    switch(action.type){
        case ADD_CONTACT:
            return{
                ...state,
                newContact: action.payload
            }
        case GET_CONTACTS:
            return{
                ...state,
                contacts: action.payload
            }
        case ERROR:
        default: return state
    }
}