import { AUTH, LOGOUT } from "../constants/actionTypes";

export default (state = { authData: null }, action) => {
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };//change authData
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };//clear authData
        default:
            return state;
    }
}