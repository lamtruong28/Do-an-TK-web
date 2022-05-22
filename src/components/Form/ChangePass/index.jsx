import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkPassword, updateUser } from '../../../redux/userSlice';
import { checkRememberUser } from '../../../services';
import { modalSlice } from '../../Modal/modalSlice';
import { toast } from 'react-toastify';
import '../form.css';
import { userSelector } from '../../../redux/selectors';

export default function () {
    const { users } = useSelector(userSelector);
    const { userId } = checkRememberUser();
    const [showPass, setShowPass] = useState(false);
    const [showVerifyPass, setShowVerifyPass] = useState(false);
    const [states, setStates] = useState({
        password: '',
        newPassword: '',
        verifyPass: '',
    });
    const { password, newPassword, verifyPass } = states;
    const dispatch = useDispatch();

    const handleChangeInput = (e, payload) => {
        const coppy = { ...states };
        coppy[payload] = e.target.value;
        setStates(coppy);
    }

    const handleChangePass = async (e) => {
        if (!password || !newPassword || !verifyPass) return;
        e.preventDefault();
        if (newPassword.length < 6) {
            toast.error("Độ dài ký tự phải lớn hơn 5 ký tự!");
            return;
        }
        if (newPassword !== verifyPass) {
            toast.error("Xác nhận mật khẩu không chính xác! Vui lòng kiểm tra lại.");
            return;
        }
        const check = checkPassword({ users, id: userId, password });
        console.log(check);
        if (check) {
            await dispatch(updateUser({ id: userId, password: newPassword }));
            toast.success("Thay đổi mật khẩu thành công!");
            dispatch(modalSlice.actions.closeModal());
        } else
            toast.error("Mật khẩu không chính xác! Vui lòng kiểm tra lại.");

    }

    return (
        <div style={{ width: 400 }} className="form-wrap rounded p-32" onClick={(e) => e.stopPropagation()}>
            <h2 className='fw-normal text-center mb-16'>Đổi mật khẩu</h2>
            <form>
                <div className="form__item mt-16">
                    <input
                        className='w-100 item-input rounded'
                        type="text"
                        name="password"
                        placeholder=' '
                        required
                        value={password}
                        onChange={(e) => handleChangeInput(e, 'password')}
                    />
                    <span className='item-label rounded'>Mật khẩu cũ *</span>
                </div>
                <div className="form__item mt-16">
                    <input
                        className='w-100 item-input rounded'
                        type={showPass ? 'text' : 'password'}
                        name="newPassword"
                        required
                        placeholder=' '
                        value={newPassword}
                        onChange={(e) => handleChangeInput(e, 'newPassword')}
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
                    onClick={handleChangePass}
                >Xác nhận</button>
                <button
                    className={'mt-16 btn btn-secondary ms-8'}
                    type='submit'
                    onClick={() => dispatch(modalSlice.actions.closeModal())}
                >Đóng</button>

            </form>
        </div>
    )
}