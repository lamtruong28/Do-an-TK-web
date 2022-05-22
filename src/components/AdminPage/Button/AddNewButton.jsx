import './btnAddNew.css';
import { useDispatch } from 'react-redux';
import { modalSlice } from '../../Modal/modalSlice';
import formSlice from '../../../redux/formSlice';
export default function AddNewButton() {
    const dispatch = useDispatch();
    const handleClickBtn = () => {
        dispatch(formSlice.actions.showAddNewForm());
        dispatch(modalSlice.actions.openModal());
    }
    return (
        <button
            className="btn btn-primary btn-add-new"
            onClick={handleClickBtn}
        >
            <i className="fa-solid fa-plus"></i>
        </button >
    )
}