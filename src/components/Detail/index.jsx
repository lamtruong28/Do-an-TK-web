import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector } from '../../redux/selectors';
import { useNavigate } from 'react-router-dom';
import './detail.css';
import { checkRememberUser, middlewareAddCart, middlewareBuy } from '../../services';
import { baseURL } from '../../API';


export default function ({ product, setShow }) {
    const { userId } = checkRememberUser();
    const [quantity, setQuantity] = useState(1);
    const { cartList } = useSelector(cartSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleIncrease = () => {
        setQuantity(quantity + 1)
    }
    const handleDecrease = () => {
        if (quantity === 1) return;
        setQuantity(quantity - 1)
    }

    const handleClickBuy = () => {
        middlewareBuy({ userId, product, navigate, dispatch, quantity });
        setShow(false);
    }

    const handleAddToCart = () => {
        if (userId) {
            middlewareAddCart({ dispatch, cartList, product, quantity, userId });
            setShow(false);
        } else
            navigate('/sign-in');
    }

    return (
        <div className='container'>
            <div className='detail-product row justify-content-between' onClick={(e) => e.stopPropagation()}>
                <div className="btn btn-close d-flex-center" onClick={() => setShow(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className='col col-6 detail-product__item'>
                    <div className="detail-product__img"
                        style={{ background: `url("${baseURL}/products/${product?.image}") center center / contain no-repeat` }}
                    ></div>
                </div>
                <div className="col col-6  detail-product__item">
                    <div className='nav-sup'></div>
                    <div className='ps-16'>
                        <div className='pt-16'>
                            <h2 className='name text-center'>{product?.prodName}</h2>
                            <p className='mt-16 text-center'>{product?.description}</p>
                        </div>
                        <div className='d-flex justify-content-around mt-16 mb-8'>
                            <div className='Detail_product_list-item-content-start'>
                                <span>4.8</span>
                            </div>
                            <div className='Detail_product_list-item-content-evaluate'>
                                <span>46 Đánh Giá</span>
                            </div>
                            <div className='Detail_product_list-item-content-sold'>
                                <span>Đã Bán {product?.sold}</span>
                            </div>
                        </div>
                        <div className='price-wrap d-flex-center  mt-16'>
                            <span className={product?.promotion != 0 ? 'price disable' : 'price'}>{product?.price}<sup>đ</sup></span>
                            {
                                product?.promotion != 0 && <span className='promotion ms-32'>{product?.promotion}<sup>đ</sup></span>
                            }

                        </div>
                        <div className='Detail_product_list-item-content-c5 mt-16'>
                            <div className='Detail_product_list-item-content-table d-flex-center-y'>
                                <p className='title'>Màu Sắc</p>
                                <button className='ms-8 btn btn-sm'>Màu đen</button>
                            </div>
                            <div className='mt-16 d-flex-center-y mb-16'>
                                <span className='title'>Size</span>
                                <div className='product__size d-flex'>
                                    <button className='size active btn btn-sm ms-8'>37</button>
                                    <button className='size btn btn-sm ms-8'>38</button>
                                    <button className='size btn btn-sm ms-8'>39</button>
                                    <button className='size btn btn-sm ms-8'>40</button>
                                    <button className='size btn btn-sm ms-8'>41</button>
                                    <button className='size btn btn-sm ms-8'>42</button>
                                    <button className='size btn btn-sm ms-8'>43</button>
                                </div>
                            </div>
                            <div className='quantity d-flex-center-y'>
                                <p className='title'>Số Lượng</p>
                                <div className='control ms-8 d-flex-center-y'>
                                    <button
                                        type='button'
                                        className='btn btn-control'
                                        onClick={handleDecrease}
                                    > - </button>
                                    <input
                                        className='control-box rounded ms-4 me-4'
                                        type='number'
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                    <button
                                        type='button'
                                        className='btn btn-control'
                                        onClick={handleIncrease}
                                    > + </button>
                                </div>
                            </div>
                        </div>
                        <div className='mt-32 text-center'>
                            <button className='btn btn-sm btn-outline-primary' onClick={handleClickBuy}>
                                <span> Mua Ngay </span>
                            </button>
                            <button className='btn btn-sm btn-outline-primary ms-16' onClick={handleAddToCart} >
                                <i className="fa-solid fa-cart-plus me-4"></i>
                                <span>Thêm vào giỏ</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}