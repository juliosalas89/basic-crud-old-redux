import axiosClient from '../config/axiosClient.js';
import Swal from 'sweetalert2';
import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCES,
    GET_PRODUCTS_ERROR,
    DELETE_PRODUCT_SUCCESS,
    EDIT_PRODUCT,
    SET_PRODUCT_EDIT
} from '../types/productsTypes.js';


//ADD PRODUCTS ACTION
export const createProductAction = newProduct => {
    return async dispatch => {
        dispatch(addProduct());
        try {
            await axiosClient.post('/products', newProduct);
            dispatch(addProductSuccess(newProduct));
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product added correctly',
            })
        } catch (error) {
            console.log(error)
            dispatch(addProductError());
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong...',
            })
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT
})

const addProductSuccess = newProduct => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: newProduct
})
const addProductError = () => ({
    type: ADD_PRODUCT_ERROR
})


//GET PRODUCTS ACTION
export const getProductsAction = () => {
    return async dispatch => {
        dispatch(getProducts())

        try {
            const apiRequest = await axiosClient.get('/products');
            dispatch(getProductsSuccess(apiRequest.data));
        } catch (error) {
            dispatch(getProductsError());
        }
    }
}

const getProducts = () => ({
    type: GET_PRODUCTS
})

const getProductsSuccess = products => ({
    type: GET_PRODUCTS_SUCCES,
    payload: products
})

const getProductsError = () => ({
    type: GET_PRODUCTS_ERROR
})

//DELETE PRODUCT ACTION
export const deleteProductAction = product => {
    return dispatch => {
        Swal.fire({
            title: `Do you want to delete this product?: ${product.name}`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosClient.delete(`/products/${product.id}`)
                    dispatch(deleteProductSuccess(product))
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                } catch (error) {
                    Swal.fire(
                        'Ooops!',
                        'Something went wrong...',
                        'error'
                    )
                }

            }
        })
    }
}

const deleteProductSuccess = product => ({
    type: DELETE_PRODUCT_SUCCESS,
    payload: product
});

//EDIT PRODUCT ACTIONS
export const setProductToEditAction = product => {
    return dispatch => {
        dispatch( setProductToEdit(product))
    }
}

const setProductToEdit = product => ({
    type: SET_PRODUCT_EDIT,
    payload: product
})

export const editProductAction = product => {
    return async dispatch => {
        try {
            await axiosClient.put(`products/${product.id}`, product);
            dispatch(editProduct(product));
            Swal.fire(
                'Updated!',
                'The product has been updated succesfully',
                'success'
            )
        } catch (error) {
            Swal.fire(
                'Ooops!',
                'Something went wrong...',
                'error'
            )
        }
    }
}

const editProduct = product => ({
    type: EDIT_PRODUCT,
    payload: product
})