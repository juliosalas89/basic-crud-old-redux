import React from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { deleteProductAction } from '../actions/productsActions';
import { setProductToEditAction } from '../actions/productsActions';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { name, price, id } = product;

    const handleDelete = () => {
        dispatch(deleteProductAction(product))
    }

    const handleEdit = () => {
        dispatch(setProductToEditAction(product));
        navigate('/products/new')
    }

    return (
        <tr>
            <td>{name}</td>
            <td className='text-center'>$ {price}</td>
            <td className='acciones'>
                <button
                    onClick={handleEdit}
                    className='btn btn-primary mr-2'>Edit</button>
                <button
                    onClick={handleDelete}
                    type='button'
                    className='btn btn-danger'
                >Delete</button>
            </td>
        </tr>
    );
};

export default Product;