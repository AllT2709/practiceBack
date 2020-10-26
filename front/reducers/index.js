import { combineReducers} from 'redux';
import authReducer from './authReducers';
import contactsReducer from './contactsReducers'
import errorReducer from './errorReducers';

export default combineReducers({
    auth: authReducer,
    contacts: contactsReducer,
    errors: errorReducer
})