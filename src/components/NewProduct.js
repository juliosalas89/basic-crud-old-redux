import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { createProductAction } from '../actions/productsActions.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { editProductAction } from '../actions/productsActions.js';
import { showAlertAction } from '../actions/alertActions.js';

const NewProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: ''
    });
    const loading = useSelector(state => state.products.lading);
    const { name, price } = newProduct;
    const productToEdit = useSelector(state => state.products.productToEdit);
    const alert = useSelector(state => state.alert.alert);
    
    useEffect(()=> {
        if(productToEdit) {
            setNewProduct({
                name: productToEdit.name,
                price: productToEdit.price
            });
        } else {
            setNewProduct({
                name: '',
                price: ''
            });
        }
    },[productToEdit]);

    
    const handleChange = e => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
    }
    

    const handleSubmit = e => {
        e.preventDefault();
        if (name.trim() === '' || price.trim() === '') {
            dispatch(showAlertAction('All fields are required.'));
            return;
        }
        dispatch(showAlertAction(null));
        if(productToEdit) {
            dispatch(editProductAction({
                ...newProduct,
                id: productToEdit.id
            }));
        } else {
            dispatch(createProductAction(newProduct));
        }
        navigate('/');
    }

    return (
        <div className='row justify-content-center'>
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4">{productToEdit ? 'Edit Product' : 'Add Porduct'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Product Name'
                                    name='name'
                                    value={name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Product Price</label>
                                <input
                                    type="number"
                                    className='form-control'
                                    placeholder='Price'
                                    name='price'
                                    value={price}
                                    onChange={handleChange}
                                />
                            </div>
                            {alert ? <p className='alert alert-warning'>{alert}</p> : null}
                            <button
                                type='submit'
                                className='btn btn-primary d-block w-100 text-uppercase'
                            >{productToEdit ? 'Edit' : 'Add'}</button>
                        </form>
                        {loading ? <p>Loading...</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProduct;