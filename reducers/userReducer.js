/**
 * Created by nylee on 1/12/2016.
 */
import {firebaseConfig} from '../firebase_init';

const initialState = {
    user: null
};

export default function users(state = initialState, action) {
    switch(action.type){
        case 'SET_USER_DATA':
            var firebaseKey = firebaseConfig.apiKey;
            var user = JSON.parse(localStorage.getItem("firebase:authUser:"+firebaseKey+":[DEFAULT]"));
            return {...state, user: user};
        case 'RESET_USER_DATA':
            return {...state, user:null};
        default:
            return state;
    }
}