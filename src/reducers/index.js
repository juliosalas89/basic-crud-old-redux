import { combineReducers } from "redux";
import productReducer from "./productsReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
    products: productReducer,
    alert: alertReducer
})