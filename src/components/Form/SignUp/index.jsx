import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../form.css';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser, checkEistsUser } from '../../../redux/userSlice';
import { toEnglish } from '../../../services';
import { userSelector } from '../../../redux/selectors';

export default function () {
    const [states, setStates] = useState({
        userName: '',
        password: '',
        verifyPass: '',
    });
    const [email, setEmail] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showVerifyPass, setShowVerifyPass] = useState(false);
    const dispatch = useDispatch();
    const { users } = useSelector(userSelector);
    const { userName, password, verifyPass } = states;
    const navigate = useNavigate();

    const handleChangeInput = (e, payload) => {
        const copy = { ...states };
        copy[payload] = toEnglish(e.target.value);
        setStates(copy);
    }
    const handleClickSignUp = async (e) => {
        if (!email || !userName || !password || !verifyPass) return;
        e.preventDefault();
        if (password.length < 6) {
            toast.error("Độ dài ký tự phải lớn hơn 5 ký tự!");
            return;
        }
        if (password !== verifyPass) {
            toast.error("Xác nhận mật khẩu không chính xác! Vui lòng kiểm tra lại.");
            return;
        }
        if (checkEistsUser({ users, userName })) {
            toast.error("Người dùng đã tồn tại trên hệ thống! Vui lòng chọn tên khác.");
        } else {
            dispatch(addNewUser({ email, userName, password }));
            toast.success("Đăng ký tài khoản thành công! Mời đăng nhập.");
            navigate('/sign-in');
        }
    }

    return (
        <main>
            <div className='form-wrapper d-flex-center container'>
                <div className="form-wrap rounded p-32">
                    <h2 className='fw-normal text-center mb-16'>Đăng ký tài khoản mới:</h2>
                    <p>Chào mừng bạn đến với cửa hàng của chúng tôi. Đăng ký ngay để trải nghiệm.</p>
                    <form>
                        <div className="form__item mt-16">
                            <input
                                autoFocus
                                className='w-100 item-input rounded'
                                type="email"
                                name="email"
                                placeholder=' '
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className='item-label rounded'>Email *</span>
                        </div>
                        <div className="form__item mt-16">
                            <input
                                className='w-100 item-input rounded'
                                type="text"
                                name="userName"
                                placeholder=' '
                                required
                                value={userName}
                                onChange={(e) => handleChangeInput(e, 'userName')}
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
                                onChange={(e) => handleChangeInput(e, 'password')}
                            />
                            <span className='item-label rounded'>Mật khẩu *</span>
                            <span className='show-password' onClick={() => setShowPass(!showPass)}>
                                {
                                    !showPass ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>
                                }
                            </span>
                        </div>
                        <div className="form__item mt-16">
                            <input
                                className='w-100 item-input rounded'
                                type={showVerifyPass ? 'text' : 'password'}
                                name="verifyPass"
                                required
                                placeholder=' '
                                value={verifyPass}
                                onChange={(e) => handleChangeInput(e, 'verifyPass')}
                            />
                            <span className='item-label rounded'>Xác nhận mật khẩu *</span>
                            <span className='show-password' onClick={() => setShowVerifyPass(!showVerifyPass)}>
                                {
                                    !showVerifyPass ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>
                                }
                            </span>
                        </div>
                        <button
                            className={'mt-16 btn btn-primary'}
                            type='submit'
                            onClick={handleClickSignUp}
                        >Đăng ký</button>
                    </form>
                    <hr className='mt-16 mb-16' />
                    <p className='text-no-account'>Đã có tài khoản? <Link to='/sign-in'>Đăng nhập</Link></p>
                </div>
            </div>
        </main>
    )
};