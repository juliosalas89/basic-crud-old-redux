import {HIDE_ALERT, SHOW_ALERT} from '../types/alertTypes.js';

// SHOW ALERT ACTION
export const showAlertAction = messege => {
    return dispatch => {
        dispatch(showAlert(messege))
    }
}

const showAlert = messege => ({
    type: SHOW_ALERT,
    payload: messege
})

// HIDE ALERT ACTION
export const hideAlertAction = ()=> {
    return dispatch => {
        dispatch(hideAlert());
    }
}

const hideAlert = ()=> ({
    type: HIDE_ALERT
})