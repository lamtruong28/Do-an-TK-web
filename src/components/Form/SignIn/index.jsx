import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, fetchUsers, handleLogin } from '../../../redux/userSlice';
import '../form.css';
import { toast } from 'react-toastify';
import userSlice from '../../../redux/userSlice';
import { userSelector } from '../../../redux/selectors';
import { toEnglish } from '../../../services';

export default function () {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users, currentUser } = useSelector(userSelector);
    useEffect(() => {
        dispatch(fetchUsers());
    }, []);
    const handleClickLogin = async (e) => {
        e.preventDefault();
        if (!userName && !password) return;
        const res = await dispatch(fetchUser({ userName, password }));
        if (res.payload) {
            toast.success(`Welcome, ${res.payload.userName}`);
            setUserName('');
            setPassword('');
            if (res.payload.admin)
                navigate('/admin');
            else {
                dispatch(userSlice.actions.setInfoUser(res.payload));
                navigate('/');
            }
        }
        else {
            toast.error('Tài khoản hoặc mật khẩu không chính xác!');
        }
    }
    return (
        <main>
            <div className='form-wrapper d-flex-center container'>
                <div className="form-wrap rounded p-32">
                    <h2 className='fw-normal text-center mb-16'>Đăng nhập</h2>
                    <p>Chào mừng bạn đến với cửa hàng của chúng tôi. Đăng nhập ngay để trải nghiệm.</p>
                    <form>
                        <div className="form__item mt-16">
                            <input
                                className='w-100 item-input rounded'
                                type="text"
                                name="userName"
                                placeholder=' '
                                required
                                autoFocus
                                value={userName}
                                onChange={(e) => setUserName(toEnglish(e.target.value))}
                            />
                            <span className='item-label rounded'>Tên đăng nhập *</span>
                        </div>
                        <div className="form__item mt-16">
                            <input
                                className='w-100 item-input rounded'
                                type={showPass ? 'text' : 'password'}
                                name="password"
                                required
                                placeholder=' '
                                value={password}
                                onChange={(e) => setPassword(toEnglish(e.target.value))}
                            />
                            <span className='item-label rounded'>Mật khẩu *</span>
                            <span className='show-password' onClick={() => setShowPass(!showPass)}>
                                {
                                    !showPass ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>
                                }
                            </span>
                        </div>
                        <p className='gorgot-pass-wrap mt-8'>
                            <Link to="/forgot-pass" className="gorgot-pass">Forgotten password?</Link>
                        </p>
                        <button
                            className={(userName && password) ? 'btn btn-primary' : 'btn btn-primary disable'}
                            type='submit'
                            onClick={handleClickLogin}
                        >Đăng nhập</button>
                    </form>
                    <hr className='mt-16 mb-16' />
                    <p className='text-no-account'>Bạn chưa có tài khoản? <Link to='/sign-up'>Đăng ký</Link></p>
                </div>
            </div>
        </main>
    )
};