import Detail from '../Detail';
import './card.css';
import Modal from '../Modal/SpinnerModal'
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, userSelector } from '../../redux/selectors';
import { useState } from 'react';
import { checkRememberUser, middlewareAddCart } from '../../services';

export default function ({ product }) {
    const { userId } = checkRememberUser();
    const { cartList } = useSelector(cartSelector);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const handleAddToCart = (e) => {
        e.stopPropagation();
        middlewareAddCart({ dispatch, cartList, product, userId });
    }

    return (
        <>
            <div className='col' onClick={() => setShow(!show)}>
                <div className='card rounded'>
                    <div className='card-header' title={product?.name}>
                        <img src={product?.attachment} alt='item' className='image rounded' />
                    </div>
                    <div className='card-body'>
                        <div className='ps-4 pe-4'>
                            <p className='name' title={product?.name}>{product?.name}</p>
                            <span className='desc mt-4'>{product?.description}</span>
                        </div>
                        <div className='price-wrap mt-8 d-flex-center-y justify-content-between ps-4 pe-4'>
                            <span className={product?.promotion ? 'price disable' : 'price'}>
                                {product?.price}<sup>đ</sup>
                            </span>
                            {
                                product?.promotion &&
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