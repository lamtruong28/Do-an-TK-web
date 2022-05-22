import { useDispatch, useSelector } from 'react-redux';
import './modal.css';
import { modalSlice } from './modalSlice';
import { modalSelector } from '../../redux/selectors';
import { useEffect } from 'react';

export default function ({ children }) {
    const dispatch = useDispatch();
    const isShow = useSelector(modalSelector);
    const handleClickModal = () => {
        dispatch(modalSlice.actions.closeModal());
    }

    useEffect(() => {
        if (isShow) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '8px'
        }
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = null;
        }
    }, [isShow]);

    return (
        <>
            {
                isShow &&
                <div
                    className={'modal d-flex-center'}
                    onClick={handleClickModal}
                >
                    {children}
                </div>
            }
        </>
    )
}