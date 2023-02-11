import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import { pageSelector, productsSelector } from "../../redux/selectors";
import Product from '../Product/';
import Modal from '../Modal/SpinnerModal';
import ModalDetail from '../Modal'
import Spinner from '../Spinner';
import Pagination from "../Pagination";
import { SIZE_PAGE } from "../../redux/paginationSlice";
import Control from "../Control";
import Detail from "../Detail";
import { modalSelector } from '../../redux/selectors';
import { modalSlice } from '../Modal/modalSlice';
import './content.css';

export default function () {
    const dispatch = useDispatch();
    const isShow = useSelector(modalSelector);
    const { products, status, type } = useSelector(productsSelector);
    const { beginPoint, endPoint } = useSelector(pageSelector);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [type]);
    return (
        <main className='container body-content'>
            <h2 style={{ fontSize: '3rem', fontWeight: 500 }} className="heading mt-16">XU HƯỚNG TÌM KIẾM</h2>
            <Control />
            {
                status === 'loading' ? <Modal><Spinner /></Modal> :
                    <div className='mt-16 row'>
                        {
                            products.length > 0 && products?.map((product, index) => {
                                if (index >= beginPoint && index < endPoint)
                                    return (< Product key={product?.prodCode} product={product} />)
                            })
                        }
                    </div>
            }
            <Pagination total={Math.ceil(products?.length / SIZE_PAGE)} />
        </main>
    )
}