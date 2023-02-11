import Detail from '../Detail';
import './card.css';
import Modal from '../Modal/SpinnerModal'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { checkRememberUser, middlewareAddCart } from '../../services';
import { baseURL } from '../../API';
import { useNavigate } from 'react-router-dom';

export default function ({ product }) {
    const { userId } = checkRememberUser();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (userId)
            middlewareAddCart({ dispatch, product, userId });
        else
            navigate('/sign-in');
    }

    return (
        <>
            <div className='col' onClick={() => setShow(!show)}>
                <div className='card rounded'>
                    <div className='card-header' title={product?.prodName}>
                        <img src={baseURL + "/products/" + product?.image} alt='item' className='image rounded' />
                    </div>
                    <div className='card-body'>
                        <div className='ps-4 pe-4'>
                            <p className='name' title={product?.prodName}>{product?.prodName}</p>
                            <span className='desc mt-4'>{product?.description}</span>
                        </div>
                        <div className='price-wrap mt-8 d-flex-center-y justify-content-between ps-4 pe-4'>
                            <span className={product?.promotion != 0 ? 'price disable' : 'price'}>
                                {product?.price}<sup>đ</sup>
                            </span>
                            {
                                product?.promotion != 0 &&
                                <span className='promotion'>
                                    {product.promotion}<sup>đ</sup>
                                </span>
                            }
                            <span className='sold'>
                                Đã bán {product?.sold}
                            </span>
                        </div>
                    </div>
                    <div className='card-footer text-center pt-4 pb-16 ps-16 pe-16 d-flex-center-y justify-content-between'>
                        <button className='btn-view-detail btn btn-sm btn-outline-primary'> Xem chi tiết</button>
                        <button
                            className='btn-add-cart btn btn-sm btn-outline-primary'
                            onClick={handleAddToCart}
                        >
                            <i className="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
                {
                    show && <Modal><Detail product={product} setShow={setShow} /></Modal>
                }
            </div >
        </>
    );
};