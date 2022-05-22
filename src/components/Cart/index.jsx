import './cart.css';
import noCart from '../../assets/images/no-cart.png';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector } from '../../redux/selectors';
import { destroyCart } from '../../redux/cartSlice';
import { checkRememberUser, middlewareBuy } from '../../services';
import { useNavigate } from 'react-router-dom';
export default function () {
    const { cartList } = useSelector(cartSelector);
    const { isLogin } = checkRememberUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickBuy = async (product) => {
        await middlewareBuy({ isLogin, product, navigate, dispatch, quantity: product.quantity });
        await dispatch(destroyCart(product.id));
    }

    return (
        <section>
            <div className="header__cart-list">
                {
                    cartList?.length === 0 ?
                        <>
                            <img className="header__cart-no-cart-img" src={noCart} alt="No-cart" />
                            <p className="header__cart-no-cart-msg text-center">Chưa có sản phẩm</p>
                        </>
                        :
                        <>
                            <h4 className="header__cart-heading text-center">Sản phẩm mới thêm</h4>
                            <ul className="header__cart-list-item">
                                {
                                    cartList?.map(item => (
                                        <li className="header__cart-item" key={item.id} title={item.description}>
                                            <img className="header__cart-img" src={item?.attachment} alt="img SP" />
                                            <div className="header__cart-item-info">
                                                <div className="header__cart-item-head">
                                                    <h5 className="header__cart-item-name">{item?.name}</h5>
                                                    <div className="header__cart-item-price-wrap">
                                                        <span className="header__cart-item-price">{item?.promotion || item.price}</span>
                                                        <span className="header__cart-item-multiply">x</span>
                                                        <span className="header__cart-item-quantity">{item?.quantity}</span>
                                                    </div>
                                                </div>
                                                <div className="header__cart-item-body d-flex">
                                                    <span className="header__cart-item-decription">{item?.description}</span>
                                                    <span
                                                        className="header__cart-item-buy"
                                                        onClick={() => handleClickBuy(item)}
                                                    >Mua</span>
                                                    <span
                                                        className="header__cart-item-remove ms-8"
                                                        onClick={() => dispatch(destroyCart(item.id))}
                                                    >Xóa</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                }



            </div>
        </section>
    )
}