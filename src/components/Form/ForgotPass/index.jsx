import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userSelector } from '../../../redux/selectors';
import { updateUser, fetchUsers } from '../../../redux/userSlice';
import { checkInfoResetPass, toEnglish } from '../../../services';
import '../form.css';
export default function () {
    const { users } = useSelector(userSelector);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [states, setStates] = useState({
        userName: '',
        password: '',
        verifyPass: '',
    });
    const [showPass, setShowPass] = useState(false);
    const [showVerifyPass, setShowVerifyPass] = useState(false);
    const { userName, password, verifyPass } = states;
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchUsers());
    }, []);
    const handleChangeInput = (e, payload) => {
        const coppy = { ...states };
        coppy[payload] = toEnglish(e.target.value);
        setStates(coppy);
    };

    const handleCreateNewPass = async (e) => {
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
        //const res = checkInfoResetPass({ users, email, userName });
        const res = await dispatch(updateUser({ email, userName, password }));
        console.log({ res, PAYLOAD: res.payload });
        if (res.payload) {
            toast.success("Thay đổi mật khẩu thành công!");
            navigate('/sign-in');
        } else
            toast.error("Thông tin không chính xác bạn vui lòng kiểm tra lại!");

    }

    return (
        <div className='form-wrapper d-flex-center container'>
            <div className="form-wrap rounded p-32 pt-16">
                <Link to="/sign-in" className="btn btn-back">
                    <i className="fa-solid fa-arrow-left-long"></i>
                </Link>
                <h2 className='fw-normal text-center mb-16'>Quên mật khẩu:</h2>
                <p>Bạn đã quên mật khẩu. Hãy nhập đầy đủ thông tin để đặt lại mật khẩu.</p>
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
                        <span className='item-label rounded'>Email đăng ký*</span>
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
                        <span className='item-label rounded'>Mật khẩu mới *</span>
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
                        onClick={handleCreateNewPass}
                    >Tạo mới mật khẩu</button>
                </form>
            </div>
        </div>
    )
};