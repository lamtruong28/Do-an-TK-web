import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from '../../../API';
import formSlice from '../../../redux/formSlice';
import { fetchProducts, destroyProduct } from '../../../redux/productSlice';
import { productsSelector } from '../../../redux/selectors';
import Modal from '../../Modal';
import { modalSlice } from '../../Modal/modalSlice';
import SpinnerModal from '../../Modal/SpinnerModal';
import Spinner from '../../Spinner';
import './productTable.css';

export default function () {
    const dispatch = useDispatch();
    const { products, status } = useSelector(productsSelector);
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const handleRomveProduct = async (id) => {
        const result = confirm("Bạn có chắc chắn muốn xóa sản phẩm?");
        if (result) {
            await dispatch(destroyProduct(id));
            dispatch(fetchProducts());
        }
    }

    const handleEditProduct = (product) => {
        dispatch(formSlice.actions.dataEditFormPayload(product));
        dispatch(formSlice.actions.showEditForm());
        dispatch(modalSlice.actions.openModal());
    }

    return (
        <>
            {
                status === 'loading' ? <SpinnerModal><Spinner /></SpinnerModal> :
                    <div className="container mt-16">
                        <h1 className='text-center mb-8'>Danh sách sản phẩm</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th className='text-center stt'>STT</th>
                                    <th className='text-center name'>Tên sản phẩm</th>
                                    <th className='text-center desc'>Mô tả</th>
                                    <th className='text-center desc'>Danh mục</th>
                                    <th className='text-center price'>Giá</th>
                                    <th className='text-center promotion'>Giá khuyến mãi</th>
                                    <th className='text-center img'>Hình ảnh</th>
                                    <th className='text-center action'>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products?.length > 0 && products.map((product, index) => (
                                        <tr key={product?.prodCode}>
                                            <td className='stt text-center'>{index + 1}</td>
                                            <td className='name'>{product?.prodName}</td>
                                            <td className='desc'>{product?.description}</td>
                                            <td className='type'>
                                                {
                                                    product?.prodTypeCode === 'male' && 'Giày nam' ||
                                                    product?.prodTypeCode === 'female' && 'Giày nữ' ||
                                                    product?.prodTypeCode === 'bag' && 'Balo - Túi sách' ||
                                                    product?.prodTypeCode === 'accessory' && "Phụ kiện" || ''
                                                }
                                            </td>
                                            <td className='price text-center'>{product?.price}</td>
                                            <td className='promotion text-center'>{product?.promotion}</td>
                                            <td className='img'>
                                                <div style={{
                                                    background: `url("${baseURL}/products/${product?.image}") center / cover no-repeat`,
                                                    width: 100,
                                                    height: 100,
                                                    margin: '0 auto'
                                                }}></div>
                                            </td>
                                            <td className='text-center action'>
                                                <button
                                                    className='btn btn-sm btn-outline-primary me-8'
                                                    onClick={() => handleEditProduct(product)}
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button
                                                    className='btn btn-sm btn-outline-danger'
                                                    onClick={() => handleRomveProduct(product.prodCode)}
                                                >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </>
    );
};