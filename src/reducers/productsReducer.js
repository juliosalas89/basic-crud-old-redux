import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCES,
    GET_PRODUCTS_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    EDIT_PRODUCT,
    SET_PRODUCT_EDIT
} from '../types/productsTypes.js'

const initialState = {
    products: [],
    error: false,
    loading: false,
    productToEdit: null
};


//esta nomenclatura quiere decir que si no se le pasa ningun state entonces toma como parametro initialState
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
        case ADD_PRODUCT:
            return {
                ...state,
                loading: true
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }
        case ADD_PRODUCT_ERROR:
            return {
                ...state,
                loading: false
            }
        case GET_PRODUCTS_SUCCES:
            return {
                ...state,
                error: false,
                loading: false,
                products: action.payload
            }
        case GET_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload.id)
            }
        case SET_PRODUCT_EDIT:
            return {
                ...state,
                productToEdit: action.payload
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                productToEdit: null,
                products: state.products.map(product => product.id === action.payload.id ? action.payload : product)
            }
        default:
            return state;
    }
}

export default productReducer;
