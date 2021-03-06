import { HIDE_ALERT, SHOW_ALERT } from "../types/alertTypes";


const initialState = {
    alert: null,
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                alert: action.payload
            };
        case HIDE_ALERT:
            return {
                ...state,
                alert: null
            };
        default:
            return state;
    }
}

export default alertReducer;