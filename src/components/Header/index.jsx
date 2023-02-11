import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, modalSelector } from '../../redux/selectors';
import { Link } from 'react-router-dom';
import './header.css';
import logo from './img/main_logo.png';
import { useEffect, useState } from 'react';
import { cancelRememberUser, checkRememberUser } from '../../services';
import Cart from '../Cart';
import { fetchCarts } from '../../redux/cartSlice';
import ChangePass from '../Form/ChangePass';
import Modal from '../Modal';
import { modalSlice } from '../Modal/modalSlice';

export default function () {
    const { isLogin, userId, userName } = checkRememberUser();
    const theme = localStorage.getItem('theme');
    const [themeApp, setThemeApp] = useState('light');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { cartList } = useSelector(cartSelector);
    const [quantity, setQuantity] = useState(0);
    const isShow = useSelector(modalSelector);

    useEffect(() => {
        setThemeApp(theme);
        userId && dispatch(fetchCarts(userId));
        document.documentElement.setAttribute('data-theme', theme);
    }, []);
    useEffect(() => {
        setQuantity(cartList?.length);
    }, [cartList?.length]);

    const handleDarkTheme = () => {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        setThemeApp('dark');
    }

    const handleLightTheme = () => {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        setThemeApp('light');
    }

    return (
        <header className="header">
            <div className="container-fluid">
                <nav className="header__navbar">
                    <div className="btn btn-sm btn-menu-mobile" onClick={() => setShow(!show)}>
                        <i className="header__navbar-icon fa-solid fa-bars"></i>
                    </div>
                    <ul className={show ? "header__navbar-list header__navbar-left active" : "header__navbar-list header__navbar-left"}>
                        <li className="header__navbar-item header__navbar--separate">
                            <a href="#" className="header__navbar-item-link">
                                <i className="ms-4 me-4 header__navbar-icon fa-solid fa-house-fire"></i>
                                <span>Sản phẩm bán chạy</span>
                            </a>
                            <ul className="header__sub-nav header__sub-nav-mobile">
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Sản phẩm bán chạy cho nữ
                                    </a>
                                </li>
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Sản phẩm bán chạy cho nam
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="header__navbar-item header__navbar--separate">
                            <a href="#" className="header__navbar-icon-link">
                                <i className="ms-4 me-4 header__navbar-icon fa-brands fa-shopify"></i>
                            </a>
                            <a href="#" className="header__navbar-item-link">
                                Giày nam
                            </a>
                            <ul className="header__sub-nav header__sub-nav-mobile">
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Giày thể thao nam
                                    </a>
                                </li>
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Dép nam
                                    </a>
                                </li>
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Sandal nam
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="header__navbar-item header__navbar--separate">
                            <a href="#" className="header__navbar-icon-link">
                                <i className="ms-4 me-4 header__navbar-icon fa-brands fa-shopify"></i>
                            </a>
                            <a href="#" className="header__navbar-item-link">
                                Giày nữ
                            </a>
                            <ul className="header__sub-nav header__sub-nav-mobile">
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Dép nữ
                                    </a>
                                </li>
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Sandal nữ
                                    </a>
                                </li>
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Giày cao gót
                                    </a>
                                </li>
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Giày thể thao nữ
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="header__navbar-item header__navbar--separate">
                            <a href="#" className="header__navbar-icon-link">
                                <i className="ms-4 me-4 header__navbar-icon fa-solid fa-bag-shopping"></i>
                            </a>
                            <a href="#" className="header__navbar-item-link">
                                Ba lô - Túi xách
                            </a>
                            <ul className="header__sub-nav header__sub-nav-mobile">
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Ba lô laptop, du lịch, thời trang
                                    </a>
                                </li>
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Túi đeo chéo
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="header__navbar-item">
                            <a href="#" className="header__navbar-item-link">
                                <i className="ms-4 me-4 header__navbar-icon fa-solid fa-socks"></i>
                                <span>Phụ Kiện</span>
                            </a>
                            <ul className="header__sub-nav header__sub-nav-mobile">
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Vớ
                                    </a>
                                </li>
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Chai vệ sinh giày
                                    </a>
                                </li>
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Dây giày
                                    </a>
                                </li>
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Đế lót
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <span className="btn btn-sm btn-menu-close rounded" onClick={() => setShow(!show)}>
                            <i className="header__navbar-icon fa-solid fa-arrow-left-long"></i>
                        </span>
                    </ul>

                    <ul className="header__navbar-list">
                        <li className="header__navbar-item">
                            <a href="#" className="header__navbar-item-link">
                                <i className="ms-4 me-4 header__navbar-icon fa-solid fa-bolt-lightning"></i>
                                <span>Sale</span>
                            </a>
                            <ul className="header__sub-nav">
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Sale 79k nam
                                    </a>
                                </li>
                                <li className="header__sub-nav-item">
                                    <i className="header__subnav-icon fa-solid fa-caret-right"></i>
                                    <a href="#" className="sub-nav-item-link">
                                        Sale 79k nữ
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="header__navbar-item">
                            <a href="#" className="header__navbar-icon-link">
                                <i className="ms-4 me-4 header__navbar-icon fa-solid fa-bell"></i>
                            </a>
                            <a href="#" className="header__navbar-item-link">
                                Thông Báo
                            </a>
                        </li>
                        <li className="header__navbar-item">
                            <div className="header__navbar-item-link ms-4 d-flex-center">
                                {
                                    isLogin ?
                                        <>
                                            <span className="avatar me-4 d-flex-center">
                                                {userName?.charAt(0).toUpperCase()}
                                            </span>
                                            {userName}
                                        </> :
                                        <Link to='/sign-in' className='header__btn-login'>
                                            <i className="ms-4 me-4 header__navbar-icon fa-solid fa-user"></i>
                                            Đăng nhập
                                        </Link>
                                }
                                {
                                    isLogin && (
                                        <ul className="header__sub-nav">
                                            <li className="header__sub-nav-item theme">
                                                <a href="#" className="sub-nav-item-link">
                                                    {
                                                        themeApp && themeApp === 'dark' ? <i className="fa-solid fa-moon me-4"></i>
                                                            : <i className="fa-solid fa-sun me-4"></i>
                                                    }
                                                    Giao diện
                                                </a>
                                                <ul className='theme-app rounded'>
                                                    <li className='theme-item rounded' onClick={handleLightTheme}>
                                                        <i className="fa-solid fa-sun me-4"></i>
                                                        Sáng
                                                    </li>
                                                    <li className='theme-item rounded' onClick={handleDarkTheme}>
                                                        <i className="fa-solid fa-moon me-4"></i>
                                                        Tối
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="header__sub-nav-item">
                                                <a href="#" className="sub-nav-item-link" onClick={() => dispatch(modalSlice.actions.openModal())}>
                                                    <i className="fa-solid fa-key me-4"></i>
                                                    Đổi mật khẩu
                                                </a>
                                            </li>
                                            <li className="header__sub-nav-item">
                                                <Link to="sign-in" onClick={() => cancelRememberUser()} className="sub-nav-item-link">
                                                    <i className="fa-solid fa-arrow-right-from-bracket me-4"></i>
                                                    Đăng xuất
                                                </Link>
                                            </li>
                                        </ul>
                                    )
                                }
                            </div>
                        </li>
                    </ul>
                </nav>
                <div className="container">
                    <div className="header-with-search">
                        <div className="header__logo">
                            <img src={logo} alt="Logo cua trang web" className="header__logo-img" />
                        </div>
                        <div className="header__search">
                            <input
                                type="text"
                                className="header__search-input"
                                placeholder="Tìm sản phẩm, thương hiệu hay danh mục mong muốn"

                            />
                            <button className="header__search-btn">
                                <i className="header__search-btn-icon fas fa-search"></i>
                            </button>
                        </div>
                        <div className="header__cart">
                            <i className="header__cart-icon fa-solid fa-cart-shopping"></i>
                            <input type="text" value={quantity <= 10 ? quantity : '10+'} readOnly className='header__cart__quantity text-center' />
                            <Cart />
                        </div>
                    </div>
                </div>
            </div>
            {
                isShow && <Modal><ChangePass /></Modal>
            }
        </header>
    )
}