import {
    LOGIN_SUCCESS, 
    CHECK_ISAUTH,
    UPDATE_USERLIST
} from '../utilities';

const INITIAL_STATE = {
    is_auth: localStorage.getItem('user') ? true : false,
    user_data: {},
    users_list: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user_data: action.payload
            };
        case CHECK_ISAUTH:
            return {
                ...state,
                is_auth: action.payload
            };
        case UPDATE_USERLIST:
            return {
                ...state,
                users_list: action.payload
            };
        default:
            return state;
    }
};